import React from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const Scarcity = () => {
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-16 md:py-24 bg-sky-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/5 animate-pulse pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`flex flex-col md:flex-row items-center justify-center gap-8 text-white text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}
        >
          <div className="p-4 bg-white/20 rounded-[24px] shadow-xl backdrop-blur-sm">
            <Calendar className="w-10 h-10" />
          </div>
          <div className={isRTL ? 'md:order-1' : ''}>
            <div className="text-2xl md:text-3xl font-black mb-2 tracking-tight">{t('scarcity.title')}</div>
            <p className="text-sky-100 text-lg font-light">{t('scarcity.subtitle')}</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`md:ml-12 ${isRTL ? 'md:mr-12 md:ml-0' : ''}`}
          >
            <div className="px-6 py-3 bg-sky-900/40 backdrop-blur-md text-white rounded-2xl text-sm font-black uppercase tracking-widest border border-sky-300/30 shadow-2xl">
              {t('scarcity.next')}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
