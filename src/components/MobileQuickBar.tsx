import { MessageCircle, Phone, UserCheck, QrCode, Mail } from 'lucide-react';
import { ContactInfo } from '../types';
import { createVCardString, downloadVCard } from '../utils/vcard';
import { buildWhatsAppLink } from '../utils/lead';

interface MobileQuickBarProps {
  contact: ContactInfo;
  onOpenQR: () => void;
}

export function MobileQuickBar({ contact, onOpenQR }: MobileQuickBarProps) {
  const handleSaveContact = () => {
    const vcard = createVCardString(contact);
    downloadVCard(vcard, `${contact.firstName}_${contact.lastName}_COSMIN.vcf`);
  };

  const whatsappUrl = buildWhatsAppLink(
    contact.phone,
    `Hola ${contact.name}, te contacto desde tu tarjeta digital COSMIN & CosLink.`
  );

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2">
      <div className="grid grid-cols-5 gap-1 items-center">
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          className="min-h-[44px] flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400 active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">WhatsApp</span>
        </a>

        {/* Llamar */}
        <a
          href={`tel:${contact.phone}`}
          aria-label="Llamar por teléfono"
          className="min-h-[44px] flex flex-col items-center justify-center text-slate-700 dark:text-slate-300 active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Llamar</span>
        </a>

        {/* Guardar vCard - Primary Center Action (COSMIN Gold) */}
        <button
          type="button"
          onClick={handleSaveContact}
          aria-label="Guardar contacto vCard"
          className="min-h-[44px] flex flex-col items-center justify-center -mt-3 bg-amber-400 text-slate-950 rounded-2xl shadow-lg shadow-amber-500/25 active:scale-95 transition-transform p-1 cursor-pointer"
        >
          <UserCheck className="w-5 h-5 text-slate-950" />
          <span className="text-[9px] font-extrabold mt-0.5">Guardar</span>
        </button>

        {/* Correo */}
        <a
          href={`mailto:${contact.email}`}
          aria-label="Enviar correo"
          className="min-h-[44px] flex flex-col items-center justify-center text-slate-700 dark:text-slate-300 active:scale-95 transition-transform"
        >
          <Mail className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">Correo</span>
        </a>

        {/* Código QR */}
        <button
          type="button"
          onClick={onOpenQR}
          aria-label="Abrir código QR"
          className="min-h-[44px] flex flex-col items-center justify-center text-slate-700 dark:text-slate-300 active:scale-95 transition-transform cursor-pointer"
        >
          <QrCode className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-0.5">QR</span>
        </button>
      </div>
    </div>
  );
}
