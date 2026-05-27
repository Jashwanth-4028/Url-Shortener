import QRCode from 'qrcode';

export const generateQrDataUrl = async (url) => {
  try {
    return await QRCode.toDataURL(url, {
      width: 280,
      margin: 2,
      color: { dark: '#1e293b', light: '#ffffff' },
    });
  } catch {
    return null;
  }
};
