import { create } from 'zustand';

export const useMindStore = create((set) => ({
  // The list of all past flowers (The Garden)
  garden: [],
  
  // The single current flower being previewed (The Sprout)
  currentEntry: null,

  // Action: Add a new flower to the list
  addEntry: (entry) => set((state) => ({ 
    garden: [entry, ...state.garden], // Add new one to the front
    currentEntry: entry 
  })),

  // Action: Load the whole history from Supabase
  setGarden: (entries) => set({ garden: entries }),
}));