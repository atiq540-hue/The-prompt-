import React from 'react';
import { motion } from 'motion/react';
import { Send, Phone } from 'lucide-react';

export const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-800 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">Ready to get a site that works?</h2>
            <p className="text-lg md:text-2xl text-slate-200 mb-10 leading-relaxed">
              Stop losing customers to a bad website. Let's build something that <span className="text-white font-bold italic">actually converts.</span>
            </p>
            
            <div className="space-y-6">
              <a 
                href="https://wa.me/923278651402?text=Hi! I'm interested in starting a project with The Prompt Architect."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-sky-500/30 active:scale-95"
              >
                <Phone className="w-6 h-6" />
                Chat with the Architect
              </a>
              <div className="text-slate-500 text-sm font-medium flex items-center justify-center lg:justify-start gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Response typically within 24 hours.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-10 rounded-[40px] bg-slate-700 border border-slate-600 shadow-2xl relative"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-sky-500/10 rounded-full blur-3xl" />
            <h3 className="text-2xl font-bold text-white mb-8">Send a quick brief</h3>
            <form 
              className="space-y-5" 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const business = formData.get('business');
                const goal = formData.get('goal');
                const message = `Hi! I'm ${name} from ${business}. My goal is: ${goal}`;
                window.open(`https://wa.me/923278651402?text=${encodeURIComponent(message)}`, '_blank');
              }}
            >
              <div className="space-y-2">
                <label className="block text-slate-400 text-sm font-bold uppercase tracking-widest ml-1">Name</label>
                <input name="name" type="text" required className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-sky-500 transition-colors text-base" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="block text-slate-400 text-sm font-bold uppercase tracking-widest ml-1">Business Name</label>
                <input name="business" type="text" required className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-sky-500 transition-colors text-base" placeholder="Your business" />
              </div>
              <div className="space-y-2">
                <label className="block text-slate-400 text-sm font-bold uppercase tracking-widest ml-1">Website Goal</label>
                <textarea name="goal" required className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-sky-500 transition-colors h-32 resize-none text-base" placeholder="What do you want to achieve?"></textarea>
              </div>
              <button type="submit" className="w-full py-5 bg-slate-700 hover:bg-slate-600 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                Send brief via WhatsApp
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
