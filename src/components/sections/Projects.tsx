import React from 'react';
import { ArrowRight } from 'lucide-react';
import { projects } from '../../data/content';
import { SectionIntro } from '../ui/SectionIntro';

export const Projects = () => (
  <section id="cases" className="section-shell">
    <div className="site-container">
      <SectionIntro
        eyebrow="Cases e historico"
        title="Uma area de projetos desenhada para provar execucao real, contexto tecnico e repertorio de atendimento."
        description="Em vez de apenas listar logos, os cases ganham contexto, escopo e resultado percebido. Isso fortalece autoridade e reduz a sensacao de site generico."
      />

      <div className="mt-10 grid gap-5 xl:grid-cols-2">
        {projects.map((project) => (
          <article key={project.client} className="panel p-6">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-28 items-center justify-center rounded-[20px] border border-brand-line bg-brand-surface px-4">
                  <img src={project.logo} alt={`Logo ${project.client}`} className="max-h-9 w-auto object-contain" loading="lazy" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">{project.sector}</p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-brand-ink">{project.client}</h3>
                </div>
              </div>
              <span className="rounded-full border border-brand-line px-4 py-2 text-sm text-brand-muted">Case institucional</span>
            </div>

            <p className="mt-5 text-sm leading-7 text-brand-muted">{project.summary}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {project.scope.map((item) => (
                <div key={item} className="rounded-[20px] border border-brand-line bg-brand-surface px-4 py-4 text-sm text-brand-ink">
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[24px] border border-brand-line bg-white px-5 py-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">Resultado percebido</p>
              <p className="mt-3 text-sm leading-7 text-brand-muted">{project.impact}</p>
            </div>

            <a href="#contato" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-accent transition hover:gap-3">
              Solicitar proposta semelhante
              <ArrowRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);
