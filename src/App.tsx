import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { About } from './components/sections/About';
import { Authority } from './components/sections/Authority';
import { Contact } from './components/sections/Contact';
import { Faq } from './components/sections/Faq';
import { Hero } from './components/sections/Hero';
import { Methodology } from './components/sections/Methodology';
import { Projects } from './components/sections/Projects';
import { Services } from './components/sections/Services';
import { Stats } from './components/sections/Stats';
import { contactDetails, siteSchema } from './data/content';

export default function App() {
  return (
    <div className="overflow-x-clip bg-transparent text-brand-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }} />

      <Header />

      <main>
        <Hero />
        <Stats />
        <Authority />
        <Services />
        <About />
        <Projects />
        <Methodology />
        <Faq />
        <Contact />
      </main>

      <Footer />

      <a
        href={contactDetails.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-white shadow-[0_18px_42px_rgba(21,161,154,0.38)] transition duration-300 hover:-translate-y-1 hover:bg-brand-accent-strong md:bottom-6 md:right-6"
        aria-label="Falar com a S2F pelo WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-line bg-white/96 px-4 py-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <a href={contactDetails.phoneHref} className="secondary-button flex-1 px-4 py-3 text-sm">
            <Phone size={16} />
            Ligar
          </a>
          <a href="#contato" className="primary-button flex-1 px-4 py-3 text-sm">
            Solicitar orçamento
          </a>
        </div>
      </div>
    </div>
  );
}
