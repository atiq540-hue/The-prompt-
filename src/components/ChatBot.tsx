import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Loader2, User, Bot, Share2, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import Markdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface LeadData {
  name: string;
  businessType: string;
  websiteNeeds: string;
  additionalInfo?: string;
}

export const ChatBot = () => {
  const { t, language, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [isSent, setIsSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = language === 'ur'
        ? 'ہیلو! میں دی پرامپٹ آرکیٹیکٹ کا AI اسسٹنٹ ہوں۔ آپ کا نام کیا ہے اور آپ کس قسم کا کاروبار چلاتے ہیں؟'
        : 'Hello! I\'m the AI Assistant for The Prompt Architect. What is your name and what kind of business do you run?';
      setMessages([{ role: 'model', text: initialMessage }]);
    }
  }, [language]);

  const systemInstruction = `
    You are the AI Assistant for The Prompt Architect. Your goal is to help small business owners understand how a professional website can grow their business.
    Tone: Professional, helpful, and confident.
    Goal: Ask the user for their name and what kind of business they run. Also try to understand what kind of website they need (e.g., e-commerce, portfolio, landing page).
    
    CRITICAL: Once you have gathered the user's Name, Business Type, and Website Needs, you MUST call the 'summarize_lead' function to prepare a summary for the Architect.
    
    Knowledge: We build sites in 3–10 days. We focus on 'conversion' (turning visitors into customers).
    Constraint: If someone asks for a price, tell them to 'Chat with the Architect' on WhatsApp for a custom quote.
    Language: You must respond in ${language === 'ur' ? 'Urdu' : 'English'}.
  `;

  const summarizeLeadTool = {
    functionDeclarations: [
      {
        name: "summarize_lead",
        description: "Summarizes the gathered lead information to be sent to the Architect.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The user's name" },
            businessType: { type: Type.STRING, description: "The type of business they run" },
            websiteNeeds: { type: Type.STRING, description: "What they need from their website" },
            additionalInfo: { type: Type.STRING, description: "Any other relevant details from the conversation" },
          },
          required: ["name", "businessType", "websiteNeeds"],
        },
      },
    ],
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      if (!process.env.GEMINI_API_KEY) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: language === 'ur' 
            ? 'معذرت، AI کی ترتیب میں مسئلہ ہے۔ براہ کرم یقینی بنائیں کہ API Key سیٹ ہے۔' 
            : 'Sorry, the AI is not configured correctly. Please ensure the GEMINI_API_KEY is set in the environment variables.' 
        }]);
        setLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const chat = ai.chats.create({
        model: "gemini-3.1-pro-preview",
        config: {
          systemInstruction: systemInstruction,
          tools: [summarizeLeadTool],
        },
        history: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const response = await chat.sendMessage({ message: userMessage });
      
      // Handle function calls
      if (response.functionCalls) {
        for (const call of response.functionCalls) {
          if (call.name === 'summarize_lead') {
            setLeadData(call.args as unknown as LeadData);
            
            // Send a response back to the model to acknowledge the tool call
            const toolResponse = await chat.sendMessage({
              message: language === 'ur' 
                ? "میں نے آپ کی معلومات کا خلاصہ تیار کر لیا ہے۔ کیا آپ چاہیں گے کہ میں اسے آرکیٹیکٹ کو بھیج دوں؟"
                : "I have prepared a summary of your information. Would you like me to send it to the Architect?"
            });
            setMessages(prev => [...prev, { role: 'model', text: toolResponse.text }]);
          }
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
      }
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: language === 'ur' ? 'معذرت، رابطہ کرنے میں مسئلہ ہوا۔ براہ کرم دوبارہ کوشش کریں۔' : 'Sorry, I am having trouble connecting. Please try again in a moment.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleShareWithArchitect = () => {
    if (!leadData) return;

    const summary = `*New Lead from Architect AI*%0A%0A` +
      `*Name:* ${leadData.name}%0A` +
      `*Business:* ${leadData.businessType}%0A` +
      `*Needs:* ${leadData.websiteNeeds}%0A` +
      (leadData.additionalInfo ? `*Details:* ${leadData.additionalInfo}%0A` : '') +
      `%0A_Sent with customer permission via Architect AI_`;

    const whatsappUrl = `https://wa.me/923278651402?text=${summary}`;
    window.open(whatsappUrl, '_blank');
    setIsSent(true);
  };

  return (
    <div className="fixed bottom-8 left-8 z-[60] flex flex-col items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] max-h-[70vh] sm:max-h-[600px] bg-slate-950 border border-white/20 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden z-[70]"
          >
            {/* Header */}
            <div className="p-6 bg-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
                  <Bot className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm uppercase tracking-widest">Architect AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl text-slate-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth bg-slate-950"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-sky-600 text-white rounded-tr-none' 
                      : 'bg-slate-800 text-slate-100 rounded-tl-none border border-white/10'
                  }`}>
                    <div className="markdown-body prose prose-invert prose-sm max-w-none">
                      <Markdown>{m.text}</Markdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-white/10">
                    <Loader2 className="w-4 h-4 text-sky-500 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Lead Summary Action */}
            <AnimatePresence>
              {leadData && !isSent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="px-6 py-4 bg-sky-500/20 border-t border-sky-500/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sky-400 text-[10px] font-black uppercase tracking-widest mb-1">Lead Summary Ready</p>
                      <p className="text-white text-xs font-medium truncate">{leadData.name} - {leadData.businessType}</p>
                    </div>
                    <button
                      onClick={handleShareWithArchitect}
                      className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-sky-500/20 whitespace-nowrap"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      {language === 'ur' ? 'آرکیٹیکٹ کو بھیجیں' : 'Send to Architect'}
                    </button>
                  </div>
                </motion.div>
              )}
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-6 py-4 bg-emerald-500/20 border-t border-emerald-500/30"
                >
                  <div className="flex items-center gap-3 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <p className="text-xs font-bold uppercase tracking-widest">
                      {language === 'ur' ? 'معلومات بھیج دی گئی ہیں!' : 'Information Sent Successfully!'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="p-5 bg-slate-900 border-t border-white/10">
              <div className="relative flex items-center gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={language === 'ur' ? 'پیغام لکھیں...' : 'Type a message...'}
                  className={`flex-1 bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-white text-base focus:outline-none focus:border-sky-500 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="p-4 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 text-white rounded-2xl transition-all shadow-lg shadow-sky-500/20 flex-shrink-0"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 bg-sky-500 text-white rounded-[24px] shadow-2xl shadow-sky-500/40 hover:bg-sky-400 transition-all relative group"
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
        {!isOpen && (
          <span className="absolute left-full ml-4 px-4 py-2 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none">
            {language === 'ur' ? 'آرکیٹیکٹ سے بات کریں' : 'Chat with Architect'}
          </span>
        )}
      </motion.button>
    </div>
  );
};
