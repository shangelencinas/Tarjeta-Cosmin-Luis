import { useState } from 'react';
import { Layers, Copy, Check, Download, ExternalLink, Code2, Sparkles, X } from 'lucide-react';
import { generateElementorHtml, generateWordPressPluginPhp } from '../utils/wordpress';

interface WordPressEmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WordPressEmbedModal({ isOpen, onClose }: WordPressEmbedModalProps) {
  const [activeTab, setActiveTab] = useState<'elementor' | 'plugin' | 'iframe'>('elementor');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Use current app URL or production target domain
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.cosmin.com.mx/';
  const elementorSnippet = generateElementorHtml(currentUrl);
  const pluginSnippet = generateWordPressPluginPhp(currentUrl);
  const iframeSnippet = `<iframe src="${currentUrl}" style="width:100%; min-height:880px; border:none; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.08);" allow="clipboard-write" loading="lazy"></iframe>`;

  const getActiveCode = () => {
    switch (activeTab) {
      case 'elementor':
        return elementorSnippet;
      case 'plugin':
        return pluginSnippet;
      case 'iframe':
        return iframeSnippet;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPlugin = () => {
    const blob = new Blob([pluginSnippet], { type: 'text/php;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cosmin-tarjeta-digital.php';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="wp-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 id="wp-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                Integración con WordPress & Elementor
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Código compatible para <span className="font-semibold text-slate-700 dark:text-slate-300">https://www.cosmin.com.mx/</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de integración WordPress"
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 border-b border-slate-200 dark:border-slate-800 shrink-0 flex gap-4">
          <button
            onClick={() => setActiveTab('elementor')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'elementor'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Elementor (Widget HTML)
          </button>
          <button
            onClick={() => setActiveTab('plugin')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'plugin'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Plugin Personalizado PHP / Shortcode
          </button>
          <button
            onClick={() => setActiveTab('iframe')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'iframe'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Iframe Genérico
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600 dark:text-slate-300">
          {activeTab === 'elementor' && (
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                Cómo incrustar en Elementor paso a paso:
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400 mb-3">
                <li>Edita tu página en WordPress con <strong>Elementor</strong>.</li>
                <li>Arrastra el widget <strong>HTML</strong> al contenedor o sección deseada.</li>
                <li>Pega el código siguiente en el panel izquierdo de Elementor.</li>
                <li>Guarda y publica los cambios. ¡Listo!</li>
              </ol>
            </div>
          )}

          {activeTab === 'plugin' && (
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                Plugin de WordPress con Shortcode [tarjeta_cosmin]:
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Guarda este archivo como <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">cosmin-tarjeta-digital.php</code> dentro de <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">/wp-content/plugins/</code> y actívalo en tu panel de WordPress. Luego usa el shortcode <code className="font-bold text-amber-600">[tarjeta_cosmin]</code> en cualquier página o post.
              </p>
            </div>
          )}

          {activeTab === 'iframe' && (
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
                Incrustación directa vía Iframe:
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-3">
                Útil para Gutenberg (bloque HTML personalizado), Divi, Beaver Builder o cualquier CMS estándar.
              </p>
            </div>
          )}

          {/* Code Container */}
          <div className="relative rounded-xl bg-slate-950 p-4 font-mono text-[11px] text-slate-200 overflow-x-auto border border-slate-800">
            <pre>
              <code>{getActiveCode()}</code>
            </pre>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/70 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500">
            Diseñado para fluidez móvil y carga instantánea en cosmin.com.mx
          </div>
          <div className="flex gap-2">
            {activeTab === 'plugin' && (
              <button
                onClick={handleDownloadPlugin}
                className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar archivo .php</span>
              </button>
            )}
            <button
              onClick={handleCopy}
              className="py-2 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copiado al portapapeles</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
