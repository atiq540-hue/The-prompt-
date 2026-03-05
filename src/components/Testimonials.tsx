import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Yoga Studio Owner",
      content: "The Prompt Architect delivered my site in 4 days. I've already seen a huge jump in class bookings."
    },
    {
      name: "Mark Thompson",
      role: "Plumbing Services",
      content: "Finally, a website that actually works on mobile. Mark made the whole process stress-free."
    },
    {
      name: "Elena Rodriguez",
      role: "Business Coach",
      content: "Solo founder — fast replies, guided me through everything. The strategy call alone was worth it."
    }
  ];

  return (
    <section className="py-24 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-slate-700 border border-slate-600 relative"
            >
              <Quote className="w-10 h-10 text-sky-500/20 absolute top-6 right-8" />
              <p className="text-slate-300 mb-8 italic leading-relaxed">"{t.content}"</p>
              <div>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-slate-500 text-sm">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
