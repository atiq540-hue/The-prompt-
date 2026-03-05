import React from 'react';
import { motion } from 'motion/react';

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Chat with the Architect",
      description: "Chat with me on WhatsApp to discuss your goals and vision."
    },
    {
      number: "02",
      title: "The Plan",
      description: "I craft your prompt-driven site plan & wireframe."
    },
    {
      number: "03",
      title: "Refine",
      description: "Review, refine, then we move to launch."
    },
    {
      number: "04",
      title: "Launch",
      description: "I hand over the site + quick launch guide."
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">How it works</h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">Typical turnaround: <span className="text-white font-bold">3–10 days</span> depending on scope.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="text-5xl md:text-7xl font-black text-slate-800/50 mb-6 group-hover:text-sky-500/20 transition-colors duration-500">{step.number}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-6 w-12 h-[1px] bg-slate-800" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
