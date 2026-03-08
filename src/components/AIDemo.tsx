import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Wand2, Loader2, Upload, Download } from 'lucide-react';

import { useLanguage } from '../contexts/LanguageContext';

export const AIDemo = () => {
  const { t, isRTL } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!image || !prompt) return;

    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      // Extract base64 data and mime type
      const base64Match = image.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!base64Match) throw new Error("Invalid image format");
      
      const mimeType = base64Match[1];
      const base64Data = base64Match[2];

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setResult(`data:image/png;base64,${part.inlineData.data}`);
          foundImage = true;
          break;
        }
      }

      if (!foundImage) {
        setError(t('aiDemo.error'));
      }
    } catch (err: any) {
      console.error(err);
      setError(t('aiDemo.fail'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 md:py-32 bg-slate-800 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest mb-6">
              <Wand2 className="w-4 h-4" />
              {t('aiDemo.badge')}
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">{t('aiDemo.title')}</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              {t('aiDemo.subtitle')}
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-slate-900/50 backdrop-blur-xl p-6 sm:p-10 rounded-[48px] border border-white/5 shadow-2xl"
        >
          <div className="space-y-8">
            <div className="aspect-square rounded-[40px] bg-slate-800/50 border-2 border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden group transition-all duration-500 hover:border-sky-500/50">
              {image ? (
                <>
                  <img src={image} alt="Original" className="w-full h-full object-contain p-4" />
                  <label className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer text-white backdrop-blur-sm">
                    <div className="w-16 h-16 rounded-full bg-sky-500 flex items-center justify-center mb-4 shadow-xl shadow-sky-500/20">
                      <Upload className="w-8 h-8" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-sm">{t('aiDemo.change')}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:text-sky-400 transition-all duration-500 w-full h-full p-12 text-center group">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-24 h-24 rounded-[32px] bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shadow-xl"
                  >
                    <ImageIcon className="w-12 h-12" />
                  </motion.div>
                  <span className="font-black text-2xl text-white mb-2 tracking-tight">{t('aiDemo.upload')}</span>
                  <p className="text-sm text-slate-500 font-light">{t('aiDemo.tap')}</p>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={t('aiDemo.placeholder')}
                  className={`w-full bg-slate-800/50 border border-white/10 rounded-[24px] px-6 py-5 text-white focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all h-36 resize-none text-lg font-light leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
                />
                <div className={`absolute bottom-4 text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] ${isRTL ? 'left-6' : 'right-6'}`}>
                  {t('aiDemo.label')}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEdit}
                disabled={!image || !prompt || loading}
                className="w-full py-6 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-[24px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-2xl shadow-sky-500/20"
              >
                {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : <Wand2 className="w-7 h-7" />}
                {loading ? t('aiDemo.processing') : t('aiDemo.button')}
              </motion.button>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-black uppercase tracking-widest text-center bg-red-400/10 py-4 rounded-2xl border border-red-400/20"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </div>

          <div className="aspect-square rounded-[40px] bg-slate-800/30 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full relative group p-4"
                >
                  <img src={result} alt="Result" className="w-full h-full object-contain rounded-3xl" />
                  <motion.a 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={result} 
                    download="edited-image.png"
                    className={`absolute bottom-8 p-5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl shadow-2xl transition-all ${isRTL ? 'left-8' : 'right-8'}`}
                  >
                    <Download className="w-7 h-7" />
                  </motion.a>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-12"
                >
                  <div className="w-28 h-28 bg-slate-800 rounded-[40px] flex items-center justify-center mx-auto mb-8 relative shadow-2xl">
                    {loading && (
                      <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-[40px] animate-spin" />
                    )}
                    <Loader2 className={`w-14 h-14 text-slate-700 transition-colors duration-500 ${loading ? 'text-sky-500' : ''}`} />
                  </div>
                  <h4 className="text-white font-black text-3xl mb-3 tracking-tight">
                    {loading ? t('aiDemo.generating') : t('aiDemo.ready')}
                  </h4>
                  <p className="text-slate-500 max-w-[280px] mx-auto text-lg font-light leading-relaxed">
                    {loading ? t('aiDemo.geminiProcessing') : t('aiDemo.resultPlaceholder')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
