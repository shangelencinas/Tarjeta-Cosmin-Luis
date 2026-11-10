import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, Check, X, Phone, Globe, UserCheck, Sparkles } from 'lucide-react';
import { ContactInfo, QRTarget } from '../types';
import { createVCardString } from '../utils/vcard';
import { buildWhatsAppLink } from '../utils/lead';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactInfo;
}

export function QRCodeModal({ isOpen, onClose, contact }: QRCodeModalProps) {
  const [targetType, setTargetType] = useState<QRTarget>('url');
  const [qrColor, setQrColor] = useState('#0f172a');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute payload based on target type
  const getPayload = (): string => {
    if (targetType === 'vcard') {
      return createVCardString(contact);
    }
    if (targetType === 'whatsapp') {
      return buildWhatsAppLink(contact.phone, `Hola ${contact.name}, te contacto desde tu tarjeta de presentación digital.`);
    }
    // Default to current location or Cosmin URL
    return window.location.href.includes('localhost') || window.location.href.includes('run.app')
      ? window.location.href
      : contact.websiteCosmin;
  };

  useEffect(() => {
    if (!isOpen) return;

    const payload = getPayload();
    QRCode.toDataURL(payload, {
      width: 400,
      margin: 2,
      color: {
        dark: qrColor,
        light: '#ffffff',
      },
      errorCorrectionLevel: targetType === 'vcard' ? 'M' : 'H',
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Error generating QR:', err));
  }, [isOpen, targetType, qrColor]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `QR_${contact.firstName}_${contact.lastName}_${targetType}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyLink = () => {
    const payload = getPayload();
    navigator.clipboard.writeText(payload).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h2 id="qr-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                Código QR Dinámico
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Escanea o descarga para tus materiales</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de código QR"
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* QR Target Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2">
              Función al escanear:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTargetType('url')}
                className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition-all ${
                  targetType === 'url'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Sitio Web</span>
              </button>
              <button
                type="button"
                onClick={() => setTargetType('vcard')}
                className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition-all ${
                  targetType === 'vcard'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>vCard Contacto</span>
              </button>
              <button
                type="button"
                onClick={() => setTargetType('whatsapp')}
                className={`py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1 transition-all ${
                  targetType === 'whatsapp'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* QR Display Card */}
          <div className="relative flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            {qrDataUrl ? (
              <div className="p-3 bg-white rounded-xl shadow-md border border-slate-200/60">
                <img
                  src={qrDataUrl}
                  alt={`Código QR para ${targetType}`}
                  className="w-48 h-48 object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-slate-400">
                <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            <div className="mt-3 text-center">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {targetType === 'url' && 'Abre la tarjeta digital y enlaces directos'}
                {targetType === 'vcard' && `Guarda a ${contact.firstName} directamente en la agenda telefónica`}
                {targetType === 'whatsapp' && 'Inicia chat inmediato en WhatsApp'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Alta resolución · Compatible con iPhone y Android
              </p>
            </div>
          </div>

          {/* Color accents */}
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium">Color de impresión:</span>
            <div className="flex items-center gap-2">
              {[
                { name: 'Obsidiana COSMIN', hex: '#0f172a' },
                { name: 'Oro COSMIN', hex: '#b45309' },
                { name: 'Naranja COSMIN', hex: '#ea580c' },
                { name: 'Azul COSLINK', hex: '#07526E' },
              ].map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setQrColor(c.hex)}
                  title={c.name}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    qrColor === c.hex ? 'scale-110 border-slate-900 dark:border-white ring-2 ring-amber-400' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleDownload}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar PNG</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
