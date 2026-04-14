import React from 'react';
import { processSteps } from '../../data/content';
import { SectionIntro } from '../ui/SectionIntro';

export const Methodology = () => (
  <section className="section-shell bg-brand-deep text-white">
    <div className="site-container">
      <SectionIntro
        eyebrow="Processo de atendimento"
        title="A jornada comercial foi reorganizada para mostrar metodo, nao improviso."
        description="Quando o processo esta claro, a experiencia transmite mais seguranca e reduz atrito para quem quer avancar com visita, escopo ou proposta."
        inverse
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-4">
        {processSteps.map((step) => (
          <article key={step.step} className="panel-dark h-full p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 font-heading text-xl font-bold text-white">
              {step.step}
            </div>
            <h3 className="mt-5 font-heading text-2xl font-bold text-white">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">{step.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);
