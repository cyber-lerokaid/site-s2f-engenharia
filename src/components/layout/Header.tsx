import React, { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { contactDetails, navItems } from '../../data/content';
import { BrandMark } from '../ui/BrandMark';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'border-b border-white/10 bg-[rgba(7,16,27,0.92)] shadow-[0_22px_70px_rgba(7,16,27,0.36)] backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="hidden border-b border-white/10 bg-[rgba(7,16,27,0.54)] lg:block">
        <div className="site-container flex items-center justify-between py-3 text-xs text-white/70">
          <p>Engenharia para operacoes industriais, logisticas e ambientes corporativos de alta exigencia.</p>
          <div className="flex items-center gap-5">
            <a href={contactDetails.emailHref} className="hover:text-white transition-colors">
              {contactDetails.email}
            </a>
            <a href={contactDetails.phoneHref} className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={14} />
              {contactDetails.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="site-container flex items-center justify-between py-4">
        <a href="#inicio" aria-label="Ir para o inicio">
          <BrandMark inverse />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={contactDetails.phoneHref} className="secondary-button border-white/15 bg-white/5 px-5 text-white hover:border-white/30 hover:text-white">
            {contactDetails.phoneDisplay}
          </a>
          <a href="#contato" className="primary-button px-5">
            Solicitar diagnostico
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white transition hover:bg-white/15 lg:hidden"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`lg:hidden transition-all duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="site-container pb-6">
          <div className="panel-dark p-6">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl px-4 py-3 text-lg font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-accent">
                Atendimento comercial
              </p>
              <a href={contactDetails.phoneHref} className="mt-3 block text-2xl font-heading font-bold text-white">
                {contactDetails.phoneDisplay}
              </a>
              <p className="mt-2 text-sm leading-6 text-white/70">{contactDetails.coverage}</p>
              <div className="mt-5 flex flex-col gap-3">
                <a href="#contato" onClick={() => setIsOpen(false)} className="primary-button w-full">
                  Solicitar orcamento
                </a>
                <a href={contactDetails.whatsappUrl} target="_blank" rel="noreferrer" className="secondary-button w-full border-white/15 bg-white/5 text-white hover:text-white">
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
