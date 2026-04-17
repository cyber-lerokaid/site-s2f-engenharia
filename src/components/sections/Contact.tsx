import React, { useState } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { contactDetails, serviceOptions } from '../../data/content';
import { SectionIntro } from '../ui/SectionIntro';

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: serviceOptions[0] ?? '',
  message: '',
};

export const Contact = () => {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Informe o nome do responsavel.';
    if (!formData.company.trim()) nextErrors.company = 'Informe a empresa.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Informe um e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Use um e-mail valido.';
    }
    if (!formData.phone.trim()) nextErrors.phone = 'Informe um telefone.';
    if (!formData.service.trim()) nextErrors.service = 'Selecione o servico.';
    if (!formData.message.trim()) nextErrors.message = 'Descreva a necessidade.';

    return nextErrors;
  };

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setFormData((current) => ({ ...current, [field]: value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus({ type: 'error', message: 'Revise os campos destacados para continuar.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      const response = await fetch('/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: formData.service,
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? 'Nao foi possivel enviar sua solicitacao agora.');
      }

      setFormData(initialState);
      setStatus({
        type: 'success',
        message: result.message ?? 'Solicitacao enviada com sucesso. Nossa equipe retornara em breve.',
      });
      setErrors({});
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Ocorreu um erro inesperado.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="section-shell bg-brand-deep text-white">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="flex flex-col justify-between gap-8">
            <SectionIntro
              eyebrow="Contato"
              title="Uma area final de conversao muito mais estrategica, clara e orientada a gerar orcamento."
              description="O formulario ganhou melhor hierarquia, contexto e orientacao comercial. A pagina tambem distribui melhor os caminhos de contato para reduzir atrito."
              inverse
            />

            <div className="grid gap-4">
              <article className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white/10 p-3 text-brand-accent">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">Telefone comercial</p>
                    <a href={contactDetails.phoneHref} className="mt-2 block font-heading text-2xl font-bold text-white">
                      {contactDetails.phoneDisplay}
                    </a>
                    <p className="mt-2 text-sm leading-6 text-white/70">{contactDetails.responseTime}</p>
                  </div>
                </div>
              </article>

              <article className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white/10 p-3 text-brand-accent">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">WhatsApp</p>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Ideal para iniciar a triagem, compartilhar contexto e acelerar o direcionamento comercial.
                    </p>
                    <a href={contactDetails.whatsappUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-bold text-white underline decoration-brand-accent underline-offset-4">
                      Falar agora pelo WhatsApp
                    </a>
                  </div>
                </div>
              </article>

              <article className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-white/10 p-3 text-brand-accent">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">E-mail corporativo</p>
                    <a href={contactDetails.emailHref} className="mt-2 block text-base font-semibold text-white">
                      {contactDetails.email}
                    </a>
                    <p className="mt-2 text-sm leading-6 text-white/70">{contactDetails.supportNote}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="panel p-6 md:p-8">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-brand-ink">
                    Nome do responsavel
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange('name')}
                    className="field"
                    placeholder="Ex.: Joao Silva"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && <p id="contact-name-error" className="mt-2 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="contact-company" className="mb-2 block text-sm font-bold text-brand-ink">
                    Empresa
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange('company')}
                    className="field"
                    placeholder="Ex.: Empresa XYZ"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? 'contact-company-error' : undefined}
                  />
                  {errors.company && (
                    <p id="contact-company-error" className="mt-2 text-sm text-red-600">
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-email" className="mb-2 block text-sm font-bold text-brand-ink">
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className="field"
                    placeholder="voce@empresa.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && <p id="contact-email-error" className="mt-2 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="mb-2 block text-sm font-bold text-brand-ink">
                    Telefone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    className="field"
                    placeholder="(92) 99999-9999"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  />
                  {errors.phone && <p id="contact-phone-error" className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-service" className="mb-2 block text-sm font-bold text-brand-ink">
                  Servico de interesse
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange('service')}
                  className="field"
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? 'contact-service-error' : undefined}
                >
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.service && <p id="contact-service-error" className="mt-2 text-sm text-red-600">{errors.service}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-brand-ink">
                  Descreva a demanda
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange('message')}
                  className="field min-h-[160px] resize-y"
                  placeholder="Explique o contexto, o local, a urgencia e o que precisa ser avaliado."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-2 text-sm text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="rounded-[24px] border border-brand-line bg-brand-surface px-5 py-4 text-sm leading-7 text-brand-muted">
                Envie o maximo de contexto possivel. Isso ajuda a equipe comercial a direcionar visita, escopo ou proposta com mais rapidez.
              </div>

              {status.type !== 'idle' && (
                <div
                  className={`rounded-[20px] border px-4 py-3 text-sm ${
                    status.type === 'success'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-red-200 bg-red-50 text-red-700'
                  }`}
                  aria-live="polite"
                >
                  {status.message}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="primary-button w-full justify-center py-4 text-base disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? 'Enviando solicitacao...' : 'Solicitar analise comercial e tecnica'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
