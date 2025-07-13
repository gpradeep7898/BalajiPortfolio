import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Caustics, Sparkles } from '@pmndrs/drei';
import * as THREE from 'three';

// Logic Crystal: Asymmetric hexagonal prism with glass material and blue emissive core
function LogicCrystal() {
  const group = useRef();
  useFrame((state) => {
    // Slow, multi-axis, organic rotation
    if (group.current) {
      group.current.rotation.x += 0.003;
      group.current.rotation.y += 0.004;
      group.current.rotation.z += 0.002;
    }
  });

  // Vertices for an asymmetric hexagonal prism (hand-tuned for organic feel)
  const vertices = [
    [0.0, 1.2, 0.0],
    [0.6, 0.6, 0.3],
    [1.0, 0.0, 0.1],
    [0.5, -1.1, -0.2],
    [-0.5, -1.0, 0.2],
    [-1.0, 0.0, -0.1],
    [-0.6, 0.7, -0.3],
  ];
  // Extrude to create a prism
  const prismGeometry = React.useMemo(() => {
    const shape = new THREE.Shape();
    vertices.forEach(([x, y], i) => {
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
    shape.lineTo(vertices[0][0], vertices[0][1]);
    const extrudeSettings = {
      steps: 1,
      depth: 0.5,
      bevelEnabled: false,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Caustics effect on a plane behind the icon */}
      <Caustics
        color="#2563EB"
        position={[0, 0, -0.6]}
        lightSource={[0, 2, 2]}
        ior={1.5}
        worldRadius={1.5}
        intensity={0.25}
        backside
      >
        {/* The glass crystal */}
        <mesh geometry={prismGeometry} castShadow receiveShadow>
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={512}
            thickness={1.5}
            transmission={1}
            roughness={0.08}
            ior={1.5}
            chromaticAberration={0.02}
            anisotropy={0.1}
            distortion={0.08}
            distortionScale={0.2}
            temporalDistortion={0.1}
            attenuationColor="#2563EB"
            attenuationDistance={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            // Fresnel edge glow
            fresnel={1.2}
          />
        </mesh>
        {/* Emissive blue core */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshPhysicalMaterial
            color="#2563EB"
            emissive="#2563EB"
            emissiveIntensity={1.2}
            transparent
            opacity={0.7}
            roughness={0.2}
            transmission={1}
            thickness={0.5}
          />
        </mesh>
        {/* Sparkling particles */}
        <Sparkles
          count={18}
          scale={[1.2, 1.2, 1.2]}
          size={2.5}
          color="#2563EB"
          speed={0.5}
          opacity={0.7}
        />
      </Caustics>
    </group>
  );
}

// Main export: Canvas with the Logic Crystal icon
export default function CrystallineIcons() {
  return (
    <div style={{ width: '100%', height: '350px' }}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }} shadows>
        <ambientLight intensity={0.7} />
        <pointLight position={[2, 4, 4]} intensity={1.2} color="#2563EB" />
        <LogicCrystal />
      </Canvas>
    </div>
  );
} 