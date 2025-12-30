import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import ProceduralFlower from './ProceduralFlower';

const GRID_SIZE = 5; 
const SPACING = 2.5; 

const ShadowFloor = () => (
  <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
    <planeGeometry args={[100, 100]} />
    <shadowMaterial transparent opacity={0.3} />
  </mesh>
);

const GardenScene = ({ garden = [] }) => {
  
  const averageMood = useMemo(() => {
    if (garden.length === 0) return 50; 
    const total = garden.reduce((sum, entry) => sum + (entry.mood_score || 50), 0);
    return total / garden.length;
  }, [garden]);

  const envPreset = averageMood < 30 ? "night" : averageMood > 70 ? "sunset" : "city";
  
  // Dynamic UI colors
  const borderColor = averageMood > 70 ? '#fcd34d' : averageMood < 30 ? '#1e293b' : '#94a3b8';
  const bgColor = averageMood > 70 ? 'rgba(252, 211, 77, 0.05)' : averageMood < 30 ? 'rgba(15, 23, 42, 0.2)' : 'rgba(0,0,0,0.2)';

  return (
    // UPDATED: Added touchAction: 'none' for better mobile control
    <div 
      className="w-full h-full relative overflow-hidden transition-all duration-1000"
      style={{ 
        backgroundColor: bgColor,
        touchAction: 'none' // IMPORTANT: Prevents page scroll when rotating garden
      }}
    >
      <Canvas shadows camera={{ position: [5, 5, 10], fov: 45 }}>
        
        <ambientLight intensity={averageMood < 30 ? 0.2 : 0.8} />
        <Environment preset={envPreset} background blur={0.6} />
        
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={2} 
          castShadow 
          shadow-mapSize={[2048, 2048]} 
          shadow-bias={-0.0004} 
        />

        <group position={[-5, 0, -5]}> 
          {garden.map((entry, index) => {
            const row = Math.floor(index / GRID_SIZE);
            const col = index % GRID_SIZE;
            
            const moodData = {
              color_hex: entry.hex_color || entry.color_hex, 
              mood_score: entry.mood_score
            };

            return (
              <group key={entry.id || index} position={[col * SPACING, 0, row * SPACING]}>
                <ProceduralFlower moodData={moodData} />
              </group>
            );
          })}
        </group>

        <ShadowFloor />

        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.5} 
            radius={0.5} 
          />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>

        <OrbitControls autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default GardenScene;