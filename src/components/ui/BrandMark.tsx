import React from 'react';

type BrandMarkProps = {
  inverse?: boolean;
};

export const BrandMark = ({ inverse = false }: BrandMarkProps) => (
  <div className="flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl font-heading font-extrabold tracking-[-0.08em] shadow-[0_14px_40px_rgba(7,16,27,0.18)] backdrop-blur">
      <span className={inverse ? 'text-white' : 'text-brand-ink'}>S2</span>
      <span className="text-brand-accent">F</span>
    </div>
    <div className="leading-tight">
      <span className={`block font-heading text-base font-bold ${inverse ? 'text-white' : 'text-brand-ink'}`}>
        S2F Engenharia
      </span>
      <span className={`block text-[0.65rem] font-bold uppercase tracking-[0.24em] ${inverse ? 'text-white/60' : 'text-brand-muted'}`}>
        Solucoes tecnicas e industriais
      </span>
    </div>
  </div>
);
