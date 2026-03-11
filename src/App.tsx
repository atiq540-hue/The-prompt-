import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
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
import { ChatBot } from './components/ChatBot';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

function AppContent() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
    <div className="min-h-screen bg-slate-900 text-slate-50 selection:bg-sky-500/30 overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 to-emerald-500 z-[100] origin-left shadow-[0_0_10px_rgba(14,165,233,0.5)]"
        style={{ scaleX }}
      />
      
      <Navbar />
      <main>
        <Hero />
        <ValueStack />
        <Problem />
        <PromiseSection />
        <AIDemo />
        <HowItWorks />
        <Benefits />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <Scarcity />
        <FinalCTA />
      </main>
      <Footer />
      <ChatBot />

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-5 bg-sky-500 text-white rounded-[24px] shadow-2xl shadow-sky-500/40 hover:bg-sky-400 transition-all"
          >
            <ArrowUp className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
