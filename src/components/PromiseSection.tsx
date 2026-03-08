import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const PromiseSection = () => {
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-24 md:py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-sky-500 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-black uppercase tracking-[0.2em] mb-10 mx-auto lg:mx-0"
            >
              <Sparkles className="w-4 h-4" />
              {t('promise.badge')}
            </motion.div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-10 leading-[1] tracking-tighter">
              {isRTL ? (
                <>
                  <span className="text-sky-400">{t('promise.titleAccent')}</span> {t('promise.title')}
                </>
              ) : (
                <>
                  {t('promise.title')} <span className="text-sky-400">{t('promise.titleAccent')}</span> {t('promise.titleEnd')}
                </>
              )}
            </h2>
            <div className={`space-y-8 max-w-xl mx-auto ${isRTL ? 'lg:mr-0' : 'lg:ml-0'}`}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className={`p-10 bg-slate-800/30 backdrop-blur-xl rounded-[40px] border border-white/5 group hover:border-sky-500/30 transition-all duration-700 shadow-2xl ${isRTL ? 'text-right' : 'text-left'}`}
              >
                <h3 className={`text-2xl font-black text-white mb-4 flex items-center gap-3 tracking-tight ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-3 h-3 bg-sky-500 rounded-full animate-pulse shadow-lg shadow-sky-500/50" />
                  {t('promise.methodTitle')}
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed font-light">
                  {t('promise.methodDesc')}
                </p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-sky-500/20 blur-[120px] rounded-full animate-pulse" />
            <div className="aspect-video bg-slate-800 rounded-[48px] border border-white/10 shadow-[0_0_100px_rgba(14,165,233,0.1)] overflow-hidden group relative">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                preload="metadata"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                poster="https://picsum.photos/seed/tech-vid/800/450"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-blue-mesh-10531-preview.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent pointer-events-none" />
              
              {/* Decorative elements */}
              <div className={`absolute top-8 flex gap-2 ${isRTL ? 'right-8' : 'left-8'}`}>
                <div className="w-3 h-3 rounded-full bg-red-500/30" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                <div className="w-3 h-3 rounded-full bg-green-500/30" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center shadow-2xl shadow-sky-500/50 transform scale-0 group-hover:scale-100 transition-transform duration-700 delay-100">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
