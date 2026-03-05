import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export const Portfolio = () => {
  const projects = [
    {
      title: "Modern Dental Clinic",
      result: "+30% leads in first month",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600&h=400",
      category: "Healthcare"
    },
    {
      title: "Eco-Friendly Coffee",
      result: "40% increase in online orders",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600&h=400",
      category: "E-commerce"
    },
    {
      title: "Legal Consulting Firm",
      result: "2x faster page load speed",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600&h=400",
      category: "Professional Services"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-slate-700">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-20 gap-8 text-center lg:text-left">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Real results for real businesses</h2>
            <p className="text-lg md:text-xl text-slate-200">I build outcomes, not just websites. Here are a few recent launches.</p>
          </div>
          <button className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-3 border border-slate-700">
            See full case study
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/3] rounded-[32px] overflow-hidden mb-8 border border-slate-800 shadow-2xl relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-4 px-2">
                <div className="text-sky-400 text-sm font-black uppercase tracking-[0.2em]">{project.category}</div>
                <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors">{project.title}</h3>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-bold border border-emerald-500/20">
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
