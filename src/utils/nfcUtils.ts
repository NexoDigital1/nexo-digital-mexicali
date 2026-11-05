import { BusinessProfile } from '../types';

/**
 * Generates an RFC-compliant vCard 3.0 format for offline contact sharing.
 * This file can be saved directly on phone contacts without internet.
 */
export function generateVCardString(profile: BusinessProfile): string {
  const nameParts = profile.ownerName.split(' ');
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  const firstName = nameParts[0] || profile.businessName;

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${profile.ownerName} - ${profile.businessName}`,
    `N:${lastName};${firstName};;;`,
    `ORG:${profile.businessName}`,
    `TITLE:${profile.industry}`,
    `TEL;TYPE=CELL,VOICE:${profile.contacts.phone}`,
    `TEL;TYPE=WORK,VOICE:${profile.contacts.whatsapp}`,
    `EMAIL;TYPE=PREF,INTERNET:${profile.contacts.email || ''}`,
    `URL:${window.location.origin}?profile=${encodeURIComponent(profile.businessName)}`,
    `ADR;TYPE=WORK:;;${profile.address};${profile.city};${profile.state};${profile.postalCode};México`,
    `NOTE:${profile.slogan} | NEXO DIGITAL MEXICALI NFC START`,
    'END:VCARD',
  ];

  return lines.filter(Boolean).join('\r\n');
}

/**
 * Triggers a download of the .vcf contact card.
 */
export function downloadVCard(profile: BusinessProfile) {
  const vcardText = generateVCardString(profile);
  const blob = new Blob([vcardText], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${profile.businessName.toLowerCase().replace(/\s+/g, '_')}_contacto.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Checks if Web NFC (NDEFReader) is supported in current browser (Android Chrome).
 */
export function isWebNfcSupported(): boolean {
  return typeof window !== 'undefined' && 'NDEFReader' in window;
}

/**
 * Attempts real Web NFC Write operation on compatible Android device.
 */
export async function writeNfcTag(
  urlOrData: string,
  onStatusUpdate?: (status: string, success?: boolean) => void
): Promise<boolean> {
  if (!isWebNfcSupported()) {
    onStatusUpdate?.('Web NFC no está soportado en este navegador (requiere Google Chrome en Android con NFC activo).', false);
    return false;
  }

  try {
    onStatusUpdate?.('Acerca tu tarjeta NFC física a la parte trasera del teléfono...', undefined);
    // @ts-expect-error Web NFC API
    const ndef = new window.NDEFReader();
    await ndef.write({
      records: [
        {
          recordType: 'url',
          data: urlOrData,
        },
      ],
    });
    onStatusUpdate?.('¡Éxito! Datos grabados permanentemente en la tarjeta NFC física.', true);
    return true;
  } catch (error: unknown) {
    const err = error as Error;
    if (err.name === 'NotAllowedError') {
      onStatusUpdate?.('Permiso denegado por el usuario para acceder al sensor NFC.', false);
    } else {
      onStatusUpdate?.(`Error de escritura NFC: ${err.message || 'Operación cancelada'}`, false);
    }
    return false;
  }
}
