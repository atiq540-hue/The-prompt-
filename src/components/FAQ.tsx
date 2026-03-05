import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

export const FAQ = () => {
  const faqs = [
    {
      q: "How fast can you launch?",
      a: "Most projects go live in 3–7 days. Larger authority sites might take up to 10 days."
    },
    {
      q: "Do you do content/copywriting?",
      a: "Yes! I use AI to draft high-converting copy which I then refine for your specific brand voice."
    },
    {
      q: "Will I be able to edit my site later?",
      a: "Absolutely. I build on user-friendly platforms and provide a quick guide for basic edits."
    },
    {
      q: "How do revisions work?",
      a: "All plans include one major round of revisions. I ensure you're 100% happy before we hit launch."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-32 bg-slate-800">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Common Questions</h2>
          <p className="text-slate-400 text-lg">Everything you need to know about the process.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`rounded-3xl border transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-slate-700 border-sky-500/30' 
                  : 'bg-slate-700/40 border-slate-600 hover:border-slate-500'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-6 md:px-8 md:py-8 flex items-center justify-between text-left group"
              >
                <span className={`text-lg md:text-xl font-bold transition-colors ${
                  openIndex === index ? 'text-sky-400' : 'text-white'
                }`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index ? 'bg-sky-500 text-white rotate-0' : 'bg-slate-800 text-slate-400 rotate-90'
                }`}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 md:px-8 md:pb-10">
                      <div className="h-[1px] w-full bg-slate-800 mb-6" />
                      <p className="text-slate-400 leading-relaxed text-lg">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
