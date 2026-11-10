export interface ContactInfo {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  company: string;
  tagline: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  location: string;
  websiteCosmin: string;
  websiteCoslink: string;
  socialCosmin: {
    handle: string;
    instagram: string;
    linkedin: string;
    facebook: string;
    x: string;
  };
  socialCoslink: {
    handle: string;
    instagram: string;
    linkedin: string;
    website: string;
  };
  photoUrl: string;
  cosminLogoTransparent: string;
  cosminLogoWhiteText: string;
  coslinkLogoTransparent: string;
  coslinkLogoWhite: string;
}

export interface LeadFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
}

export type QRTarget = 'url' | 'vcard' | 'whatsapp';
