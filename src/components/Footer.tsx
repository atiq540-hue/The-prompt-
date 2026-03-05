import React from 'react';

export const Footer = () => {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-xs text-center md:text-left">
            <div className="text-xl font-bold text-white mb-2">The Prompt Architect</div>
            <p className="text-slate-500 text-sm">AI & strategy for hungry small businesses.</p>
          </div>

          <div className="flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="https://wa.me/923278651402" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
          </div>

          <div className="text-slate-600 text-xs">
            © {new Date().getFullYear()} The Prompt Architect. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
