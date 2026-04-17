import React from 'react';
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react';
import { contactDetails, heroChips, heroHighlights } from '../../data/content';

export const Hero = () => (
  <section id="inicio" className="relative overflow-hidden bg-brand-deep pb-24 pt-32 text-white md:pb-28 md:pt-40">
    <div className="technical-grid absolute inset-0 opacity-35" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(202,168,102,0.18),transparent_24%),radial-gradient(circle_at_left,rgba(21,161,154,0.16),transparent_28%),linear-gradient(180deg,rgba(7,16,27,0.78),rgba(7,16,27,1))]" />

    <div className="site-container relative">
      <div className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-end">
        <div className="max-w-3xl">
          <span className="eyebrow">Engenharia industrial para operacoes criticas</span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-white md:text-6xl xl:text-7xl">
            Projetos, instalacoes e manutencao com padrao de execucao que transmite confianca antes da primeira visita.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
            A S2F atua em industrias, centros logisticos e ambientes corporativos com foco em infraestrutura eletrica,
            adequacoes normativas, manutencao critica e solucoes sob medida para ambientes que nao podem parar.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contato" className="primary-button">
              Solicitar diagnostico tecnico
              <ArrowRight size={18} />
            </a>
            <a href="#cases" className="secondary-button border-white/10 bg-white/10 text-white hover:text-white">
              Ver casos executados
            </a>
          </div>

          <ul className="mt-8 space-y-3 text-sm text-white/75 md:text-base">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="mt-1 shrink-0 text-brand-accent" />
              <span>Escopo tecnico claro, cronograma alinhado a operacao e documentacao de entrega.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="mt-1 shrink-0 text-brand-accent" />
              <span>Atuacao com foco em seguranca, risco operacional, conformidade normativa e previsibilidade.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="mt-1 shrink-0 text-brand-accent" />
              <span>Atendimento consultivo para demandas industriais, logisticas, retrofit e manutencao especializada.</span>
            </li>
          </ul>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {heroChips.map((chip) => (
              <div key={chip} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-white/75 backdrop-blur">
                {chip}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="panel-dark overflow-hidden">
            <div className="relative min-h-[420px] sm:min-h-[520px]">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
                alt="Equipe tecnica em reuniao avaliando solucao industrial"
                className="absolute inset-0 h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,27,0.25),rgba(7,16,27,0.75)),linear-gradient(135deg,rgba(7,16,27,0.2),rgba(16,34,53,0.9))]" />

              <div className="absolute left-6 right-6 top-6 rounded-[24px] border border-white/10 bg-[rgba(7,16,27,0.58)] p-5 backdrop-blur">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-accent">
                  Sala tecnica S2F
                </p>
                <div className="mt-4 space-y-4">
                  {heroHighlights.map((item) => (
                    <div key={item.title} className="border-l border-brand-accent/40 pl-4">
                      <p className="font-heading text-lg font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/70">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-brand-gold">Cobertura de atendimento</p>
                <div className="mt-3 flex items-start gap-3">
                  <MapPin size={18} className="mt-1 shrink-0 text-brand-accent" />
                  <div>
                    <p className="font-heading text-xl font-bold text-white">{contactDetails.location}</p>
                    <p className="mt-1 text-sm leading-6 text-white/75">{contactDetails.coverage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
