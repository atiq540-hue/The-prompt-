import React from 'react';
import { motion } from 'motion/react';
import { Send, Phone } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const FinalCTA = () => {
  const { t, isRTL } = useLanguage();
  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">{t('finalCTA.title')}</h2>
            <p className="text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed font-light">
              {t('finalCTA.subtitle')} <span className="text-white font-bold italic">{t('finalCTA.subtitleAccent')}</span>
            </p>
            
            <div className="space-y-6">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/923278651402?text=Hi! I'm interested in starting a project with The Prompt Architect."
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-10 py-5 bg-sky-500 hover:bg-sky-400 text-white rounded-[24px] font-black text-xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-sky-500/20 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Phone className="w-6 h-6" />
                {t('finalCTA.chatBtn')}
              </motion.a>
              <div className={`text-slate-500 text-sm font-medium flex items-center justify-center gap-2 ${isRTL ? 'lg:justify-end' : 'lg:justify-start'}`}>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                {t('finalCTA.response')}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 sm:p-12 rounded-[48px] bg-slate-700/50 backdrop-blur-xl border border-white/5 shadow-2xl relative"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className={`text-2xl md:text-3xl font-black text-white mb-8 tracking-tight ${isRTL ? 'text-right' : 'text-left'}`}>{t('finalCTA.formTitle')}</h3>
            <form 
              className="space-y-6" 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const business = formData.get('business');
                const goal = formData.get('goal');
                const message = `Hi! I'm ${name} from ${business}. My goal is: ${goal}`;
                window.open(`https://wa.me/923278651402?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              <div className="space-y-2">
                <label className={`block text-slate-400 text-xs font-black uppercase tracking-[0.2em] ml-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('finalCTA.labels.name')}</label>
                <input name="name" type="text" required className={`w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-sky-500 transition-all text-base font-light ${isRTL ? 'text-right' : 'text-left'}`} placeholder={t('finalCTA.placeholders.name')} />
              </div>
              <div className="space-y-2">
                <label className={`block text-slate-400 text-xs font-black uppercase tracking-[0.2em] ml-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('finalCTA.labels.business')}</label>
                <input name="business" type="text" required className={`w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-sky-500 transition-all text-base font-light ${isRTL ? 'text-right' : 'text-left'}`} placeholder={t('finalCTA.placeholders.business')} />
              </div>
              <div className="space-y-2">
                <label className={`block text-slate-400 text-xs font-black uppercase tracking-[0.2em] ml-1 ${isRTL ? 'text-right' : 'text-left'}`}>{t('finalCTA.labels.goal')}</label>
                <textarea name="goal" required className={`w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-sky-500 transition-all h-32 resize-none text-base font-light ${isRTL ? 'text-right' : 'text-left'}`} placeholder={t('finalCTA.placeholders.goal')}></textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className={`w-full py-5 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl shadow-sky-500/20 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t('finalCTA.submit')}
                <Send className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
