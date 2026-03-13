import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Wand2, Loader2, Upload, Download, Key, ExternalLink, Clapperboard } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

import { useLanguage } from '../contexts/LanguageContext';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const VeoAdGenerator = () => {
  const { t, isRTL } = useLanguage();
  const [image, setImage] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'scripting' | 'rendering' | 'done'>('idle');
  const [script, setScript] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setVideoUrl(null);
        setScript(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAd = async () => {
    if (!image || !productName) return;

    setLoading(true);
    setError(null);
    setStatus('scripting');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      // Step 1: Generate the Cinematic Script
      const scriptResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are the "Cinematic Ad Director". Turn the product "${productName}" into a high-end, 6-second video ad script for Google Veo.
        
        Always include these 5 layers in your output:
        Cinematography: Use professional terms (Dolly-in, Macro close-up, 35mm lens).
        Subject: Describe the product with rich textures (e.g., "frothy milk bubbles", "brushed aluminum").
        Action: One clear, physical motion (e.g., "steam rising", "slow rotation").
        Lighting/Style: Use high-end terms (Golden hour, Studio rim lighting, Minimalist).
        Audio: Describe synchronized sounds (e.g., "The sound of a coffee machine hissing and a soft jazz piano").
        
        Constraint: Do not use subtitles. Keep the video length at 6 seconds. Output the script clearly.`,
      });

      const adScript = scriptResponse.text;
      setScript(adScript);
      setStatus('rendering');

      // Step 2: Generate Video with Veo
      const base64Match = image.match(/^data:(image\/\w+);base64,(.+)$/);
      if (!base64Match) throw new Error("Invalid image format");
      const mimeType = base64Match[1];
      const base64Data = base64Match[2];

      const veoAi = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      let operation = await veoAi.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: adScript,
        image: {
          imageBytes: base64Data,
          mimeType: mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await veoAi.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const videoResponse = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.API_KEY!,
          },
        });
        const videoBlob = await videoResponse.blob();
        setVideoUrl(URL.createObjectURL(videoBlob));
        setStatus('done');
      } else {
        throw new Error("Video generation failed");
      }

    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
      }
      setError(t('veoAd.error'));
      setStatus('idle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="veo-ad" className="py-24 md:py-32 bg-slate-900 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-black uppercase tracking-widest mb-6">
              <Clapperboard className="w-4 h-4" />
              {t('veoAd.badge')}
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">{t('veoAd.title')}</h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              {t('veoAd.subtitle')}
            </p>
          </motion.div>
        </div>

        {!hasKey ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto bg-slate-800/50 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Key className="w-10 h-10 text-sky-500" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4">{t('veoAd.selectKey')}</h3>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              {t('veoAd.keyRequired')}
            </p>
            <div className="space-y-4">
              <button
                onClick={handleSelectKey}
                className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl font-black transition-all shadow-xl shadow-sky-500/20"
              >
                {t('veoAd.selectKey')}
              </button>
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-slate-500 hover:text-white text-xs transition-colors"
              >
                {t('veoAd.billingLink')}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Side */}
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <label className="block text-slate-400 text-xs font-black uppercase tracking-widest ml-1">
                  {t('veoAd.productName')}
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder={t('veoAd.productPlaceholder')}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-sky-500 transition-all text-lg font-light"
                />
              </div>

              <div className="aspect-video rounded-[40px] bg-slate-800/50 border-2 border-dashed border-white/10 flex flex-col items-center justify-center relative overflow-hidden group hover:border-sky-500/50 transition-all duration-500">
                {image ? (
                  <>
                    <img src={image} alt="Product" className="w-full h-full object-contain p-8" referrerPolicy="no-referrer" />
                    <label className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center cursor-pointer text-white backdrop-blur-sm">
                      <Upload className="w-8 h-8 mb-2" />
                      <span className="font-black uppercase tracking-widest text-xs">{t('aiDemo.change')}</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  </>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:text-sky-400 transition-all duration-500 w-full h-full p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-4 shadow-xl">
                      <Upload className="w-8 h-8" />
                    </div>
                    <span className="font-black text-xl text-white mb-1">{t('veoAd.upload')}</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                )}
              </div>

              <button
                onClick={generateAd}
                disabled={!image || !productName || loading}
                className="w-full py-6 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-[24px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-2xl shadow-sky-500/20"
              >
                {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : <Video className="w-7 h-7" />}
                {loading ? (status === 'scripting' ? t('veoAd.processingScript') : t('veoAd.generatingVideo')) : t('veoAd.generate')}
              </button>

              {error && (
                <p className="text-red-400 text-sm font-black uppercase tracking-widest text-center bg-red-400/10 py-4 rounded-2xl border border-red-400/20">
                  {error}
                </p>
              )}
            </motion.div>

            {/* Output Side */}
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-slate-800/30 backdrop-blur-sm border border-white/5 rounded-[40px] p-8 min-h-[200px] flex flex-col">
                <h3 className="text-sky-400 text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Clapperboard className="w-4 h-4" />
                  {t('veoAd.scriptTitle')}
                </h3>
                <div className="flex-grow">
                  {script ? (
                    <div className="text-slate-300 font-light leading-relaxed whitespace-pre-wrap text-lg">
                      {script}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-600 italic font-light">
                      {loading ? (
                        <div className="flex flex-col items-center gap-4">
                          <Loader2 className="w-8 h-8 animate-spin text-sky-500" />
                          <span>{t('veoAd.processingScript')}</span>
                        </div>
                      ) : "Script will appear here..."}
                    </div>
                  )}
                </div>
              </div>

              <div className="aspect-video rounded-[40px] bg-slate-800/30 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-sm">
                <AnimatePresence mode="wait">
                  {videoUrl ? (
                    <motion.div 
                      key="video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full h-full relative group"
                    >
                      <video 
                        src={videoUrl} 
                        controls 
                        autoPlay 
                        loop 
                        className="w-full h-full object-cover"
                      />
                      <motion.a 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={videoUrl} 
                        download="cinematic-ad.mp4"
                        className="absolute bottom-6 right-6 p-4 bg-sky-500 text-white rounded-2xl shadow-2xl"
                      >
                        <Download className="w-6 h-6" />
                      </motion.a>
                    </motion.div>
                  ) : (
                    <div className="text-center p-12">
                      <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                        {status === 'rendering' && (
                          <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-3xl animate-spin" />
                        )}
                        <Video className={`w-10 h-10 text-slate-700 ${status === 'rendering' ? 'text-sky-500' : ''}`} />
                      </div>
                      <h4 className="text-white font-black text-xl mb-2">
                        {status === 'rendering' ? t('veoAd.generatingVideo') : "Video Preview"}
                      </h4>
                      <p className="text-slate-500 text-sm font-light max-w-[240px] mx-auto">
                        {status === 'rendering' ? t('veoAd.waitingVeo') : "Your cinematic ad will render here."}
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
