import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

function GlowingOrb() {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouse.current.x = x;
      mouse.current.y = y;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x - target.current.x) * 0.08;
    target.current.y += (mouse.current.y - target.current.y) * 0.08;
    if (meshRef.current) {
      meshRef.current.rotation.y = target.current.x * 0.7;
      meshRef.current.rotation.x = target.current.y * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={5}>
      <meshStandardMaterial
        color="#3A5A9B"
        emissive="#3A5A9B"
        emissiveIntensity={0.7}
        wireframe={false}
        transparent
        opacity={1}
      />
    </Sphere>
  );
}

const Background3D = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
        <ambientLight intensity={0.7} />
        <GlowingOrb />
      </Canvas>
    </div>
  );
};

export default Background3D; 