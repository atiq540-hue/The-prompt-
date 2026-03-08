import React from 'react';

import { useLanguage } from '../contexts/LanguageContext';

export const Footer = () => {
  const { t, isRTL } = useLanguage();
  return (
    <footer className="py-20 bg-slate-800 border-t border-slate-700 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col md:flex-row justify-between items-center gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <div className={`max-w-xs text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
            <div className="text-2xl font-black text-white mb-2 tracking-tighter">THE PROMPT ARCHITECT</div>
            <p className="text-slate-500 text-sm font-light leading-relaxed">{t('footer.tagline')}</p>
          </div>

          <div className={`flex flex-wrap justify-center gap-8 text-sm font-black text-slate-400 uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a href="#" className="hover:text-sky-400 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-sky-400 transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-sky-400 transition-colors">{t('footer.contact')}</a>
            <a href="https://wa.me/923278651402" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">{t('footer.whatsapp')}</a>
          </div>

          <div className="text-slate-600 text-xs font-light">
            © {new Date().getFullYear()} The Prompt Architect. {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};
