"use client";

// CHANGED: Added useState and useEffect to our imports
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

// Particle system that reacts to mouse
function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const count = 4000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 14;
      pos[i3 + 1] = (Math.random() - 0.5) * 14;
      pos[i3 + 2] = (Math.random() - 0.5) * 8;

      // Red to gold gradient based on position
      const t = (pos[i3 + 1] + 7) / 14;
      col[i3] = 0.9 - t * 0.2;       // R
      col[i3 + 1] = t * 0.85;        // G (0 for red, 0.85 for gold)
      col[i3 + 2] = 0;               // B
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.y = time * 0.04 + mouse.x * 0.3;
    meshRef.current.rotation.x = mouse.y * 0.2;

    // Gentle wave
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const z = positions[i3 + 2];
      posAttr.array[i3 + 1] =
        positions[i3 + 1] +
        Math.sin(time * 0.5 + x * 0.5) * 0.08 +
        Math.cos(time * 0.3 + z * 0.5) * 0.05;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Floating logo plane (FIXED MIRROR EFFECT)
// CHANGED: We now pass an "isMobile" prop to tell the logo if it should be small
function LogoMesh({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader.load("/logo.png");
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y = mouse.x * 0.2;
    groupRef.current.rotation.x = -mouse.y * 0.1;
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.12;
  });

  // CHANGED: Determine the scale based on the screen size. 
  // Change 2.2 if you want it even smaller (like 1.8) or bigger (like 2.5) on phones!
  const logoScale = isMobile ? 2.8 : 3.5;

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      {/* Group takes the scaling and movement animations */}
      <group ref={groupRef} scale={[logoScale, logoScale, logoScale]}>

        {/* ─── FRONT FACE ─── */}
        <mesh>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            transparent
            alphaTest={0.01}
          />
        </mesh>

        {/* ─── BACK FACE ─── */}
        <mesh rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={texture}
            transparent
            alphaTest={0.01}
          />
        </mesh>

      </group>
    </Float>
  );
}

// Orbiting rings
function OrbitalRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
    ref.current.rotation.x = Math.PI / 3;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 12, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

export default function HeroCanvas() {
  // CHANGED: We measure the screen here to figure out if we are on a phone
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      className="w-full h-full"
      style={{ touchAction: 'pan-y' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#E60000" />
      <pointLight position={[-3, -3, 3]} intensity={1.5} color="#FFD700" />

      <ParticleField />

      {/* CHANGED: We hand the isMobile status down to the logo! */}
      <LogoMesh isMobile={isMobile} />

      <OrbitalRing radius={2.2} speed={0.3} color="#E60000" />
      <OrbitalRing radius={2.8} speed={-0.2} color="#FFD700" />
      <OrbitalRing radius={1.8} speed={0.5} color="#CC6600" />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}