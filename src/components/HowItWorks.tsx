import React from 'react';
import { motion } from 'motion/react';

import { useLanguage } from '../contexts/LanguageContext';

export const HowItWorks = () => {
  const { t, isRTL } = useLanguage();
  const steps = [
    {
      number: "01",
      title: t('howItWorks.steps.0.title'),
      description: t('howItWorks.steps.0.desc')
    },
    {
      number: "02",
      title: t('howItWorks.steps.1.title'),
      description: t('howItWorks.steps.1.desc')
    },
    {
      number: "03",
      title: t('howItWorks.steps.2.title'),
      description: t('howItWorks.steps.2.desc')
    },
    {
      number: "04",
      title: t('howItWorks.steps.3.title'),
      description: t('howItWorks.steps.3.desc')
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-slate-800 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">{t('howItWorks.title')}</h2>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
              {t('howItWorks.turnaround')}
              <span className="text-sky-400 font-black"> {t('howItWorks.turnaroundTime')} </span>
              {t('howItWorks.turnaroundEnd')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`relative group ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <div className={`text-7xl md:text-9xl font-black text-slate-900/40 mb-8 group-hover:text-sky-500/10 transition-all duration-700 group-hover:-translate-y-4 select-none ${isRTL ? 'text-right' : 'text-left'}`}>
                {step.number}
              </div>
              <div className="relative z-10 -mt-12 md:-mt-16">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-sky-400 transition-all duration-500 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed font-light group-hover:text-slate-300 transition-colors duration-500">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                  className={`hidden lg:block absolute top-1/2 h-[1px] bg-gradient-to-r from-sky-500/50 to-transparent pointer-events-none ${isRTL ? 'right-full mr-8' : 'left-full ml-8'}`} 
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
