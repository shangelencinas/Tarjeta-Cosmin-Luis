

import { ContactInfo } from '../types';

interface FooterProps {
  contact: ContactInfo;
  onOpenWP: () => void;
  onOpenQR: () => void;
}

export function Footer({ contact, onOpenWP, onOpenQR }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-500 dark:text-slate-400 py-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-slate-800/80">
          {/* Transparent Logo Integration - Zero Background Box */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="flex items-center gap-4">
              <a
                href={contact.websiteCosmin}
                target="_blank"
                rel="noopener noreferrer"
                title="COSMIN"
                className="transition-transform hover:scale-105"
              >
                <img
                  src={contact.cosminLogoTransparent}
                  alt="COSMIN"
                  className="h-7 w-auto object-contain dark:hidden"
                />
                <img
                  src={contact.cosminLogoWhiteText}
                  alt="COSMIN"
                  className="h-7 w-auto object-contain hidden dark:block"
                />
              </a>

              <span className="text-slate-300 dark:text-slate-700">|</span>

              <a
                href={contact.websiteCoslink}
                target="_blank"
                rel="noopener noreferrer"
                title="COSLINK - Where Mining Connects"
                className="transition-transform hover:scale-105"
              >
                <img
                  src={contact.coslinkLogoTransparent}
                  alt="COSLINK"
                  className="h-7 w-auto object-contain dark:hidden"
                />
                <img
                  src={contact.coslinkLogoWhite}
                  alt="COSLINK"
                  className="h-7 w-auto object-contain hidden dark:block"
                />
              </a>
            </div>

            <div>
              <p className="text-slate-800 dark:text-slate-200 font-semibold text-xs">
                Tarjeta digital oficial de {contact.name}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                COSMIN Consultoría Minera · Plataforma complementaria COSLINK
              </p>
            </div>
          </div>


        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {currentYear} COSMIN Consultoría y Servicios Mineros. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <a
              href={contact.websiteCosmin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-600 dark:hover:text-amber-400 font-semibold transition-colors"
            >
              www.cosmin.com.mx
            </a>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <a
              href={contact.websiteCoslink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Plataforma aliada: www.coslink.global
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
