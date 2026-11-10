import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  UserCheck, 
  Share2, 
  Check, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { ContactInfo } from '../types';
import { createVCardString, downloadVCard } from '../utils/vcard';
import { buildWhatsAppLink } from '../utils/lead';

interface HeroCardProps {
  contact: ContactInfo;
  onOpenQR: () => void;
  onOpenWP: () => void;
}

export function HeroCard({ contact, onOpenQR, onOpenWP }: HeroCardProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleDownloadVCard = () => {
    const vcard = createVCardString(contact);
    downloadVCard(vcard, `${contact.firstName}_${contact.lastName}_COSMIN.vcf`);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${contact.name} · ${contact.company}`,
      text: `Tarjeta de presentación digital de ${contact.name} - ${contact.role}.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or not supported
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const whatsappUrl = buildWhatsAppLink(
    contact.phone,
    `Hola ${contact.name}, un gusto saludarte. Vi tu tarjeta digital de COSMIN & CosLink y me gustaría platicar sobre proyectos mineros.`
  );

  return (
    <section id="perfil" className="pt-6 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Main Card Surface - COSMIN Brand Architecture */}
        <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-black/50 overflow-hidden transition-all">
          {/* Top Decorative Banner: Deep Obsidian Slate with COSMIN Gold Mineral Accents */}
          <div className="h-36 sm:h-44 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/90 relative overflow-hidden">
            {/* Subtle diagonal strike line reminiscent of the 'M' in COSMIN logo */}
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-[radial-gradient(#f59e0b_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/10 to-transparent pointer-events-none" />

            {/* Top Right: COSMIN Logo directly integrated WITHOUT background box */}
            <div className="absolute top-4 right-5 sm:right-8 z-10">
              <a
                href={contact.websiteCosmin}
                target="_blank"
                rel="noopener noreferrer"
                title="Visitar COSMIN"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src={contact.cosminLogoWhiteText}
                  alt="COSMIN - Consultoría y Servicios Integrales a la Minería e Industria"
                  className="h-8 sm:h-10 w-auto object-contain drop-shadow-md"
                />
              </a>
            </div>

            {/* Bottom slogan strip */}
            <div className="absolute bottom-3 right-5 sm:right-8 hidden sm:block">
              <span className="text-[11px] font-mono tracking-widest text-amber-300/80 uppercase font-semibold">
                Consultoría y Servicios Integrales a la Minería e Industria
              </span>
            </div>
          </div>

          <div className="px-6 sm:px-10 pb-8 pt-0 relative">
            {/* Avatar Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
              <div className="relative inline-block mx-auto sm:mx-0">
                {/* Circular Frame with COSMIN Gold Ring */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 shadow-xl shadow-amber-950/30">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 relative ring-2 ring-white dark:ring-slate-900">
                    <img
                      src={contact.photoUrl}
                      alt={contact.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center scale-[1.38] hover:scale-[1.44] transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Actions (Share, QR) */}
              <div className="flex items-center justify-center sm:justify-end gap-2 shrink-0">

                <button
                  onClick={handleShare}
                  title="Compartir tarjeta"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Compartir</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Profile Information: Pure COSMIN Brand */}
            <div className="text-center sm:text-left space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {contact.name}
              </h1>

              <p className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">
                {contact.role}
              </p>

              {/* Unboxed Metadata with Typographic Separators */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 pt-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">{contact.company}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 inline" />
                  {contact.location}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500">Concesiones & Geología</span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl pt-2 leading-relaxed">
                {contact.tagline}
              </p>

              {/* Auxiliary Mention of COSLINK as a complement */}
              <div className="pt-2">
                <a
                  href="#coslink"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-300 transition-colors group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Enlace estratégico y vinculación en proyectos mineros mediante la plataforma</span>
                  <span className="font-bold underline group-hover:text-amber-600 dark:group-hover:text-amber-300">COSLINK</span>
                </a>
              </div>
            </div>

            {/* Primary Action Buttons Bar (COSMIN Colors: Gold, Dark Slate, Emerald) */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-6">
              {/* WhatsApp direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[130px] py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp</span>
              </a>

              {/* Direct Call */}
              <a
                href={`tel:${contact.phone}`}
                className="flex-1 min-w-[110px] py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Llamar</span>
              </a>

              {/* Email direct */}
              <a
                href={`mailto:${contact.email}`}
                className="flex-1 min-w-[110px] py-3 px-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-amber-400 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Correo</span>
              </a>

              {/* Guardar Contacto - COSMIN Gold */}
              <button
                onClick={handleDownloadVCard}
                className="flex-1 min-w-[130px] py-3 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <UserCheck className="w-4 h-4 shrink-0 text-slate-950" />
                <span>Guardar vCard</span>
              </button>
            </div>

            {/* Direct Contact Details Strip */}
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block">Teléfono directo / Celular</span>
                  <a
                    href={`tel:${contact.phone}`}
                    className="font-bold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 text-sm font-mono"
                  >
                    {contact.phoneFormatted}
                  </a>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-amber-500"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="truncate mr-2">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block">Correo electrónico</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-bold text-slate-800 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 text-sm truncate block"
                  >
                    {contact.email}
                  </a>
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-amber-500 shrink-0"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
