import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const Testimonials = () => {
  const { t, isRTL } = useLanguage();
  const testimonials = [
    {
      name: t('testimonials.0.name'),
      role: t('testimonials.0.role'),
      content: t('testimonials.0.content')
    },
    {
      name: t('testimonials.1.name'),
      role: t('testimonials.1.role'),
      content: t('testimonials.1.content')
    },
    {
      name: t('testimonials.2.name'),
      role: t('testimonials.2.role'),
      content: t('testimonials.2.content')
    }
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`p-8 rounded-[40px] bg-slate-700/50 backdrop-blur-sm border border-white/5 hover:border-sky-500/30 transition-all duration-500 group relative ${isRTL ? 'text-right' : 'text-left'}`}
            >
              <Quote className={`w-12 h-12 text-sky-500/20 absolute top-6 group-hover:text-sky-500/40 transition-colors duration-500 ${isRTL ? 'left-8' : 'right-8'} rotate-180`} />
              <p className="text-slate-300 mb-8 italic leading-relaxed font-light relative z-10">"{t.content}"</p>
              <div className="relative z-10">
                <div className="font-bold text-white group-hover:text-sky-400 transition-colors">{t.name}</div>
                <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
