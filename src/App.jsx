import React, { useEffect, useState } from 'react';
import GeminiTest from './components/GeminiTest';
import GardenScene from './components/GardenScene';
import AudioAmbience from './components/AudioAmbience';
import { useMindStore } from './store';
import { supabase } from './lib/supabase';

function App() {
  const garden = useMindStore((state) => state.garden);
  const setGarden = useMindStore((state) => state.setGarden);
  const [userId, setUserId] = useState(null);

  // 1. SETUP PERSONAL IDENTITY (The "Local Login")
  useEffect(() => {
    let storedId = localStorage.getItem('mindthaw_user_id');
    if (!storedId) {
      storedId = crypto.randomUUID(); // Generate a random ID for this device
      localStorage.setItem('mindthaw_user_id', storedId);
    }
    setUserId(storedId);
  }, []);

  // 2. FETCH ONLY *YOUR* HISTORY
  useEffect(() => {
    if (!userId) return;

    const fetchHistory = async () => {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId) // <--- FILTER BY USER ID
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching garden:', error);
      else if (data) setGarden(data);
    };

    fetchHistory();
  }, [setGarden, userId]);

  return (
    <div className="min-h-screen lg:h-screen w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black text-white flex flex-col lg:flex-row lg:overflow-hidden">
      
      <AudioAmbience />

      {/* LEFT SIDEBAR: Mobile Optimization */}
      <div className="w-full h-auto lg:w-[400px] lg:h-full p-4 lg:p-6 flex flex-col gap-4 lg:gap-6 bg-black/20 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-white/10 z-10 relative lg:overflow-y-auto shrink-0">
        <div>
          {/* RESPONSIVE TEXT: text-2xl on mobile, text-4xl on desktop */}
          <h1 className="text-2xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white mb-1 lg:mb-2">
            MindThaw ❄️
          </h1>
          <p className="text-slate-400 text-xs lg:text-sm tracking-wider uppercase">Express your emotions with a Plant!</p>
        </div>

        <GeminiTest userId={userId} />

        <div className="mt-auto pt-4 lg:pt-6 border-t border-white/10">
          <p className="text-[10px] lg:text-xs font-mono text-slate-500 uppercase mb-1">Your Personal Garden</p>
          <div className="flex items-baseline gap-2">
             <span className="text-2xl lg:text-3xl font-light text-white">{garden.length}</span>
             <span className="text-xs lg:text-sm text-slate-400">Total Blooms</span>
          </div>
        </div>
      </div>

      {/* MAIN STAGE: 
          On Mobile: use 'h-[60vh]' (60% of screen height) instead of fixed pixels.
          This ensures it fits on any phone screen size. 
      */}
      <div className="relative w-full h-[60vh] lg:h-full lg:flex-1 bg-black/50">
         <GardenScene garden={garden} />
      </div>

    </div>
  );
}

export default App;