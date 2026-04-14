import React from 'react';
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { contactDetails, navItems, services } from '../../data/content';
import { BrandMark } from '../ui/BrandMark';

export const Footer = () => (
  <footer className="border-t border-white/10 bg-brand-deep pb-24 pt-16 text-white md:pb-12">
    <div className="site-container">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr_0.9fr]">
        <div className="space-y-5">
          <BrandMark inverse />
          <p className="max-w-md text-sm leading-7 text-white/70">
            Projetos, instalacoes, adequacoes normativas e manutencao para operacoes que precisam de execucao seria,
            segura e bem documentada.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={contactDetails.whatsappUrl} target="_blank" rel="noreferrer" className="primary-button">
              WhatsApp comercial
            </a>
            <a href={contactDetails.emailHref} className="secondary-button border-white/15 bg-white/5 text-white hover:text-white">
              Enviar e-mail
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">Navegacao</p>
          <ul className="mt-5 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
                  <ChevronRight size={16} className="text-brand-accent" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">Servicos-chave</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {services.slice(0, 4).map((service) => (
              <li key={service.title} className="inline-flex items-start gap-2 leading-6">
                <ChevronRight size={16} className="mt-1 shrink-0 text-brand-accent" />
                <span>{service.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">Contato</p>
          <ul className="mt-5 space-y-4 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <Phone size={16} className="mt-1 shrink-0 text-brand-accent" />
              <a href={contactDetails.phoneHref} className="hover:text-white transition-colors">
                {contactDetails.phoneDisplay}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={16} className="mt-1 shrink-0 text-brand-accent" />
              <a href={contactDetails.emailHref} className="hover:text-white transition-colors">
                {contactDetails.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 shrink-0 text-brand-accent" />
              <span>
                {contactDetails.location}
                <br />
                {contactDetails.coverage}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 h-px w-full glow-divider opacity-80" />

      <div className="mt-8 flex flex-col gap-3 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} S2F Engenharia. Todos os direitos reservados.</p>
        <p>Site reformulado para apresentar confianca, clareza tecnica e melhor experiencia comercial.</p>
      </div>
    </div>
  </footer>
);
