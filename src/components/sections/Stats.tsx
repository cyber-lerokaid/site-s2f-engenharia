import React from 'react';
import { stats } from '../../data/content';

export const Stats = () => (
  <section className="relative -mt-10 pb-10 md:-mt-16">
    <div className="site-container">
      <div className="panel px-6 py-8 md:px-8 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <span className="eyebrow">Confianca comercial e tecnica</span>
            <h2 className="mt-5 font-heading text-3xl font-extrabold text-brand-ink md:text-4xl">
              Proposta de valor mais clara e mais forte logo na primeira dobra.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-brand-muted">
              Em vez de uma home generica, a pagina passa a mostrar maturidade de execucao, clareza de escopo e sinais
              concretos de organizacao para o cliente que precisa contratar com seguranca.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <article key={stat.label} className="rounded-[24px] border border-brand-line bg-brand-surface px-5 py-6">
                <p className="font-heading text-3xl font-extrabold text-brand-ink">{stat.value}</p>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-accent">{stat.label}</p>
                <p className="mt-3 text-sm leading-6 text-brand-muted">{stat.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
