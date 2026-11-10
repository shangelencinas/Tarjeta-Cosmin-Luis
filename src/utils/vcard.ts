import { ContactInfo } from '../types';

export function createVCardString(contact: ContactInfo): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${contact.lastName};${contact.firstName};;;`,
    `FN:${contact.name}`,
    `ORG:${contact.company}`,
    `TITLE:${contact.role}`,
    `TEL;TYPE=CELL,VOICE:${contact.phone}`,
    `EMAIL;TYPE=PREF,INTERNET:${contact.email}`,
    `URL;TYPE=WORK:${contact.websiteCosmin}`,
    `URL;TYPE=COSLINK:${contact.websiteCoslink}`,
    `ADR;TYPE=WORK:;;Hermosillo;Sonora;;Mexico`,
    `NOTE:${contact.tagline} | COSMIN (@cosminmx) | COSLINK (@coslink.global)`,
    'END:VCARD',
  ];

  return lines.join('\r\n');
}

export function downloadVCard(vCardString: string, filename = 'Luis_Badilla_COSMIN.vcf'): void {
  const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
