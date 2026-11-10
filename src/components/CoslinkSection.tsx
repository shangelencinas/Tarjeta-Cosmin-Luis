import { ExternalLink, Users, TrendingUp, Truck, Sparkles, ArrowRight, Share2 } from 'lucide-react';
import { ContactInfo } from '../types';
import { coslinkPillars } from '../data/contactData';

interface CoslinkSectionProps {
  contact: ContactInfo;
}

export function CoslinkSection({ contact }: CoslinkSectionProps) {
  const pillarIcons = [
    <Users key="1" className="w-4 h-4 text-[#C67321]" />,
    <TrendingUp key="2" className="w-4 h-4 text-[#C67321]" />,
    <Truck key="3" className="w-4 h-4 text-[#C67321]" />,
    <Sparkles key="4" className="w-4 h-4 text-[#C67321]" />,
  ];

  return (
    <section id="coslink" className="py-12 border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Banner Card - 100% COSLINK Brand Identity (#07526E Petrol Blue & #C67321 Copper) */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#07526E] via-[#05384b] to-[#032330] border border-[#C67321]/40 p-6 sm:p-10 shadow-2xl text-white overflow-hidden">
          {/* Subtle Ambient Lighting in COSLINK Copper */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C67321]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#07526E]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Section Kicker */}
          <div className="relative z-10 flex items-center gap-2 mb-4">
            <span className="text-[11px] font-mono tracking-widest text-amber-200/90 uppercase font-bold">
              Plataforma Digital Complementaria impulsada por COSMIN
            </span>
          </div>

          {/* Header with High-Resolution Transparent COSLINK Logo - Zero background box */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="space-y-3">
              {/* Pure Transparent COSLINK Logo */}
              <a
                href={contact.websiteCoslink}
                target="_blank"
                rel="noopener noreferrer"
                title="Visitar COSLINK - Where Mining Connects"
                className="inline-block transition-transform hover:scale-105"
              >
                <img
                  src={contact.coslinkLogoWhite}
                  alt="COSLINK - Where Mining Connects"
                  className="h-14 sm:h-16 w-auto object-contain drop-shadow-md"
                />
              </a>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                El Punto de Encuentro Digital para Nuevos Proyectos Mineros
              </h2>
            </div>

            <a
              href={contact.websiteCoslink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#C67321] hover:bg-[#a85c15] text-white font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] shadow-lg shadow-[#C67321]/30 shrink-0"
            >
              <span>www.coslink.global</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Core Description */}
          <p className="relative z-10 text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl mb-8">
            <strong>COSLINK</strong> es la plataforma tecnológica especializada que revoluciona la vinculación minera: el espacio donde <strong>concesionarios, inversionistas, proveedores y especialistas técnicos</strong> interactúan de forma directa y transparente para estructurar financiamiento, venta de concesiones, proveeduría de alto nivel y desarrollo de proyectos mineros en México y a nivel global.
          </p>

          {/* 4 Pillars Grid with COSLINK Brand Accents */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {coslinkPillars.map((item, idx) => (
              <div
                key={item.target}
                className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 hover:border-[#C67321]/60 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#C67321]/20 flex items-center justify-center">
                    {pillarIcons[idx]}
                  </div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    {item.target}
                  </h3>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed pl-9">
                  {item.benefit}
                </p>
              </div>
            ))}
          </div>

          {/* Footer of the card: Social link & Direct action */}
          <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-300">
                Redes Oficiales COSLINK:
              </span>
              <span className="text-xs font-mono font-bold text-white bg-[#C67321] px-2 py-0.5 rounded">
                {contact.socialCoslink.handle}
              </span>
              <div className="flex items-center gap-1.5">
                <a
                  href={contact.socialCoslink.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={contact.socialCoslink.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-semibold text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <a
              href={contact.websiteCoslink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-white transition-colors group"
            >
              <span>Acceder a la plataforma COSLINK</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
