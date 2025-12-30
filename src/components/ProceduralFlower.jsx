import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Sparkles } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three'; // <--- 1. NEW IMPORT

const ProceduralFlower = ({ moodData }) => {
  const meshRef = useRef();
  const { color_hex, mood_score } = moodData;

  const speed = 0.5 + (mood_score / 100) * 3; 
  const distort = 0.3 + (mood_score / 100) * 0.6; 

  // 2. THE GROWTH ANIMATION
  // animate scale from 0 to 1.2 (our previous size)
  const { scale } = useSpring({
    from: { scale: [0, 0, 0] },
    to: { scale: [1.2, 1.2, 1.2] },
    config: { tension: 100, friction: 10 } // "Bouncy" physics
  });

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        
        {/* 3. USE ANIMATED MESH INSTEAD OF REGULAR MESH */}
        <animated.mesh ref={meshRef} scale={scale}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          
          <MeshDistortMaterial 
            color={color_hex} 
            speed={speed} 
            distort={distort} 
            radius={1}
            roughness={0.1} 
            metalness={0.8} 
          />
        </animated.mesh>
      </Float>

      <Sparkles 
        count={100} 
        scale={4} 
        size={4} 
        speed={0.4} 
        opacity={0.5} 
        color={color_hex} 
      />
    </group>
  );
};

export default ProceduralFlower;