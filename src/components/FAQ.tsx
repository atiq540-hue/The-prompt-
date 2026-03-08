import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const FAQ = () => {
  const { t, isRTL } = useLanguage();
  const faqs = [
    {
      q: t('faq.items.0.q'),
      a: t('faq.items.0.a')
    },
    {
      q: t('faq.items.1.q'),
      a: t('faq.items.1.a')
    },
    {
      q: t('faq.items.2.q'),
      a: t('faq.items.2.a')
    },
    {
      q: t('faq.items.3.q'),
      a: t('faq.items.3.a')
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-slate-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight"
          >
            {t('faq.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg font-light"
          >
            {t('faq.subtitle')}
          </motion.p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-[32px] border transition-all duration-500 overflow-hidden ${
                openIndex === index 
                  ? 'bg-slate-700 border-sky-500/30 shadow-2xl shadow-sky-500/5' 
                  : 'bg-slate-700/40 border-white/5 hover:border-slate-500'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full px-6 py-6 md:px-8 md:py-8 flex items-center justify-between group ${isRTL ? 'text-right flex-row-reverse' : 'text-left'}`}
              >
                <span className={`text-lg md:text-xl font-bold transition-colors ${
                  openIndex === index ? 'text-sky-400' : 'text-white group-hover:text-sky-400'
                }`}>
                  {faq.q}
                </span>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  openIndex === index ? 'bg-sky-500 text-white rotate-0' : 'bg-slate-800 text-slate-400 rotate-90 group-hover:bg-slate-700'
                }`}>
                  {openIndex === index ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-8 md:px-8 md:pb-10">
                      <div className="h-[1px] w-full bg-slate-600/30 mb-6" />
                      <p className={`text-slate-300 leading-relaxed text-lg font-light ${isRTL ? 'text-right' : 'text-left'}`}>{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
