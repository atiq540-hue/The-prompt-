import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageSquare } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.process'), href: '#how-it-works' },
    { name: t('nav.benefits'), href: '#benefits' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.faq'), href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Small delay to ensure the menu closing doesn't interfere with scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/5 py-4' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-black text-white tracking-tighter flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:rotate-12 transition-transform duration-500">
            <span className="text-white text-sm font-black">PA</span>
          </div>
          <span className="hidden sm:inline uppercase">{t('nav.logo').split(' ')[0]} <span className="text-sky-400">{t('nav.logo').split(' ').slice(1).join(' ')}</span></span>
        </motion.div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <motion.a 
              key={link.name} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-black text-slate-400 hover:text-sky-400 transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </motion.a>
          ))}
          
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/923278651402" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-8 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-sky-500/20 flex items-center gap-3"
          >
            <MessageSquare className="w-4 h-4" />
            {t('nav.chatNow')}
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleLanguage}
            className="text-[10px] font-black px-3 py-2 rounded-xl border border-white/10 text-slate-400 uppercase tracking-widest"
          >
            {language === 'en' ? 'اردو' : 'English'}
          </button>
          <button 
            className="text-white p-2 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="container mx-auto px-6 py-12 flex flex-col gap-8">
              {navLinks.map((link, index) => (
                <motion.a 
                  key={link.name} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl font-black text-white hover:text-sky-400 transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                href="https://wa.me/923278651402" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full py-5 bg-sky-500 text-white rounded-[24px] text-center font-black text-lg shadow-xl shadow-sky-500/20 uppercase tracking-widest"
              >
                {t('nav.chatWithArchitect')}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
