import React from 'react';

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
  inverse?: boolean;
};

export const SectionIntro = ({
  eyebrow,
  title,
  description,
  align = 'left',
  inverse = false,
}: SectionIntroProps) => {
  const alignment = align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left';
  const titleColor = inverse ? 'text-white' : 'text-brand-ink';
  const copyColor = inverse ? 'text-white/70' : 'text-brand-muted';

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={`section-title ${titleColor}`}>{title}</h2>
      <p className={`section-copy ${copyColor}`}>{description}</p>
    </div>
  );
};
