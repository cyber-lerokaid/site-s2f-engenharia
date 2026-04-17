import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { faqItems } from '../../data/content';
import { SectionIntro } from '../ui/SectionIntro';

export const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-shell bg-white">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionIntro
            eyebrow="FAQ"
            title="Duvidas comuns respondidas com mais clareza para reduzir friccao antes do contato."
            description="A secao de perguntas frequentes organiza objecoes tipicas de contratacao e ajuda o visitante a entender se a S2F e aderente ao seu cenario."
          />

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <article key={item.question} className="panel overflow-hidden">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-heading text-lg font-bold text-brand-ink">{item.question}</span>
                      <ChevronRight
                        size={20}
                        className={`shrink-0 text-brand-accent transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                      />
                    </button>
                  </h3>
                  {isOpen && <div className="border-t border-brand-line px-5 pb-5 pt-4 text-sm leading-7 text-brand-muted">{item.answer}</div>}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
