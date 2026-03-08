import React from 'react';
import { motion } from 'motion/react';
import { Heart, Zap, Shield, Smartphone, Rocket, Settings, TrendingUp } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const Benefits = () => {
  const { t, isRTL } = useLanguage();
  const emotional = [
    { icon: <Heart className="w-6 h-6" />, title: t('benefits.emotional.0.title'), desc: t('benefits.emotional.0.desc') },
    { icon: <TrendingUp className="w-6 h-6" />, title: t('benefits.emotional.1.title'), desc: t('benefits.emotional.1.desc') },
    { icon: <Shield className="w-6 h-6" />, title: t('benefits.emotional.2.title'), desc: t('benefits.emotional.2.desc') }
  ];

  const functional = [
    { icon: <Smartphone className="w-6 h-6" />, title: t('benefits.functional.0.title'), desc: t('benefits.functional.0.desc') },
    { icon: <Rocket className="w-6 h-6" />, title: t('benefits.functional.1.title'), desc: t('benefits.functional.1.desc') },
    { icon: <Settings className="w-6 h-6" />, title: t('benefits.functional.2.title'), desc: t('benefits.functional.2.desc') }
  ];

  return (
    <section id="benefits" className="py-24 md:py-32 bg-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-white mb-12 tracking-tight"
            >
              {t('benefits.successTitle')}
            </motion.h2>
            <div className="space-y-10">
              {emotional.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={`flex gap-6 group ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {item.icon}
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className={isRTL ? 'text-right' : 'text-left'}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-white mb-12 tracking-tight"
            >
              {t('benefits.techTitle')}
            </motion.h2>
            <div className="space-y-10">
              {functional.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className={`flex gap-6 group ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    {item.icon}
                  </div>
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
