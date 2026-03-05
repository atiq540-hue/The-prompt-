import React from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';

export const Scarcity = () => {
  return (
    <section className="py-12 bg-sky-600">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white text-center md:text-left">
          <div className="p-3 bg-white/10 rounded-2xl">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xl font-bold">Limited onboarding slots per month</div>
            <p className="text-sky-100">Only 5 spots left for March to keep quality high.</p>
          </div>
          <div className="md:ml-12">
            <div className="px-4 py-2 bg-white text-sky-600 rounded-full text-sm font-bold uppercase tracking-wider">
              Next available: March 15th
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
