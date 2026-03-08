import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const Portfolio = () => {
  const { t, isRTL } = useLanguage();
  const projects = [
    {
      title: t('portfolio.projects.0.title'),
      result: t('portfolio.projects.0.result'),
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600&h=400",
      category: t('portfolio.projects.0.category')
    },
    {
      title: t('portfolio.projects.1.title'),
      result: t('portfolio.projects.1.result'),
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600&h=400",
      category: t('portfolio.projects.1.category')
    },
    {
      title: t('portfolio.projects.2.title'),
      result: t('portfolio.projects.2.result'),
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600&h=400",
      category: t('portfolio.projects.2.category')
    }
  ];

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-slate-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`flex flex-col lg:flex-row justify-between items-center lg:items-end mb-20 gap-8 text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">{t('portfolio.title')}</h2>
            <p className="text-lg md:text-xl text-slate-200 font-light">{t('portfolio.subtitle')}</p>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 border border-slate-700 shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t('portfolio.cta')}
            <ExternalLink className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group"
            >
              <div className="aspect-[4/3] rounded-[40px] overflow-hidden mb-8 border border-white/5 shadow-2xl relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className={`space-y-4 px-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                <div className={`text-sky-400 text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-8 h-[1px] bg-sky-500" />
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">{project.title}</h3>
                <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  {project.result}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
