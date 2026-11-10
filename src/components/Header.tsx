import { UserCheck, Moon, Sun, ExternalLink } from 'lucide-react';
import { ContactInfo } from '../types';
import { createVCardString, downloadVCard } from '../utils/vcard';

interface HeaderProps {
  contact: ContactInfo;
  onOpenQR: () => void;
  onOpenWP: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export function Header({ contact, onOpenQR, onOpenWP, darkMode, onToggleTheme }: HeaderProps) {
  const handleDownloadVCard = () => {
    const vcard = createVCardString(contact);
    downloadVCard(vcard, `${contact.firstName}_${contact.lastName}_COSMIN.vcf`);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3">
        {/* Zone 1: Pure Transparent COSMIN Logo - No background box */}
        <a
          href="https://www.cosmin.com.mx/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 group shrink-0"
          title="COSMIN - Consultoría y Servicios Integrales a la Minería e Industria"
        >
          <img
            src={darkMode ? contact.cosminLogoWhiteText : contact.cosminLogoTransparent}
            alt="COSMIN Consultoría y Servicios Mineros"
            className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <a
            href="#perfil"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Perfil
          </a>
          <a
            href="#cosmin"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Sobre COSMIN
          </a>
          <a
            href="#coslink"
            className="text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
          >
            <span>Plataforma COSLINK</span>
          </a>
          <a
            href="#contacto"
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Contacto Directo
          </a>

        </nav>

        {/* Zone 3: Primary Actions (COSMIN Brand Palette: Gold/Black) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center justify-center transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>



          <button
            onClick={handleDownloadVCard}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">Guardar Contacto</span>
            <span className="sm:hidden">vCard</span>
          </button>
        </div>
      </div>
    </header>
  );
}
