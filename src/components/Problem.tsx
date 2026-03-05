import React from 'react';
import { motion } from 'motion/react';

export const Problem = () => {
  return (
    <section className="py-24 bg-[#020617]">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Tired of expensive agencies or DIY sites that don’t convert?
          </h2>
          
          <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
            <p>
              You need a website that brings clients — not another design experiment. Most small businesses get stuck between overpaying for bloated agency services or struggling with DIY tools that look "okay" but fail to sell.
            </p>
            <p className="text-sky-400 font-medium">
              You want clear messaging, fast delivery, and a simple process.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
