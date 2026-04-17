import React from 'react';
import { ArrowRight } from 'lucide-react';
import { services } from '../../data/content';
import { SectionIntro } from '../ui/SectionIntro';

export const Services = () => (
  <section id="servicos" className="section-shell">
    <div className="site-container">
      <SectionIntro
        eyebrow="Servicos"
        title="Uma vitrine de solucoes organizada para o cliente entender rapido o que a S2F faz e onde entrega valor."
        description="Os servicos foram reestruturados com linguagem mais clara, melhor escaneabilidade e foco em problemas reais que a empresa resolve no dia a dia."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <article key={service.title} className="panel flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-2xl bg-brand-accent/10 p-3 text-brand-accent">
                  <Icon size={22} />
                </div>
                <span className="rounded-full border border-brand-line px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-muted">
                  {service.focus}
                </span>
              </div>

              <h3 className="mt-5 font-heading text-2xl font-bold text-brand-ink">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-brand-muted">{service.summary}</p>

              <ul className="mt-6 space-y-3">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-2xl border border-brand-line bg-brand-surface px-4 py-3 text-sm text-brand-ink">
                    {bullet}
                  </li>
                ))}
              </ul>

              <a href="#contato" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-accent transition hover:gap-3">
                Falar sobre este escopo
                <ArrowRight size={16} />
              </a>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
