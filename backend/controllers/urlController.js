import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import Visit from '../models/Visit.js';
import asyncHandler from '../utils/asyncHandler.js';
import { generateQrDataUrl } from '../services/qrService.js';
import { parseUserAgent } from '../utils/parseUserAgent.js';

const baseUrl = () => process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

export const createUrl = asyncHandler(async (req, res) => {
  const { originalUrl, customAlias, expiryDate } = req.body;

  let shortCode = customAlias?.trim() || nanoid(8);

  const taken = await Url.findOne({ shortCode });
  if (taken) {
    return res.status(400).json({
      success: false,
      message: customAlias ? 'This alias is already taken' : 'Code collision, try again',
    });
  }

  const shortUrl = `${baseUrl()}/${shortCode}`;
  const qrCode = await generateQrDataUrl(shortUrl);

  const urlDoc = await Url.create({
    originalUrl,
    shortCode,
    customAlias: customAlias || null,
    userId: req.user._id,
    qrCode,
    expiryDate: expiryDate ? new Date(expiryDate) : null,
  });

  res.status(201).json({
    success: true,
    data: {
      ...urlDoc.toObject(),
      shortUrl,
    },
  });
});

export const getMyUrls = asyncHandler(async (req, res) => {
  const urls = await Url.find({ userId: req.user._id }).sort({ createdAt: -1 });

  const formatted = urls.map((u) => ({
    ...u.toObject(),
    shortUrl: `${baseUrl()}/${u.shortCode}`,
  }));

  res.json({ success: true, data: formatted, count: formatted.length });
});

export const updateUrl = asyncHandler(async (req, res) => {
  const url = await Url.findOne({ _id: req.params.id, userId: req.user._id });

  if (!url) {
    return res.status(404).json({ success: false, message: 'URL not found' });
  }

  const { originalUrl, expiryDate } = req.body;

  if (originalUrl) url.originalUrl = originalUrl;
  if (expiryDate !== undefined) {
    url.expiryDate = expiryDate ? new Date(expiryDate) : null;
  }

  await url.save();

  res.json({
    success: true,
    data: {
      ...url.toObject(),
      shortUrl: `${baseUrl()}/${url.shortCode}`,
    },
  });
});

export const deleteUrl = asyncHandler(async (req, res) => {
  const url = await Url.findOne({ _id: req.params.id, userId: req.user._id });

  if (!url) {
    return res.status(404).json({ success: false, message: 'URL not found' });
  }

  await Visit.deleteMany({ urlId: url._id });
  await url.deleteOne();

  res.json({ success: true, message: 'URL deleted' });
});

export const redirectShortCode = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  const url = await Url.findOne({ shortCode });
  if (!url) {
    return res.status(404).send('Short link not found');
  }

  if (url.expiryDate && new Date() > url.expiryDate) {
    return res.status(410).send('This link has expired');
  }

  const ua = req.headers['user-agent'] || '';
  const { browser, device } = parseUserAgent(ua);

  url.clicks += 1;
  url.lastVisited = new Date();
  await url.save();

  await Visit.create({
    urlId: url._id,
    browser,
    device,
    ipAddress: req.ip || req.headers['x-forwarded-for'] || null,
  });

  res.redirect(url.originalUrl);
});

export const getPublicStats = asyncHandler(async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.shortCode }).select(
    'shortCode originalUrl clicks createdAt lastVisited expiryDate'
  );

  if (!url) {
    return res.status(404).json({ success: false, message: 'Link not found' });
  }

  res.json({
    success: true,
    data: {
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      lastVisited: url.lastVisited,
      expiryDate: url.expiryDate,
      shortUrl: `${baseUrl()}/${url.shortCode}`,
    },
  });
});
