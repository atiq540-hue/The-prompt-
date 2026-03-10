import React from 'react';
import { Rocket, Target, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

import { useLanguage } from '../contexts/LanguageContext';

export const ValueStack = () => {
  const { t, isRTL } = useLanguage();
  const items = [
    {
      icon: Rocket,
      text: t('valueStack.items.0')
    },
    {
      icon: Target,
      text: t('valueStack.items.1')
    },
    {
      icon: Wallet,
      text: t('valueStack.items.2')
    }
  ];

  return (
    <div className="bg-slate-900 border-y border-white/5 py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className={`flex items-center gap-6 justify-center md:justify-start group ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-16 h-16 flex-shrink-0 bg-slate-800 rounded-[24px] flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl">
                <div className="group-hover:text-white transition-colors duration-500">
                  <item.icon className="w-8 h-8" />
                </div>
              </div>
              <span className={`text-slate-400 font-black text-xl md:text-lg lg:text-xl leading-tight group-hover:text-white transition-all duration-500 tracking-tight ${isRTL ? 'text-right' : 'text-left'}`}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
