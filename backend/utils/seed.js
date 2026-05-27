import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import User from '../models/User.js';
import Url from '../models/Url.js';
import Visit from '../models/Visit.js';
import connectDB from '../config/db.js';
import { generateQrDataUrl } from '../services/qrService.js';

dotenv.config();

const seed = async () => {
  await connectDB();

  await Visit.deleteMany();
  await Url.deleteMany();
  await User.deleteMany();

  const user = await User.create({
    name: 'Demo User',
    email: 'demo@smartlink.dev',
    password: 'demo123',
  });

  const base = process.env.BASE_URL || 'http://localhost:5000';
  const samples = [
    { originalUrl: 'https://github.com', shortCode: 'gh-demo' },
    { originalUrl: 'https://react.dev', shortCode: nanoid(8) },
    { originalUrl: 'https://nodejs.org', shortCode: nanoid(8) },
  ];

  for (const s of samples) {
    const shortUrl = `${base}/${s.shortCode}`;
    const qrCode = await generateQrDataUrl(shortUrl);

    const url = await Url.create({
      originalUrl: s.originalUrl,
      shortCode: s.shortCode,
      userId: user._id,
      qrCode,
      clicks: Math.floor(Math.random() * 40) + 5,
      lastVisited: new Date(),
    });

    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
    const devices = ['Desktop', 'Mobile', 'Tablet'];

    for (let i = 0; i < 12; i++) {
      const daysAgo = Math.floor(Math.random() * 14);
      const ts = new Date();
      ts.setDate(ts.getDate() - daysAgo);

      await Visit.create({
        urlId: url._id,
        timestamp: ts,
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        device: devices[Math.floor(Math.random() * devices.length)],
        ipAddress: '127.0.0.1',
      });
    }
  }

  console.log('Seed done.');
  console.log('Login: demo@smartlink.dev / demo123');
  process.exit(0);
};

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
