import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Factory,
  Gauge,
  HardHat,
  ShieldCheck,
  Workflow,
  Wrench,
  Zap,
} from 'lucide-react';

import logoCanon from '../../images/canon.jpg';
import logoCocaCola from '../../images/Coca-Cola.jpg';
import logoCopag from '../../images/Copag.jpg';
import logoDdw from '../../images/ddw.jpg';
import logoNansen from '../../images/Nansen.jpg';
import logoSuperTerminais from '../../images/super-terminais.png';
import logoVirrosas from '../../images/Virrosas.jpg';

export type NavItem = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  label: string;
  detail: string;
};

export type Differentiator = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServiceItem = {
  title: string;
  summary: string;
  focus: string;
  bullets: string[];
  icon: LucideIcon;
};

export type ProjectItem = {
  client: string;
  sector: string;
  logo: string;
  summary: string;
  scope: string[];
  impact: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const navItems: NavItem[] = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicos', href: '#servicos' },
  { label: 'Cases', href: '#cases' },
  { label: 'Empresa', href: '#empresa' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];

export const heroChips = [
  'Projetos executivos e adequacoes normativas',
  'Instalacoes eletricas, infraestrutura e manutencao',
  'Atendimento para industrias, logistica e retrofit corporativo',
];

export const heroHighlights = [
  {
    title: 'Diagnostico tecnico objetivo',
    description: 'Levantamento em campo, avaliacao de risco e definicao clara do escopo antes da execucao.',
  },
  {
    title: 'Gestao com responsabilidade',
    description: 'Cronograma, documentacao e comunicacao alinhados com a operacao do cliente.',
  },
  {
    title: 'Entrega com conformidade',
    description: 'Execucao orientada por NR-10, NR-12, NR-35, NBR 5410 e requisitos da planta.',
  },
];

export const stats: StatItem[] = [
  {
    value: '15+',
    label: 'anos de experiencia acumulada',
    detail: 'Vivencia em rotina fabril, retrofit, manutencao e adequacoes tecnicas.',
  },
  {
    value: '450+',
    label: 'entregas tecnicas executadas',
    detail: 'Projetos, correcoes, instalacoes, paradas programadas e documentacao final.',
  },
  {
    value: '24h',
    label: 'janela de retorno comercial',
    detail: 'Contato agil para triagem, direcionamento tecnico e proximos passos da proposta.',
  },
  {
    value: 'NR + NBR',
    label: 'foco em conformidade',
    detail: 'Escopo pensado para reduzir risco operacional, passivo tecnico e improviso de obra.',
  },
];

export const standards = [
  'NR-10 | Seguranca em instalacoes eletricas',
  'NR-12 | Adequacao de maquinas e protecao operacional',
  'NR-35 | Trabalho em altura e execucao segura',
  'NBR 5410 | Instalacoes eletricas de baixa tensao',
  'NBR 5419 | SPDA e protecao contra descargas atmosfericas',
  'Procedimentos, laudos e documentacao de entrega',
];

export const differentials: Differentiator[] = [
  {
    title: 'Coordenacao sem improviso',
    description: 'Escopo, priorizacao e execucao pensados para minimizar impacto na operacao do cliente.',
    icon: Workflow,
  },
  {
    title: 'Leitura tecnica do ambiente',
    description: 'Analise de risco, infraestrutura existente e restricoes reais de obra antes de propor solucao.',
    icon: Gauge,
  },
  {
    title: 'Execucao para ambientes criticos',
    description: 'Atuacao em industrias, operacoes logisticas e instalacoes que exigem rotina controlada.',
    icon: Factory,
  },
  {
    title: 'Confianca documental',
    description: 'Entrega com registros, checklist, evidencias e direcionamento tecnico para continuidade da operacao.',
    icon: BadgeCheck,
  },
];

export const aboutPillars = [
  {
    title: 'Projetar e executar no mesmo padrao',
    description: 'Da visita tecnica a liberacao final, mantemos coerencia entre diagnostico, proposta e obra.',
  },
  {
    title: 'Organizacao para ambientes produtivos',
    description: 'Planejamento de intervencao, cronograma e comunicacao alinhados ao ritmo da planta e as janelas disponiveis.',
  },
  {
    title: 'Equipe preparada para rotina industrial',
    description: 'Servicos conduzidos com disciplina de seguranca, leitura de risco e postura compativel com operacoes ativas.',
  },
  {
    title: 'Visao de continuidade operacional',
    description: 'O objetivo nao e apenas corrigir. E garantir estabilidade, previsibilidade e confianca no pos-entrega.',
  },
];

export const operationTags = [
  'Subestacoes e quadros de distribuicao',
  'Adequacoes NR e compliance tecnico',
  'Infraestrutura eletrica e industrial',
  'Manutencao corretiva, preventiva e retrofit',
  'Centros logisticos, plantas fabris e operacoes corporativas',
];

export const services: ServiceItem[] = [
  {
    title: 'Projetos e consultoria tecnica',
    summary:
      'Estudos, memoriais, levantamentos e projetos executivos para ampliar seguranca, previsibilidade e tomada de decisao.',
    focus: 'Planejamento com visao de operacao e viabilidade',
    bullets: ['Projetos eletricos BT e MT', 'Estudos de seletividade e protecao', 'Levantamentos e escopo executivo'],
    icon: ClipboardCheck,
  },
  {
    title: 'Instalacoes eletricas e infraestrutura',
    summary:
      'Montagem, adequacao e expansao de sistemas eletricos com foco em confiabilidade, organizacao de obra e conformidade.',
    focus: 'Execucao limpa, segura e documentada',
    bullets: ['QGBT, paineis e alimentadores', 'Infraestrutura aparente e embutida', 'Aterramento, SPDA e circuitos dedicados'],
    icon: Zap,
  },
  {
    title: 'Manutencao industrial e intervencoes criticas',
    summary:
      'Atuacao preventiva e corretiva em ativos eletricos e infraestrutura fabril para reduzir paradas e inseguranca operacional.',
    focus: 'Menos risco, mais previsibilidade',
    bullets: ['Inspecoes tecnicas e termografia', 'Correcoes emergenciais planejadas', 'Apoio a paradas programadas'],
    icon: Wrench,
  },
  {
    title: 'Adequacoes normativas e seguranca operacional',
    summary:
      'Ajustes estruturais e tecnicos para elevar o padrao de seguranca e atender requisitos regulatorios com clareza.',
    focus: 'Conformidade com logica de operacao real',
    bullets: ['Adequacoes NR-10, NR-12 e NR-35', 'Protecoes, sinalizacao e barreiras', 'Checklist, registros e documentacao'],
    icon: ShieldCheck,
  },
  {
    title: 'Facilities e reformas tecnicas',
    summary:
      'Intervencoes civis, estruturais e complementares para retrofit, reorganizacao de layout e atualizacao de areas produtivas.',
    focus: 'Integracao entre obra, prazo e uso do espaco',
    bullets: ['Adequacao de layout industrial', 'Estruturas metalicas e suportacoes', 'Reformas tecnicas em areas corporativas'],
    icon: HardHat,
  },
  {
    title: 'Solucoes para plantas e operacoes corporativas',
    summary:
      'Atendimento adaptado ao contexto de fabricas, centros logisticos, condominios industriais e ambientes de alta demanda.',
    focus: 'Atuacao consultiva e executiva de ponta a ponta',
    bullets: ['Diagnostico do ambiente existente', 'Definicao de prioridades de investimento', 'Execucao com apoio a operacao'],
    icon: Building2,
  },
];

export const projects: ProjectItem[] = [
  {
    client: 'Super Terminais',
    sector: 'Terminal portuario e operacao de grande porte',
    logo: logoSuperTerminais,
    summary: 'Implantacao de solucoes de aterramento e conformidade para infraestrutura critica.',
    scope: ['Captacao, descida e malha de aterramento', 'Instalacao do BEP', 'Atendimento a requisitos de NR-20'],
    impact: 'Escopo conduzido com foco em seguranca operacional e estabilidade de ativos em ambiente sensivel.',
  },
  {
    client: 'Coca-Cola Recofarma Manaus',
    sector: 'Industria de bebidas e linha de producao',
    logo: logoCocaCola,
    summary: 'Manutencao preventiva e corretiva de subestacoes com suporte a continuidade fabril.',
    scope: ['Rotina tecnica em subestacoes', 'Termografia', 'Apoio a confiabilidade do sistema eletrico'],
    impact: 'Atuacao orientada para reduzir risco de interrupcao e preservar ritmo produtivo.',
  },
  {
    client: 'COPAG',
    sector: 'Planta industrial e sistemas auxiliares',
    logo: logoCopag,
    summary: 'Correcao em QGBT e intervencoes eletricas voltadas a estabilidade de equipamentos criticos.',
    scope: ['Manutencao corretiva em QGBT de chillers', 'Instalacoes BT', 'Termografia para analise de condicao'],
    impact: 'Resposta tecnica para ambientes que exigem assertividade e rapida retomada operacional.',
  },
  {
    client: 'Canon',
    sector: 'Ambiente corporativo-industrial',
    logo: logoCanon,
    summary: 'Rotina de manutencao preventiva em subestacao e emissao de laudo termografico.',
    scope: ['Manutencao preventiva', 'Laudo termografico', 'Acompanhamento tecnico da instalacao'],
    impact: 'Entrega com foco em previsibilidade de manutencao e clareza para tomada de decisao.',
  },
  {
    client: 'Nansen',
    sector: 'Infraestrutura eletrica e expansao de planta',
    logo: logoNansen,
    summary: 'Implantacao de infraestrutura de forca, quadros eletricos e sistemas de aterramento.',
    scope: ['Circuitos de distribuicao e forca', 'Quadros, luminarias e tomadas', 'Aterramento especifico e SPDA'],
    impact: 'Escopo executado com atencao a organizacao da infraestrutura e seguranca de operacao.',
  },
  {
    client: 'Virrosas',
    sector: 'Sistema de prevencao e infraestrutura predial',
    logo: logoVirrosas,
    summary: 'Manutencao e testes em sistema de hidrantes, alarme de incendio e documentacao tecnica.',
    scope: ['Testes no sistema de hidrantes', 'Sistema de alarme de incendio', 'Relatorio tecnico'],
    impact: 'Intervencao para elevar confiabilidade operacional e rastreabilidade da entrega.',
  },
  {
    client: 'DDW The Color House',
    sector: 'Operacao corporativa e suporte eletrico',
    logo: logoDdw,
    summary: 'Manutencao de subestacao, suporte em SDAI e assessoria em processos de AVCB.',
    scope: ['Disjuntor de media tensao', 'Destravamento de portas e SDAI', 'Assessoria em AVCB'],
    impact: 'Apoio tecnico integrado entre eletrica, seguranca e regularizacao operacional.',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Briefing tecnico',
    description: 'Entendimento do cenario, das urgencias, das restricoes da operacao e do objetivo do investimento.',
  },
  {
    step: '02',
    title: 'Diagnostico e escopo',
    description: 'Levantamento em campo, priorizacao de risco e estruturacao do escopo com clareza tecnica e comercial.',
  },
  {
    step: '03',
    title: 'Execucao controlada',
    description: 'Intervencao com coordenacao, disciplina de seguranca, registros e alinhamento continuo com o cliente.',
  },
  {
    step: '04',
    title: 'Entrega e continuidade',
    description: 'Validacao final, documentacao, orientacoes de uso e encaminhamento do que precisa ser acompanhado depois.',
  },
];

export const faqItems: FaqItem[] = [
  {
    question: 'Que tipo de empresa a S2F atende?',
    answer:
      'Atendemos industrias, centros logisticos, operacoes corporativas, condominios industriais e ambientes que exigem execucao tecnica com seguranca e organizacao.',
  },
  {
    question: 'Voces executam apenas projetos ou tambem a obra?',
    answer:
      'Podemos atuar no diagnostico, no projeto, na adequacao, na instalacao e no acompanhamento da execucao. O formato depende do escopo e da necessidade operacional do cliente.',
  },
  {
    question: 'Como funciona o orcamento?',
    answer:
      'A triagem inicial identifica o tipo de demanda, a urgencia, a localizacao e o contexto tecnico. A partir disso, definimos visita, informacoes complementares ou proposta comercial.',
  },
  {
    question: 'A empresa trabalha com adequacoes normativas?',
    answer:
      'Sim. Atuamos em adequacoes ligadas a NR-10, NR-12, NR-35, infraestrutura eletrica, sinalizacao, protecao e demais requisitos associados ao ambiente de operacao.',
  },
  {
    question: 'Voces atendem demandas urgentes?',
    answer:
      'Sim, desde que a analise tecnica confirme viabilidade e seguranca. Quando necessario, priorizamos o atendimento e orientamos a melhor forma de intervencao.',
  },
];

export const contactDetails = {
  phoneDisplay: '(92) 99196-9040',
  phoneHref: 'tel:+5592991969040',
  whatsappUrl:
    'https://wa.me/5592991969040?text=Ola%2C%20preciso%20de%20uma%20avaliacao%20tecnica%20para%20um%20servico%20de%20engenharia.',
  email: 'comercial@s2fengenharia.com.br',
  emailHref: 'mailto:comercial@s2fengenharia.com.br',
  location: 'Manaus, AM',
  coverage: 'Atendimento em Manaus, Polo Industrial e regiao Norte',
  responseTime: 'Retorno comercial em ate 1 dia util.',
  supportNote: 'Para demandas criticas, a triagem inicial pode indicar atendimento prioritario e visita tecnica.',
};

export const serviceOptions = services.map((service) => service.title);

export const siteSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'S2F Engenharia',
  description:
    'Empresa de engenharia industrial e eletrica com atuacao em projetos, adequacoes normativas, instalacoes, manutencao e infraestrutura tecnica.',
  areaServed: ['Manaus', 'Amazonas', 'Regiao Norte'],
  telephone: '+55 92 99196-9040',
  email: contactDetails.email,
  url: 'https://s2fengenharia.com.br',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Manaus',
    addressRegion: 'AM',
    addressCountry: 'BR',
  },
  sameAs: [contactDetails.whatsappUrl],
};
