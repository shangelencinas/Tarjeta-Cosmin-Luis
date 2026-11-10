import { LeadFormData } from '../types';

export interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

export function validateLeadForm(data: LeadFormData): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Por favor ingresa tu nombre completo.';
  }

  const cleanPhone = data.phone.replace(/[^0-9]/g, '');
  if (!data.phone || cleanPhone.length < 8) {
    errors.phone = 'Ingresa un número telefónico válido (mínimo 8-10 dígitos).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Ingresa un correo electrónico válido.';
  }

  if (!data.projectType) {
    errors.projectType = 'Selecciona el tipo de proyecto o interés.';
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.message = 'Describe brevemente tu proyecto o consulta (mínimo 5 caracteres).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  // Format Mexican phone with 52 if not already present
  const fullPhone = cleanPhone.startsWith('52') ? cleanPhone : `52${cleanPhone}`;
  return `https://wa.me/${fullPhone}?text=${encodeURIComponent(text)}`;
}

export function buildLeadWhatsAppMessage(data: LeadFormData): string {
  return [
    `*Nuevo Contacto desde Tarjeta Digital COSMIN*`,
    `--------------------------------------`,
    `👤 *Nombre:* ${data.name}`,
    data.company ? `🏢 *Empresa:* ${data.company}` : '',
    `📞 *Teléfono:* ${data.phone}`,
    `✉️ *Correo:* ${data.email}`,
    `⛏️ *Interés:* ${data.projectType}`,
    `💬 *Mensaje:* ${data.message}`,
    `--------------------------------------`,
    `Enviado desde https://www.cosmin.com.mx/`,
  ]
    .filter(Boolean)
    .join('\n');
}

export function buildLeadEmailLink(recipient: string, data: LeadFormData, recipientName = 'Luis Badilla'): string {
  const subject = `[Contacto Tarjeta COSMIN] ${data.projectType} - ${data.name}`;
  const body = [
    `Hola ${recipientName},`,
    ``,
    `Se ha recibido un nuevo prospecto a través de tu tarjeta de presentación digital:`,
    ``,
    `Nombre: ${data.name}`,
    `Empresa: ${data.company || 'N/A'}`,
    `Teléfono: ${data.phone}`,
    `Correo: ${data.email}`,
    `Interés / Proyecto: ${data.projectType}`,
    ``,
    `Mensaje:`,
    `${data.message}`,
    ``,
    `Saludos cordiales.`,
  ].join('\n');

  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
