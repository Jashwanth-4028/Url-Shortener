export const parseUserAgent = (ua = '') => {
  const lower = ua.toLowerCase();
  let browser = 'Other';
  let device = 'Desktop';

  if (lower.includes('chrome') && !lower.includes('edg')) browser = 'Chrome';
  else if (lower.includes('firefox')) browser = 'Firefox';
  else if (lower.includes('safari') && !lower.includes('chrome')) browser = 'Safari';
  else if (lower.includes('edg')) browser = 'Edge';

  if (lower.includes('mobile') || lower.includes('android') || lower.includes('iphone')) {
    device = 'Mobile';
  } else if (lower.includes('tablet') || lower.includes('ipad')) {
    device = 'Tablet';
  }

  return { browser, device };
};
