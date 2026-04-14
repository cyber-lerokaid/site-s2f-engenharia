import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { aboutPillars, differentials, operationTags } from '../../data/content';
import { SectionIntro } from '../ui/SectionIntro';

export const About = () => (
  <section id="empresa" className="section-shell bg-white">
    <div className="site-container">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="panel order-2 overflow-hidden lg:order-1">
          <div className="relative min-h-[420px]">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
              alt="Profissional de engenharia em obra industrial"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,27,0.05),rgba(7,16,27,0.72))]" />

            <div className="absolute bottom-6 left-6 right-6 rounded-[24px] border border-white/10 bg-[rgba(7,16,27,0.6)] p-6 text-white backdrop-blur">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-accent">Postura de execucao</p>
              <p className="mt-3 font-heading text-2xl font-bold leading-tight">
                Organizacao, presenca tecnica e responsabilidade na forma de conduzir cada frente.
              </p>
              <p className="mt-3 text-sm leading-6 text-white/75">
                A imagem institucional deixa de parecer generica e passa a comunicar maturidade de obra, seguranca e capacidade de entrega.
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 flex flex-col justify-center gap-8 lg:order-2">
          <SectionIntro
            eyebrow="Empresa"
            title="Uma apresentacao corporativa mais robusta para explicar quem executa, como trabalha e por que vale confiar."
            description="A secao sobre a empresa foi redesenhada para reforcar competencia tecnica, organizacao operacional e compromisso com a continuidade do cliente."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {aboutPillars.map((pillar) => (
              <article key={pillar.title} className="rounded-[24px] border border-brand-line bg-brand-surface px-5 py-5">
                <h3 className="font-heading text-lg font-bold text-brand-ink">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-brand-muted">{pillar.description}</p>
              </article>
            ))}
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">Contextos em que a S2F atua</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {operationTags.map((tag) => (
                <span key={tag} className="rounded-full border border-brand-line bg-white px-4 py-2 text-sm text-brand-muted">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {differentials.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className="panel p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-brand-accent/10 p-3 text-brand-accent">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-ink">{item.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-brand-muted">{item.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-brand-ink">
                <CheckCircle2 size={16} className="text-brand-accent" />
                Diferencial reposicionado para transmitir mais confianca.
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
