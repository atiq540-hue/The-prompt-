import React from 'react';
import { motion } from 'motion/react';
import { Heart, Zap, Shield, Smartphone, Search, Settings } from 'lucide-react';

export const Benefits = () => {
  const emotional = [
    { icon: <Heart className="w-6 h-6" />, title: "More time back", desc: "Focus on running your business while your site works for you." },
    { icon: <Zap className="w-6 h-6" />, title: "High conversion", desc: "A site that actually turns visitors into paying clients." },
    { icon: <Shield className="w-6 h-6" />, title: "Earn trust", desc: "A professional presence that builds immediate credibility." }
  ];

  const functional = [
    { icon: <Smartphone className="w-6 h-6" />, title: "Mobile-first", desc: "Perfectly optimized for every screen size." },
    { icon: <Search className="w-6 h-6" />, title: "SEO-ready", desc: "Fast load times and basic SEO installed out of the box." },
    { icon: <Settings className="w-6 h-6" />, title: "Low maintenance", desc: "Simple instructions included for easy updates." }
  ];

  return (
    <section className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 max-w-6xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-white mb-12">Built for your success</h2>
            <div className="space-y-10">
              {emotional.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-12">Technical excellence</h2>
            <div className="space-y-10">
              {functional.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
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
