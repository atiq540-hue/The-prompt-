import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const PromiseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-bold mb-8 mx-auto lg:mx-0">
              <Sparkles className="w-4 h-4" />
              The Big Promise
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Get a professional, lead-ready website from <span className="text-sky-400">The Prompt Architect</span> that starts bringing in clients.
            </h2>
            <div className="space-y-6 max-w-xl mx-auto lg:mx-0">
              <div className="p-8 bg-slate-800/40 backdrop-blur-sm rounded-[32px] border border-slate-700/50 text-left">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
                  The Prompt Architecture Method
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  AI handles the heavy lifting and speed, while I handle the strategy, conversion psychology, and vet every single result for real sales power.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video bg-slate-800 rounded-[32px] border border-slate-700 shadow-2xl overflow-hidden group relative">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                preload="metadata"
                className="w-full h-full object-cover opacity-80"
                poster="https://picsum.photos/seed/tech-vid/800/450"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-blue-mesh-10531-preview.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Decorative elements */}
              <div className="absolute top-6 left-6 flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
