import Url from '../models/Url.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getAnalyticsForUrl } from '../services/analyticsService.js';

export const getUrlAnalytics = asyncHandler(async (req, res) => {
  const url = await Url.findOne({ _id: req.params.id, userId: req.user._id });

  if (!url) {
    return res.status(404).json({ success: false, message: 'URL not found' });
  }

  const analytics = await getAnalyticsForUrl(url._id);

  res.json({
    success: true,
    data: {
      url: {
        _id: url._id,
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        clicks: url.clicks,
        lastVisited: url.lastVisited,
        createdAt: url.createdAt,
      },
      ...analytics,
    },
  });
});
