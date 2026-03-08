import React from 'react';
import { motion } from 'motion/react';

import { useLanguage } from '../contexts/LanguageContext';

export const Problem = () => {
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.05),transparent_70%)] pointer-events-none" />
      
      <div className={`container mx-auto px-6 max-w-4xl relative z-10 ${isRTL ? 'text-right' : 'text-left'}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <motion.h2 
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight"
          >
            {t('problem.title')}
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className={`h-1.5 bg-sky-500 rounded-full ${isRTL ? 'ml-auto' : ''}`} 
          />

          <div className="space-y-8 text-xl md:text-3xl text-slate-400 leading-relaxed font-light">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {t('problem.body')}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-white font-black italic bg-white/5 px-6 py-4 rounded-2xl border-l-4 border-sky-500 inline-block"
            >
              {t('problem.accent')}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
