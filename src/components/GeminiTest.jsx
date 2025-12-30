import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useMindStore } from '../store';
import { supabase } from '../lib/supabase';
import { Send, Loader2 } from 'lucide-react';

const GeminiTest = ({ userId }) => {
  const [status, setStatus] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const addEntry = useMindStore((state) => state.addEntry); 

  const runAnalysis = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    setStatus("Analyzing...");
    
    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        Analyze this journal entry: "${userInput}"
        Return a JSON object with:
        - mood_score (0-100)
        - flower_type (string)
        - color_hex (string representing the emotion)
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().replace(/```json|```/g, '').trim();
      const jsonData = JSON.parse(text);
      
const newEntryPayload = {
    content: userInput,
    mood_score: jsonData.mood_score,
    flower_type: jsonData.flower_type,
    hex_color: jsonData.color_hex,
    summary: "User Entry",
    user_id: userId
};

      const { data, error } = await supabase
        .from('journal_entries')
        .insert([newEntryPayload])
        .select();

      if (error) throw error;

      if (data) {
        const localEntry = { ...data[0], color_hex: data[0].hex_color };
        addEntry(localEntry);
      }
      
      setStatus("Planted! 🌱");
      setUserInput(""); 
      
    } catch (error) {
      console.error(error);
      setStatus("Error. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // UPDATED CONTAINER: Fills the sidebar width, added group for hover effects
    <div className="w-full relative group">
      
      {/* GLOW EFFECT: A blurred gradient behind the card */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-30 group-hover:opacity-100 transition duration-500 blur"></div>
      
      {/* MAIN CARD */}
      <div className="relative bg-slate-900 p-6 rounded-2xl border border-slate-700">
        <h2 className="text-white text-sm font-semibold mb-3 flex items-center gap-2 uppercase tracking-wide text-slate-400">
          New Entry
        </h2>
        
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="How are you feeling right now?"
          className="w-full h-32 bg-slate-800/50 text-white p-4 rounded-xl border border-slate-600 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none resize-none transition-all placeholder:text-slate-600"
        />

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs font-mono text-slate-500">{status}</p>
          
          <button 
            onClick={runAnalysis}
            disabled={isLoading || !userInput}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all
              ${isLoading || !userInput 
                ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                : 'bg-white text-slate-900 hover:scale-105 active:scale-95 shadow-lg shadow-white/10'}
            `}
          >
            {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
            {isLoading ? "..." : "Plant"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiTest;