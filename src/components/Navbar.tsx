import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageSquare, Palette } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { themeColor, setThemeColor } = useTheme();
  const [showThemePicker, setShowThemePicker] = useState(false);
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

  const themeOptions: { id: any, color: string }[] = [
    { id: 'sky', color: '#0ea5e9' },
    { id: 'emerald', color: '#10b981' },
    { id: 'rose', color: '#f43f5e' },
    { id: 'amber', color: '#f59e0b' },
    { id: 'violet', color: '#8b5cf6' }
  ];

  const theme = (() => {
    switch(themeColor) {
      case 'emerald': return { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-400', shadow: 'shadow-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/10' };
      case 'rose': return { bg: 'bg-rose-500', hover: 'hover:bg-rose-400', shadow: 'shadow-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/10' };
      case 'amber': return { bg: 'bg-amber-500', hover: 'hover:bg-amber-400', shadow: 'shadow-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/10' };
      case 'violet': return { bg: 'bg-violet-500', hover: 'hover:bg-violet-400', shadow: 'shadow-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/10' };
      default: return { bg: 'bg-sky-500', hover: 'hover:bg-sky-400', shadow: 'shadow-sky-500/20', text: 'text-sky-400', border: 'border-sky-500/10' };
    }
  })();

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
          <div className={`w-10 h-10 ${theme.bg} rounded-2xl flex items-center justify-center shadow-lg ${theme.shadow} group-hover:rotate-12 transition-transform duration-500`}>
            <span className="text-white text-sm font-black">PA</span>
          </div>
          <span className="hidden sm:inline uppercase">{t('nav.logo').split(' ')[0]} <span className={theme.text}>{t('nav.logo').split(' ').slice(1).join(' ')}</span></span>
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
          
          <div className="relative">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowThemePicker(!showThemePicker)}
              className={`p-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all ${showThemePicker ? theme.text : 'text-slate-400'}`}
            >
              <Palette className="w-4 h-4" />
            </motion.button>
            
            <AnimatePresence>
              {showThemePicker && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-4 p-3 bg-slate-800 border border-white/10 rounded-2xl shadow-2xl flex gap-2"
                >
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setThemeColor(opt.id);
                        setShowThemePicker(false);
                      }}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${themeColor === opt.id ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                      style={{ backgroundColor: opt.color }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={toggleLanguage}
            className="text-[10px] font-black px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-slate-400 uppercase tracking-widest"
          >
            {language === 'en' ? 'اردو' : 'English'}
          </motion.button>

          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/923278651402" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`px-8 py-3 ${theme.bg} ${theme.hover} text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl ${theme.shadow} flex items-center gap-3`}
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
                  className={`text-2xl font-black text-white hover:${theme.text} transition-colors uppercase tracking-tighter`}
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('nav.chooseTheme') || 'Choose Theme'}</p>
                <div className="flex gap-4">
                  {themeOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setThemeColor(opt.id)}
                      className={`w-10 h-10 rounded-2xl border-2 transition-all ${themeColor === opt.id ? 'border-white scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: opt.color }}
                    />
                  ))}
                </div>
              </div>

              <motion.a 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                href="https://wa.me/923278651402" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`w-full py-5 ${theme.bg} text-white rounded-[24px] text-center font-black text-lg shadow-xl ${theme.shadow} uppercase tracking-widest`}
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
