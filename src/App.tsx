/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { 
  Menu, X, Phone, Mail, MapPin, 
  HardHat, Zap,
  MessageCircle, ArrowRight, CheckCircle2, ChevronRight,
  ClipboardCheck, Clock, ShieldCheck,
  Linkedin, Instagram
} from 'lucide-react';

import logoCanon from '../images/canon.jpg';
import logoCocaCola from '../images/Coca-Cola.jpg';
import logoCopag from '../images/Copag.jpg';
import logoDdw from '../images/ddw.jpg';
import logoNansen from '../images/Nansen.jpg';
import logoSuperTerminais from '../images/super-terminais.png';
import logoVirrosas from '../images/Virrosas.jpg';

const FadeIn = ({ children, delay = 0, direction = 'up' }: { children: React.ReactNode, delay?: number, direction?: 'up' | 'down' | 'left' | 'right' | 'none', key?: string | number }) => {
  const directions = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { x: 32, y: 0 },
    right: { x: -32, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(10, 61, 115, 0.3)"
      }}
      transition={{
        scale: { duration: 0.3 },
        boxShadow: { duration: 0.3 }
      }}
      className={className}
    >
      <div 
        style={{ 
          transform: "translateZ(40px)", 
          transformStyle: "preserve-3d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%"
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

const Counter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animationFrame = requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (countRef.current) observer.observe(countRef.current);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, [end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalData, setModalData] = useState<{title: string, text: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [emailValue, setEmailValue] = useState('');
  const [clientModalData, setClientModalData] = useState<{nome: string, servicos: string[]} | null>(null);
  const [serviceModalData, setServiceModalData] = useState<{titulo: string, imagem: string, descricao: string, detalhes: string[]} | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const servicesData = {
    "projetos-consultoria": {
      titulo: "Engenharia Consultiva",
      numero: "01",      icon: <ClipboardCheck size={40} />,
      descricao: "Desenvolvimento de projetos executivos e consultoria estratégica para otimização de CAPEX e OPEX industrial.",
      detalhes: ["Projetos Elétricos (BT/MT).", "Estudos de Seletividade.", "Eficiência Energética.", "Gestão de Ativos Industriais."]
    },
    "automacao-industrial": {
      titulo: "Automação & Controle",
      numero: "02",
      icon: <ArrowRight size={40} />,
      descricao: "Integração de sistemas inteligentes para controle de processos e aumento da produtividade fabril.",
      detalhes: ["Programação de CLPs e IHMs.", "Sistemas de Supervisão (SCADA).", "Painéis de Automação.", "Retrofitting de Máquinas."]
    },
    "manutencao-industrial": {
      titulo: "Gestão de Manutenção",
      numero: "03",
      icon: <Clock size={40} />,
      descricao: "Planos de manutenção preditiva e preventiva focados em 'Zero Downtime' e longevidade de equipamentos.",
      detalhes: ["Manutenção Preditiva.", "Paradas de Fábrica Planejadas.", "Análise de Vibração.", "Contratos de Manutenção Global."]
    },
    "serralheria-industrial": {
      titulo: "Estruturas Metálicas",
      numero: "04",
      icon: <ArrowRight size={40} />,
      descricao: "Fabricação e montagem de estruturas de alta resistência seguindo rigorosos padrões de soldagem e segurança.",
      detalhes: ["Mezaninos e Passarelas.", "Suportação de Tubulações.", "Escadas de Emergência.", "Proteções de Máquinas (NR-12)."]
    },
    "piso-industrial": {
      titulo: "Revestimentos Técnicos",
      numero: "05",
      icon: <ArrowRight size={40} />,
      descricao: "Soluções em pisos de alta performance para ambientes logísticos e industriais de tráfego pesado.",
      detalhes: ["Concreto Polido.", "Revestimento Epóxi/PU.", "Recuperação de Juntas.", "Nivelamento a Laser."]
    },
    "reforma-geral": {
      titulo: "Facilities & Reformas",
      numero: "06",
      icon: <HardHat size={40} />,
      descricao: "Adequação e modernização de infraestrutura física com gestão integrada de cronograma e custos.",
      detalhes: ["Adequação de Layouts.", "Infraestrutura Hidráulica.", "Drywall e Divisórias.", "Acabamentos Industriais."]
    },
    "pintura-profissional": {
      titulo: "Tratamento de Superfícies",
      numero: "07",
      icon: <ArrowRight size={40} />,
      descricao: "Proteção anticorrosiva e pintura técnica para preservação de ativos em ambientes agressivos.",
      detalhes: ["Pintura Intumescente.", "Sinalização de Segurança.", "Jateamento Abrasivo.", "Impermeabilização de Lajes."]
    },
    "instalacoes-eletricas": {
      titulo: "Sistemas Elétricos",
      numero: "08",
      icon: <Zap size={40} />,
      descricao: "Instalações de alta complexidade em baixa e média tensão, garantindo estabilidade e segurança energética.",
      detalhes: ["Montagem de Subestações.", "Quadros de Distribuição (QGBT).", "Sistemas de Aterramento/SPDA.", "Laudos e Termografia."]
    }
  };

  const clientPortfolioData = {
    "super-terminais": {
      nome: "Super Terminais",
      logo: logoSuperTerminais,
      servicos: ["Subsistema de captação, descida e malha de aterramento.", "Instalação do BEP.", "Atendimento NR20."]
    },
    "virrosas": {
      nome: "Virrosas",
      logo: logoVirrosas,
      servicos: ["Manutenção e testes no sistema de hidrantes.", "Sistema de alarme de incêndio.", "Relatório técnico."]
    },
    "coca-cola": {
      nome: "Coca-Cola Recofarma Manaus",
      logo: logoCocaCola,
      servicos: ["Manutenção preventiva/corretiva das subestações.", "Termovisão."]
    },
    "copag": {
      nome: "COPAG",
      logo: logoCopag,
      servicos: ["Manutenção corretiva no QGBT de Chillers.", "Instalação BT.", "Termovisão."]
    },
    "nansen": {
      nome: "Nansen",
      logo: logoNansen,
      servicos: ["Infraestrutura de circuitos, distribuição e força.", "Quadros elétricos, luminárias, tomadas.", "Aterramento específico e SPDA."]
    },
    "canon": {
      nome: "Canon",
      logo: logoCanon,
      servicos: ["Manutenção Preventiva da Subestação.", "Laudo Termográfico."]
    },
    "ddw": {
      nome: "DDW The Color House",
      logo: logoDdw,
      servicos: ["Manutenção da Subestação, disjuntor de MT.", "Destravamento de portas e SDAI.", "Assessoria no AVCB."]
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmailValue(value);
    if (value && !validateEmail(value)) {
      setFormErrors(prev => ({ ...prev, email: 'Por favor, insira um e-mail válido.' }));
    } else {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    // Validation
    const errors: Record<string, string> = {};
    if (!data.name.trim()) errors.name = 'O nome é obrigatório.';
    if (!data.company.trim()) errors.company = 'A empresa é obrigatória.';
    if (!data.email.trim()) {
      errors.email = 'O e-mail é obrigatório.';
    } else if (!validateEmail(data.email)) {
      errors.email = 'E-mail inválido.';
    }
    if (!data.phone.trim()) errors.phone = 'O telefone é obrigatório.';
    if (!data.message.trim()) errors.message = 'A descrição é obrigatória.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    
    try {
      console.log('Sending lead data...', data);
      
      const response = await fetch('/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Server Response:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Erro ao processar solicitação');
      }

      form.reset();
      setEmailValue('');
      
      setModalData({
        title: "Mensagem Enviada!",
        text: "Obrigado! Recebemos sua solicitação com sucesso. Nossa equipe técnica analisará seu projeto e entrará em contato em breve."
      });

    } catch (error) {
      console.error('Submission Error:', error);
      setModalData({
        title: "Erro no Envio",
        text: error instanceof Error ? error.message : "Ocorreu um erro. Por favor, tente novamente ou use o WhatsApp."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-brand-light min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white py-3 shadow-lg' : 'bg-transparent py-6'}`}>
        {/* Geometric Background Shape */}
        <div className={`absolute top-0 left-0 h-full w-[240px] md:w-[350px] bg-brand-blue -skew-x-[25deg] -translate-x-20 z-0 transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-start leading-none">
              <div className="flex items-center font-heading font-black text-4xl tracking-tighter">
                <span className={!isScrolled ? "text-white" : "text-brand-blue"}>S2</span>
                <span className="text-brand-green">F</span>
              </div>
              <span className={`text-[10px] font-bold tracking-[0.2em] mt-1 ${!isScrolled ? 'text-white/80' : 'text-brand-blue/60'}`}>ENGENHARIA</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-bold text-[11px] uppercase tracking-[0.2em]">
            {['Home', 'Sobre nós', 'Serviços', 'Contato'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-').replace('ç', 'c').replace('ó', 'o')}`} 
                className={`${isScrolled ? 'text-brand-blue hover:text-brand-green' : 'text-white hover:text-brand-green'} transition-colors relative group`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a href="#contato" className="btn-primary py-3 px-6">
              Orçamento Rápido
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 relative w-10 h-10 flex items-center justify-center rounded-lg ${isScrolled ? 'text-brand-blue hover:bg-slate-100' : 'text-white bg-white/10 hover:bg-white/20'} transition-all duration-300`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-white flex flex-col p-8 md:hidden"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center font-heading font-black text-3xl tracking-tighter">
                  <span className="text-brand-blue">S2</span>
                  <span className="text-brand-green">F</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="text-brand-blue">
                  <X size={32} />
                </button>
              </div>

              <nav className="flex flex-col gap-8">
                {['Home', 'Sobre nós', 'Serviços', 'Contato'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-').replace('ç', 'c').replace('ó', 'o')}`} 
                    className="text-3xl font-black text-brand-blue uppercase tracking-tighter hover:text-brand-green transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <div className="mt-auto pt-12 border-t border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Fale Conosco</p>
                <p className="text-xl font-bold text-brand-blue mb-8">(92) 98123-4567</p>
                <a href="#contato" className="btn-primary w-full py-5" onClick={() => setMobileMenuOpen(false)}>
                  Solicitar Orçamento
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen md:h-screen flex items-center overflow-hidden py-20 md:py-0">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern Industrial Facility"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/10 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-blue/40 to-transparent z-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-10 md:pt-0">
          <div className="max-w-4xl">
            <FadeIn direction="right">
              <h1 className="text-3xl sm:text-4xl md:text-7xl font-heading font-black text-white mb-6 leading-[1.15] md:leading-[1.1] uppercase tracking-tighter">
                Engenharia de <span className="text-brand-green">Precisão</span> para Desafios Complexos
              </h1>
              <p className="text-base md:text-2xl text-white/90 mb-10 leading-relaxed font-medium max-w-2xl">
                S2F Engenharia: Referência em infraestrutura, automação e manutenção técnica. Garantimos continuidade operacional e conformidade normativa total.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contato" className="btn-primary">
                  Consultar Especialista
                </a>
                <a href="#servicos" className="btn-secondary">
                  Explorar Soluções
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white/50 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-blue-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Projetos Entregues", value: 450, suffix: "+" },
              { label: "Anos de Experiência", value: 15, suffix: "+" },
              { label: "Clientes Satisfeitos", value: 120, suffix: "+" },
              { label: "Equipe Técnica", value: 25, suffix: "+" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-heading font-black text-brand-green mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 font-medium uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Authority - NRs & Standards */}
      <section className="py-12 bg-gray-100 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-black text-brand-blue text-lg">
              <ShieldCheck className="text-brand-green" /> NR-10
            </div>
            <div className="flex items-center gap-2 font-black text-brand-blue text-lg">
              <ShieldCheck className="text-brand-green" /> NR-12
            </div>
            <div className="flex items-center gap-2 font-black text-brand-blue text-lg">
              <ShieldCheck className="text-brand-green" /> NR-35
            </div>
            <div className="flex items-center gap-2 font-black text-brand-blue text-lg">
              <ShieldCheck className="text-brand-green" /> NBR 5410
            </div>
            <div className="flex items-center gap-2 font-black text-brand-blue text-lg">
              <ShieldCheck className="text-brand-green" /> NBR 5419
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nós - Reconstrução Premium */}
      <section id="sobre-nos" className="section-padding bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn direction="right">
              <div className="relative">
                {/* Main Image */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" 
                    alt="Engenheiro S2F em campo" 
                    className="w-full h-[450px] object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Floating Authority Badge */}
                <div className="absolute -top-8 -right-8 bg-brand-blue p-8 rounded-2xl shadow-2xl border border-slate-800 hidden md:block animate-float z-20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-brand-green rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-green/20">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <p className="text-3xl font-black text-white leading-none">100%</p>
                      <p className="text-[10px] font-bold text-brand-green uppercase tracking-[0.2em]">Conformidade</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="space-y-8">
                <div>
                  <h2 className="text-brand-green font-black tracking-widest uppercase text-xs mb-4">Nossa Trajetória</h2>
                  <h3 className="text-4xl md:text-5xl font-heading font-black text-brand-blue uppercase leading-tight tracking-tighter">
                    Solidez Técnica e <br /> Visão Estratégica
                  </h3>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  A S2F Engenharia nasceu com o propósito de elevar o padrão técnico da infraestrutura industrial brasileira. Combinamos rigor normativo com agilidade operacional para entregar soluções que não apenas resolvem problemas, mas geram valor real aos ativos de nossos clientes.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: <CheckCircle2 className="text-brand-green" />, title: "Rigor Normativo", desc: "Total aderência às NRs e NBRs vigentes." },
                    { icon: <CheckCircle2 className="text-brand-green" />, title: "Gestão de Riscos", desc: "Segurança operacional em primeiro lugar." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-black text-brand-blue text-sm uppercase">{item.title}</h4>
                        <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setIsHistoryModalOpen(true)}
                  className="btn-outline w-full sm:w-auto"
                >
                  Conheça Nossa História
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Especialidades - Grid Refactor */}
      <section id="servicos" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <FadeIn direction="right">
                <h2 className="text-brand-green font-black tracking-widest uppercase text-xs mb-4">Soluções Técnicas</h2>
                <h3 className="text-4xl md:text-5xl font-heading font-black text-brand-blue uppercase leading-none">
                  Nossas Especialidades
                </h3>
              </FadeIn>
            </div>
            <FadeIn direction="left">
              <p className="text-gray-500 text-lg font-medium max-w-md">
                Engenharia consultiva e execução técnica com foco em resultados mensuráveis e segurança jurídica.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(servicesData).map(([key, service], idx) => (
              <FadeIn key={key} delay={idx * 0.05} direction="up">
                <div 
                  onClick={() => setServiceModalData(service)}
                  className="bg-slate-50 p-8 rounded-2xl flex flex-col justify-between h-full border border-slate-100 hover:bg-brand-blue hover:border-brand-blue transition-all duration-500 cursor-pointer group relative overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="text-brand-blue group-hover:text-brand-green transition-all duration-300 mb-8">
                    {service.icon}
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-heading font-black text-brand-blue group-hover:text-white uppercase leading-tight tracking-tighter mb-4">
                      {service.titulo}
                    </h4>
                    <p className="text-slate-500 group-hover:text-slate-300 text-sm leading-relaxed mb-6">
                      {service.descricao}
                    </p>
                    <div className="flex items-center gap-2 text-brand-green font-black text-[10px] uppercase tracking-widest">
                      Saiba Mais <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Process - Methodology */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <FadeIn>
              <h2 className="text-brand-green font-black tracking-widest uppercase text-xs mb-4">Metodologia S2F</h2>
              <h3 className="text-4xl font-heading font-black text-brand-blue uppercase">Nosso Processo de Engenharia</h3>
              <div className="w-20 h-1.5 bg-brand-green mx-auto mt-6"></div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
            
            {[
              { step: "01", title: "Diagnóstico", desc: "Análise técnica detalhada e levantamento de requisitos em campo." },
              { step: "02", title: "Engenharia", desc: "Desenvolvimento do projeto executivo com foco em eficiência e normas." },
              { step: "03", title: "Execução", desc: "Implementação técnica com supervisão rigorosa e segurança total." },
              { step: "04", title: "Entrega", desc: "Comissionamento, testes finais e entrega técnica com documentação." }
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="none">
                <div className="relative z-10 bg-white text-center">
                  <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center font-black text-xl mx-auto mb-6 shadow-xl border-4 border-white">
                    {p.step}
                  </div>
                  <h4 className="text-xl font-black text-brand-blue mb-3 uppercase tracking-tighter">{p.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Social Proof */}
      <section className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <FadeIn>
              <h2 className="text-brand-green font-black tracking-widest uppercase text-xs mb-4">Depoimentos</h2>
              <h3 className="text-4xl font-heading font-black text-brand-blue uppercase">A Voz de Nossos Parceiros</h3>
              <div className="w-20 h-1.5 bg-brand-green mx-auto mt-6"></div>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "A S2F é nossa parceira estratégica em manutenção elétrica. O rigor técnico e a pontualidade nas paradas de fábrica são diferenciais que garantem nossa produtividade.",
                author: "Gerente de Manutenção",
                company: "Multinacional de Bebidas"
              },
              {
                quote: "Projetos executados com excelência. A adequação à NR-12 em nossa planta foi feita de forma impecável, unindo segurança e funcionalidade operacional.",
                author: "Diretor Industrial",
                company: "Setor de Logística"
              },
              {
                quote: "Consultoria técnica de alto nível. Conseguimos reduzir custos operacionais significativos após a implementação das melhorias sugeridas pela equipe da S2F.",
                author: "Engenheiro de Facilities",
                company: "Polo Industrial de Manaus"
              }
            ].map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 relative">
                  <div className="text-brand-green mb-6">
                    {[...Array(5)].map((_, star) => (
                      <span key={star} className="text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 italic mb-8 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-black text-brand-blue uppercase tracking-tighter">{t.author}</p>
                    <p className="text-brand-green font-bold text-xs uppercase tracking-widest">{t.company}</p>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-blue/5 rounded-full flex items-center justify-center text-brand-blue/20">
                    <MessageCircle size={24} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals - Logo Carousel */}
      <section id="portfolio" className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <FadeIn>
            <h2 className="text-gray-400 font-bold tracking-widest uppercase text-xs mb-4">Empresas que Confiam na S2F</h2>
          </FadeIn>
        </div>
        
        <div className="relative flex overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {[...Object.values(clientPortfolioData), ...Object.values(clientPortfolioData)].map((client, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center w-[250px] h-32 px-10 shrink-0 cursor-pointer"
                onClick={() => setClientModalData(client)}
              >
                <img 
                  src={client.logo} 
                  alt={client.nome} 
                  className="max-h-16 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contato - Conversion Engine */}
      <section id="contato" className="section-padding bg-brand-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue-dark rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <FadeIn direction="right">
              <div>
                <h2 className="text-brand-green font-black tracking-widest uppercase text-xs mb-4">Contato Direto</h2>
                <h3 className="text-4xl md:text-6xl font-heading font-black text-white uppercase leading-tight mb-8">
                  Vamos Viabilizar <br /> seu Próximo Projeto?
                </h3>
                <p className="text-white/70 text-lg mb-12 max-w-md leading-relaxed">
                  Nossa equipe técnica está pronta para diagnosticar suas necessidades e propor soluções de alta performance.
                </p>

                <div className="space-y-8">
                  {[
                    { icon: <MapPin size={24} />, label: "Localização", value: "Manaus, AM - Atendimento Nacional" },
                    { icon: <Phone size={24} />, label: "Telefone / WhatsApp", value: "(92) 98123-4567" },
                    { icon: <Mail size={24} />, label: "E-mail Corporativo", value: "comercial@s2fengenharia.com.br" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300 shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-white font-bold text-base md:text-lg">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="bg-white p-10 lg:p-12 rounded-3xl shadow-2xl">
                <form id="contact-form" className="space-y-6" onSubmit={handleContactSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-brand-blue uppercase tracking-widest ml-1">Nome Completo</label>
                      <input 
                        type="text" 
                        name="name"
                        placeholder="Ex: João Silva" 
                        className={`w-full bg-slate-50 border ${formErrors.name ? 'border-red-500' : 'border-transparent'} rounded-xl px-6 py-4 focus:ring-2 focus:ring-brand-green transition-all outline-none text-brand-blue font-medium`} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-brand-blue uppercase tracking-widest ml-1">E-mail Corporativo</label>
                      <input 
                        type="email" 
                        name="email"
                        value={emailValue}
                        onChange={handleEmailChange}
                        placeholder="joao@empresa.com" 
                        className={`w-full bg-slate-50 border ${formErrors.email ? 'border-red-500' : 'border-transparent'} rounded-xl px-6 py-4 focus:ring-2 focus:ring-brand-green transition-all outline-none text-brand-blue font-medium`} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-blue uppercase tracking-widest ml-1">Assunto</label>
                    <select name="subject" className="w-full bg-slate-50 border border-transparent rounded-xl px-6 py-4 focus:ring-2 focus:ring-brand-green transition-all outline-none text-brand-blue font-medium appearance-none">
                      <option>Projetos e Consultoria</option>
                      <option>Manutenção Industrial</option>
                      <option>Automação e Controle</option>
                      <option>Outros Assuntos</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-brand-blue uppercase tracking-widest ml-1">Mensagem</label>
                    <textarea 
                      name="message"
                      rows={4} 
                      placeholder="Descreva brevemente sua necessidade técnica..." 
                      className={`w-full bg-slate-50 border ${formErrors.message ? 'border-red-500' : 'border-transparent'} rounded-xl px-6 py-4 focus:ring-2 focus:ring-brand-green transition-all outline-none text-brand-blue font-medium resize-none`}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary w-full py-5 text-sm"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitação Técnica'}
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer Premium B2B */}
      <footer className="bg-brand-blue-dark text-white pt-24 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
            {/* Col 1: Brand */}
            <div className="space-y-8">
              <div className="flex flex-col items-start leading-none">
                <div className="flex items-center font-heading font-black text-4xl tracking-tighter">
                  <span className="text-white">S2</span>
                  <span className="text-brand-green">F</span>
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] mt-1 text-white/40 uppercase">Engenharia</span>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium">
                Elevando o padrão técnico da infraestrutura industrial com precisão, segurança e inovação constante.
              </p>
              <div className="flex gap-4">
                {[Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-brand-green transition-all duration-300 group">
                    <Icon size={18} className="text-slate-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Links Rápidos */}
            <div>
              <h4 className="text-brand-green font-black uppercase tracking-widest text-[10px] mb-8">Navegação</h4>
              <ul className="space-y-4">
                {['Home', 'Sobre nós', 'Serviços', 'Contato'].map((item) => (
                  <li key={item}>
                    <a 
                      href={`#${item.toLowerCase().replace(' ', '-').replace('ç', 'c').replace('ó', 'o')}`} 
                      className="text-slate-400 hover:text-brand-green transition-colors flex items-center gap-2 group text-sm font-bold"
                    >
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all text-brand-green" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contato */}
            <div>
              <h4 className="text-brand-green font-black uppercase tracking-widest text-[10px] mb-8">Contato</h4>
              <ul className="space-y-6">
                {[
                  { icon: <Phone size={16} />, text: "(92) 98123-4567" },
                  { icon: <Mail size={16} />, text: "comercial@s2fengenharia.com.br" },
                  { icon: <MapPin size={16} />, text: "Manaus, AM - Brasil" }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-400 text-sm font-medium">
                    <div className="mt-1 text-brand-green">{item.icon}</div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Newsletter/CTA */}
            <div>
              <h4 className="text-brand-green font-black uppercase tracking-widest text-[10px] mb-8">Newsletter</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">Receba atualizações técnicas e novidades do setor industrial.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Seu e-mail" className="bg-white/5 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green outline-none flex-1" />
                <button className="bg-brand-green p-3 rounded-xl hover:bg-brand-green-dark transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} S2F Engenharia. Todos os direitos reservados.
            </p>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
              Desenvolvido por <span className="text-white">Roberth Santos</span>
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a 
        href="https://wa.me/5592991969040?text=Olá,%20estou%20com%20uma%20dúvida%20ou%20emergência%20técnica." 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-[20px] right-[20px] z-[999] w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-[#25D366] text-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 flex items-center justify-center group"
        aria-label="Emergências ou Dúvidas Rápidas"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
        <img 
          src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/whatsapp.svg" 
          alt="Chame no WhatsApp" 
          className="w-6 h-6 md:w-8 md:h-8 filter invert relative z-10" 
        />
      </a>

      {/* Modal de Serviços */}
      {modalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" 
            onClick={() => setModalData(null)}
          ></motion.div>
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-[95%] sm:w-full p-6 sm:p-8 relative z-10 max-h-[90vh] overflow-y-auto modal-enter"
          >
            <button 
              onClick={() => setModalData(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-2 cursor-pointer"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-brand-blue mb-3 sm:mb-4 pr-8">{modalData.title}</h3>
            <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{modalData.text}</p>
            <div className="mt-6 sm:mt-8">
              <button 
                onClick={() => setModalData(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de Serviços (Vitrine Técnica) */}
      {serviceModalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" 
            onClick={() => setServiceModalData(null)}
          ></motion.div>
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-[95%] sm:w-full relative z-10 max-h-[90vh] overflow-hidden flex flex-col modal-enter"
          >
            <button 
              onClick={() => setServiceModalData(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-200 transition-colors bg-black/30 hover:bg-black/50 rounded-full p-2 cursor-pointer z-20 backdrop-blur-sm"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            
            {/* Header Area */}
            <div className="w-full bg-brand-blue p-8 sm:p-12 relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -skew-x-12 translate-x-16 -translate-y-16"></div>
              <h3 className="text-3xl sm:text-4xl font-heading font-black text-white relative z-10 uppercase tracking-tighter leading-none">
                {serviceModalData.titulo}
              </h3>
            </div>

            {/* Content Area */}
            <div className="p-8 sm:p-12 overflow-y-auto flex-1">
              <p className="text-gray-600 leading-relaxed text-lg sm:text-xl mb-10 font-medium">
                {serviceModalData.descricao}
              </p>
              
              <h4 className="font-black text-brand-blue uppercase tracking-widest text-xs mb-6">Escopo de Atendimento:</h4>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {serviceModalData.detalhes.map((detalhe, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 font-bold text-sm">
                    <CheckCircle2 size={18} className="text-brand-green shrink-0 mt-0.5" />
                    <span>{detalhe}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-gray-100">
                <button 
                  onClick={() => setServiceModalData(null)}
                  className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de Clientes */}
      {clientModalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" 
            onClick={() => setClientModalData(null)}
          ></motion.div>
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-[95%] sm:w-full p-6 sm:p-8 relative z-10 max-h-[90vh] overflow-y-auto modal-enter"
          >
            <button 
              onClick={() => setClientModalData(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-800 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-2 cursor-pointer"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0A3D73] mb-2 pr-8">{clientModalData.nome}</h3>
            <p className="modal-subtitle">Principais soluções e serviços de engenharia executados pela S2F para este parceiro:</p>
            <ul className="space-y-4">
              {clientModalData.servicos.map((servico, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                  <CheckCircle2 size={20} className="text-[#28A745] shrink-0 mt-0.5" />
                  <span>{servico}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button 
                onClick={() => setClientModalData(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Modal de História */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" 
            onClick={() => setIsHistoryModalOpen(false)}
          ></motion.div>
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 max-w-3xl w-full relative z-10 max-h-[90vh] overflow-y-auto modal-enter"
          >
            <button 
              onClick={() => setIsHistoryModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-brand-blue transition-colors bg-gray-100 hover:bg-gray-200 rounded-full p-2 cursor-pointer"
              aria-label="Fechar"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-3xl lg:text-4xl font-heading font-black text-brand-blue mb-8 uppercase tracking-tighter">
              A Nossa Trajetória
            </h3>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                A S2F Engenharia nasceu da união de especialistas apaixonados por resolver problemas complexos no chão de fábrica. Em nossos primeiros anos, focamos em pequenas adequações elétricas, mas a precisão das nossas entregas rapidamente nos levou a projetos de grande porte.
              </p>
              <p>
                Nosso DNA sempre foi a busca implacável pela eficiência operacional e o rigor absoluto com as normas de segurança. Percebemos que a indústria não precisava apenas de executores, mas de parceiros estratégicos que entendessem o impacto do tempo de inatividade.
              </p>
              <p>
                Hoje, temos o orgulho de ser a espinha dorsal da manutenção e infraestrutura de grandes operações, garantindo que a produção dos nossos clientes nunca pare, com máxima segurança e inovação constante.
              </p>
            </div>
            
            <div className="mt-10 pt-8 border-t border-slate-100">
              <button 
                onClick={() => setIsHistoryModalOpen(false)}
                className="bg-brand-blue hover:bg-brand-blue-dark text-white px-8 py-4 rounded-none font-black text-sm uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
