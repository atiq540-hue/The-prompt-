import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Wand2, Loader2, Upload, Download } from 'lucide-react';

export const AIDemo = () => {
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
        setError("AI didn't return an image. Try a different prompt.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to edit image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-900 border-y border-slate-800">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <Wand2 className="w-4 h-4" />
            Live Demo
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Experience the AI Magic</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            This is the "Nano Banana" power I bring to your site. Upload an image and tell the AI how to edit it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-slate-950 p-5 sm:p-8 rounded-[32px] border border-slate-800 shadow-2xl">
          <div className="space-y-6">
            <div className="aspect-square rounded-2xl bg-slate-900 border-2 border-dashed border-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
              {image ? (
                <>
                  <img src={image} alt="Original" className="w-full h-full object-contain" />
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white">
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="font-bold">Change Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center cursor-pointer text-slate-500 hover:text-sky-400 transition-colors w-full h-full p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-sky-500/10 transition-colors">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg">Upload an image to start</span>
                  <p className="text-sm text-slate-600 mt-2">Tap here to select a photo</p>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'Add a retro filter', 'Make it a sunset scene', 'Add a robot in the background'"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-sky-500 transition-colors h-32 resize-none text-base"
                />
                <div className="absolute bottom-3 right-3 text-[10px] text-slate-600 uppercase font-bold tracking-widest">
                  AI Prompt
                </div>
              </div>
              <button
                onClick={handleEdit}
                disabled={!image || !prompt || loading}
                className="w-full py-5 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Wand2 className="w-6 h-6" />}
                {loading ? 'Processing...' : 'Apply AI Magic'}
              </button>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm font-medium text-center bg-red-400/10 py-2 rounded-lg"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </div>

          <div className="aspect-square rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full h-full relative"
                >
                  <img src={result} alt="Result" className="w-full h-full object-contain" />
                  <a 
                    href={result} 
                    download="edited-image.png"
                    className="absolute bottom-6 right-6 p-4 bg-sky-500 hover:bg-sky-400 text-white rounded-2xl shadow-2xl transition-transform hover:scale-110 active:scale-95"
                  >
                    <Download className="w-6 h-6" />
                  </a>
                </motion.div>
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center p-8"
                >
                  <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 relative">
                    {loading && (
                      <div className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-3xl animate-spin" />
                    )}
                    <Loader2 className={`w-10 h-10 text-slate-600 ${loading ? 'text-sky-500' : ''}`} />
                  </div>
                  <h4 className="text-white font-bold text-xl mb-2">
                    {loading ? 'Generating...' : 'Ready for Magic'}
                  </h4>
                  <p className="text-slate-500 max-w-[200px] mx-auto text-sm">
                    {loading ? 'Gemini is processing your request...' : 'Your AI result will appear here after you apply magic'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
