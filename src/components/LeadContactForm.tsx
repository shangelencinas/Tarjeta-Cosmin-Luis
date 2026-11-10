import { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  MessageCircle, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  Building2, 
  FileCheck,
  AlertCircle 
} from 'lucide-react';
import { ContactInfo, LeadFormData } from '../types';
import { 
  validateLeadForm, 
  ValidationErrors, 
  buildWhatsAppLink, 
  buildLeadWhatsAppMessage, 
  buildLeadEmailLink 
} from '../utils/lead';

interface LeadContactFormProps {
  contact: ContactInfo;
}

export function LeadContactForm({ contact }: LeadContactFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    company: '',
    phone: '',
    email: '',
    projectType: 'Evaluación / Tramitación de Concesión Minera (COSMIN)',
    message: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<LeadFormData | null>(null);

  const projectOptions = [
    'Evaluación / Tramitación de Concesión Minera (COSMIN)',
    'Inversión en Exploración o Mina (COSLINK)',
    'Promoción de Concesión en Plataforma COSLINK',
    'Proveeduría de Equipos / Barrenación / Laboratorio',
    'Consultoría Geológica y Dictamen Técnico',
    'Cumplimiento Ambiental y MIA',
    'Otra Consulta Minera',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateLeadForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#22c55e', '#f59e0b', '#0f172a'],
      });
    } catch {
      // safe fallback
    }

    const waUrl = buildWhatsAppLink(contact.phone, buildLeadWhatsAppMessage(formData));
    window.open(waUrl, '_blank');

    setLastSubmittedData({ ...formData });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      company: '',
      phone: '',
      email: '',
      projectType: 'Evaluación / Tramitación de Concesión Minera (COSMIN)',
      message: '',
    });
    setErrors({});
  };

  return (
    <section id="contacto" className="py-12 border-t border-slate-200/70 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Title: Pure COSMIN Brand */}
        <div className="text-center sm:text-left mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold mb-2 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Contacto Directo · COSMIN Consultoría Minera</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Iniciemos una Conversación sobre tu Proyecto
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Llena tus datos a continuación para enviar tu consulta o propuesta directamente por WhatsApp a {contact.name} ({contact.role}).
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-10">
          {isSubmitted && lastSubmittedData ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  ¡Muchas gracias, {lastSubmittedData.name}!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Tu mensaje ha sido registrado exitosamente. Para acelerar la atención, puedes enviar los detalles directamente a {contact.firstName} por WhatsApp o Correo:
                </p>
              </div>

              {/* Instant forwarding options */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
                <a
                  href={buildWhatsAppLink(contact.phone, buildLeadWhatsAppMessage(lastSubmittedData))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar por WhatsApp a {contact.firstName}</span>
                </a>

                <a
                  href={buildLeadEmailLink(contact.email, lastSubmittedData, contact.name)}
                  className="w-full sm:w-auto py-3 px-5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Enviar por Correo</span>
                </a>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
                >
                  Enviar otro mensaje o registrar otra consulta
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Row 1: Nombre y Empresa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Nombre Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Ing. Roberto Mendoza"
                    className={`w-full min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                      errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lead-company" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Empresa u Organización <span className="text-slate-400 font-normal">(Opcional)</span>
                  </label>
                  <input
                    id="lead-company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Ej. Minera del Norte S.A. de C.V."
                    className="w-full min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Teléfono y Correo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Teléfono Celular / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ej. 662 123 4567"
                    className={`w-full min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                      errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lead-email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Correo Electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nombre@empresa.com"
                    className={`w-full min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Tipo de Proyecto / Interés */}
              <div>
                <label htmlFor="lead-projectType" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Tipo de Proyecto o Interés <span className="text-red-500">*</span>
                </label>
                <select
                  id="lead-projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full min-h-[44px] px-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all cursor-pointer"
                >
                  {projectOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.projectType}
                  </p>
                )}
              </div>

              {/* Row 4: Mensaje */}
              <div>
                <label htmlFor="lead-message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Mensaje / Descripción del Requerimiento <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe brevemente la concesión, yacimiento, servicio requerido o interés en la plataforma..."
                  className={`w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                    errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-200 dark:border-slate-800'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Atención directa y confidencialidad minera garantizada</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto min-h-[46px] px-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Enviar por WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
