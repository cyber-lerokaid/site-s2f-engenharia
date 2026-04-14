import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { projects, standards } from '../../data/content';
import { SectionIntro } from '../ui/SectionIntro';

export const Authority = () => (
  <section className="section-shell pt-12">
    <div className="site-container">
      <div className="panel overflow-hidden">
        <div className="grid gap-8 border-b border-brand-line px-6 py-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionIntro
            eyebrow="Autoridade tecnica"
            title="Normas, disciplina de execucao e leitura de ambiente fazem parte do servico, nao do discurso."
            description="A percepcao de confianca cresce quando o site comunica processo, conformidade e historico de execucao com objetividade."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {standards.map((item) => (
              <div key={item} className="rounded-[22px] border border-brand-line bg-brand-surface px-5 py-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-brand-accent/10 p-2 text-brand-accent">
                    <ShieldCheck size={18} />
                  </div>
                  <p className="text-sm leading-6 text-brand-ink">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-8 lg:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-accent">Referencias de mercado</p>
              <p className="mt-2 text-base leading-7 text-brand-muted">
                Espaco reestruturado para mostrar que a empresa executa, atende operacoes reais e ja passou por ambientes
                de alto nivel de exigencia.
              </p>
            </div>
            <p className="text-sm text-brand-muted">Marcas exibidas como referencia institucional de historico de atendimento.</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-7">
            {projects.map((project) => (
              <div
                key={project.client}
                className="flex min-h-[112px] items-center justify-center rounded-[24px] border border-brand-line bg-white px-5 py-4"
              >
                <img
                  src={project.logo}
                  alt={`Logo ${project.client}`}
                  className="max-h-11 w-auto object-contain grayscale transition duration-300 hover:grayscale-0"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
