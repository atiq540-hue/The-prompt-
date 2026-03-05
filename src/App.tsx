import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueStack } from './components/ValueStack';
import { Problem } from './components/Problem';
import { PromiseSection } from './components/PromiseSection';
import { HowItWorks } from './components/HowItWorks';
import { Benefits } from './components/Benefits';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Scarcity } from './components/Scarcity';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { AIDemo } from './components/AIDemo';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-sky-500/30">
      <Navbar />
      <Hero />
      <ValueStack />
      <Problem />
      <PromiseSection />
      <AIDemo />
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="benefits">
        <Benefits />
      </div>
      <div id="portfolio">
        <Portfolio />
      </div>
      <Testimonials />
      <div id="faq">
        <FAQ />
      </div>
      <Scarcity />
      <FinalCTA />
      <Footer />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-sky-500 text-white rounded-2xl shadow-2xl shadow-sky-500/40 hover:bg-sky-400 transition-all active:scale-90"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
