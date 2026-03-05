import React from 'react';
import { Rocket, Target, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export const ValueStack = () => {
  const items = [
    {
      icon: <Rocket className="w-6 h-6 text-sky-500" />,
      text: "Fast launches — live in days, not weeks."
    },
    {
      icon: <Target className="w-6 h-6 text-sky-500" />,
      text: "Conversion-first pages — made to turn visitors into clients."
    },
    {
      icon: <Wallet className="w-6 h-6 text-sky-500" />,
      text: "Budget-friendly — professional sites without agency prices."
    }
  ];

  return (
    <div className="bg-[#0f172a] border-y border-slate-800 py-10 md:py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-5 justify-center md:justify-start group"
            >
              <div className="p-3 bg-slate-800 rounded-2xl group-hover:bg-sky-500/10 transition-colors duration-300">
                {item.icon}
              </div>
              <span className="text-slate-300 font-bold text-lg md:text-base lg:text-lg leading-tight">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
