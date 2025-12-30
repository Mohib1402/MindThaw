import React, { useEffect, useRef, useState } from 'react';
import { useMindStore } from '../store';
import { Volume2, VolumeX } from 'lucide-react';

const AudioAmbience = () => {
  const garden = useMindStore((state) => state.garden);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const winterRef = useRef(new Audio('/winter.mp3'));
  const springRef = useRef(new Audio('/spring.mp3'));

  const toggleAudio = async () => {
    if (isPlaying) {
      winterRef.current.pause();
      springRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await winterRef.current.play();
        await springRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    }
  };

  useEffect(() => {
    winterRef.current.loop = true;
    springRef.current.loop = true;
    winterRef.current.volume = 0;
    springRef.current.volume = 0;

    return () => {
      winterRef.current.pause();
      springRef.current.pause();
    };
  }, []);

  // THE UPDATED MIXING LOGIC
  useEffect(() => {
    if (!isPlaying || garden.length === 0) return;

    const total = garden.reduce((sum, entry) => sum + (entry.mood_score || 50), 0);
    const averageMood = total / garden.length;

    let targetSpringVol = 0;
    let targetWinterVol = 0;

    // STRICTER THRESHOLDS
    if (averageMood > 60) {
        // HAPPY: Only Spring
        targetSpringVol = 0.6; 
        targetWinterVol = 0; // Completely silent
    } else if (averageMood < 40) {
        // SAD: Only Winter
        targetSpringVol = 0; // Completely silent
        targetWinterVol = 0.6;
    } else {
        // NEUTRAL: A quiet mix of both
        targetSpringVol = 0.2;
        targetWinterVol = 0.2;
    }

    // Faster Fade Interval
    const fade = setInterval(() => {
        const adjust = (current, target) => {
            // Increased step from 0.02 to 0.05 for faster response
            if (current < target) return Math.min(target, current + 0.05);
            if (current > target) return Math.max(target, current - 0.05);
            return current;
        };

        springRef.current.volume = adjust(springRef.current.volume, targetSpringVol);
        winterRef.current.volume = adjust(winterRef.current.volume, targetWinterVol);
    }, 200);

    return () => clearInterval(fade);
  }, [garden, isPlaying]);

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900/80 backdrop-blur-md text-white rounded-full shadow-2xl border border-slate-700 hover:scale-110 transition-all hover:bg-slate-800 group"
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-spring-primary animate-pulse" />
      ) : (
        <VolumeX className="w-6 h-6 text-gray-400 group-hover:text-white" />
      )}
    </button>
  );
};

export default AudioAmbience;