import { ExternalLink, ShieldCheck, Compass, FileText, Mountain, Globe } from 'lucide-react';
import { ContactInfo } from '../types';
import { cosminServices } from '../data/contactData';

interface CosminSectionProps {
  contact: ContactInfo;
}

export function CosminSection({ contact }: CosminSectionProps) {
  const serviceIcons = [
    <ShieldCheck key="1" className="w-5 h-5 text-amber-500" />,
    <Compass key="2" className="w-5 h-5 text-amber-500" />,
    <Mountain key="3" className="w-5 h-5 text-amber-500" />,
    <FileText key="4" className="w-5 h-5 text-amber-500" />,
  ];

  return (
    <section id="cosmin" className="py-12 border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header: Pure Transparent Logo without any background container */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div>
            <div className="mb-2">
              <a
                href={contact.websiteCosmin}
                target="_blank"
                rel="noopener noreferrer"
                title="Sitio Web Oficial de COSMIN"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src={contact.cosminLogoTransparent}
                  alt="COSMIN - Consultoría y Servicios Integrales a la Minería e Industria"
                  className="h-10 sm:h-12 w-auto object-contain dark:hidden"
                />
                <img
                  src={contact.cosminLogoWhiteText}
                  alt="COSMIN - Consultoría y Servicios Integrales a la Minería e Industria"
                  className="h-10 sm:h-12 w-auto object-contain hidden dark:block"
                />
              </a>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-2">
              Certeza Técnica y Jurídica para la Minería en México
            </h2>
          </div>

          <a
            href={contact.websiteCosmin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-slate-950 text-xs font-bold transition-all shadow-sm shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400 dark:text-slate-950" />
            <span>www.cosmin.com.mx</span>
            <ExternalLink className="w-3 h-3 opacity-80 ml-0.5" />
          </a>
        </div>

        {/* Corporate Summary Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 mb-8">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            <strong>COSMIN</strong> es una firma consultora mexicana de referencia en la industria minera, con sede operativa en Sonora. Respaldamos a concesionarios, inversionistas, compañías de exploración y corporativos mineros con asesoría integral en regularización de concesiones, cartografía geológica de alta precisión, trámites ante la Dirección General de Minas (DGM), gestión ambiental y formulación estratégica de proyectos.
          </p>

          {/* Social Channels */}
          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Redes Oficiales COSMIN:
              </span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {contact.socialCosmin.handle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={contact.socialCosmin.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 text-xs font-semibold transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={contact.socialCosmin.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 text-xs font-semibold transition-colors"
              >
                Instagram
              </a>
              <a
                href={contact.socialCosmin.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 text-xs font-semibold transition-colors"
              >
                Facebook
              </a>
              <a
                href={contact.socialCosmin.x}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 text-xs font-semibold transition-colors"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid with COSMIN Gold Accents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cosminServices.map((service, idx) => (
            <div
              key={service.title}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-400/60 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  {serviceIcons[idx]}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
