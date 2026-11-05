import QRCode from 'qrcode';

export async function generateQrDataUrl(
  text: string,
  options?: {
    darkColor?: string;
    lightColor?: string;
    width?: number;
  }
): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: options?.width || 320,
      margin: 2,
      color: {
        dark: options?.darkColor || '#0F172A',
        light: options?.lightColor || '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code', error);
    return '';
  }
}
