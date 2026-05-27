import Visit from '../models/Visit.js';

export const getAnalyticsForUrl = async (urlId) => {
  const visits = await Visit.find({ urlId }).sort({ timestamp: -1 }).lean();

  const browserCounts = {};
  const deviceCounts = {};
  const dailyMap = {};

  visits.forEach((v) => {
    browserCounts[v.browser] = (browserCounts[v.browser] || 0) + 1;
    deviceCounts[v.device] = (deviceCounts[v.device] || 0) + 1;

    const day = new Date(v.timestamp).toISOString().split('T')[0];
    dailyMap[day] = (dailyMap[day] || 0) + 1;
  });

  const last14Days = [];
  const today = new Date();
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    last14Days.push({ date: key, clicks: dailyMap[key] || 0 });
  }

  return {
    totalClicks: visits.length,
    clickHistory: visits.slice(0, 50),
    browsers: Object.entries(browserCounts).map(([name, count]) => ({ name, count })),
    devices: Object.entries(deviceCounts).map(([name, count]) => ({ name, count })),
    dailyTrends: last14Days,
  };
};
