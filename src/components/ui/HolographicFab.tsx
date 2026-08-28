"use client";

/**
 * HolographicFab – Particle Data Swarm
 *
 * Two concentric particle clouds (red inner swarm + gold outer halo) orbit at
 * different speeds to create a high-tech parallax feel.
 * Transparent background, full memory cleanup on unmount.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface HolographicFabProps {
  size?: number; // canvas size in px (default 64)
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Build a BufferGeometry filled with `count` random points distributed inside
 *  a sphere of radius `r`. Returns { geometry, positions } for later mutation. */
function buildSwarm(count: number, r: number) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Random point on sphere surface + slight radial jitter
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = r * (0.5 + Math.random() * 0.5);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    sizes[i] = 1.5 + Math.random() * 2.5; // vary particle size
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  return { geo, positions };
}

/** Tiny circular sprite texture drawn on a 16x16 canvas */
function buildSprite(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 16, 16);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function HolographicFab({ size = 64 }: HolographicFabProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // fully transparent

    // ── Scene & camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 3.8;

    // ── Sprite texture (shared) ───────────────────────────────────────────────
    const sprite = buildSprite();

    // ── Inner swarm – InfiniT Red (#E60000) ──────────────────────────────────
    const INNER_COUNT = 180;
    const { geo: innerGeo } = buildSwarm(INNER_COUNT, 1.1);

    const innerMat = new THREE.PointsMaterial({
      color: 0xe60000,
      size: 0.08,
      map: sprite,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const innerPoints = new THREE.Points(innerGeo, innerMat);
    scene.add(innerPoints);

    // ── Outer halo – Gold (#FFD700) ───────────────────────────────────────────
    const OUTER_COUNT = 110;
    const { geo: outerGeo } = buildSwarm(OUTER_COUNT, 1.65);

    const outerMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.055,
      map: sprite,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      opacity: 0.75,
    });
    const outerPoints = new THREE.Points(outerGeo, outerMat);
    scene.add(outerPoints);

    // ── Micro accent ring – faint red equatorial belt ─────────────────────────
    const RING_COUNT = 60;
    const ringPositions = new Float32Array(RING_COUNT * 3);
    for (let i = 0; i < RING_COUNT; i++) {
      const angle = (i / RING_COUNT) * Math.PI * 2;
      ringPositions[i * 3] = Math.cos(angle) * 1.35;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.18;
      ringPositions[i * 3 + 2] = Math.sin(angle) * 1.35;
    }
    const ringGeo = new THREE.BufferGeometry();
    ringGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(ringPositions, 3)
    );
    const ringMat = new THREE.PointsMaterial({
      color: 0xff3300,
      size: 0.045,
      map: sprite,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      opacity: 0.6,
    });
    const ringPoints = new THREE.Points(ringGeo, ringMat);
    scene.add(ringPoints);

    // ── Animation loop ────────────────────────────────────────────────────────
    let t = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const boost = hoverRef.current ? 2.8 : 1;
      const dt = 0.012 * boost;
      t += dt;

      // Inner swarm – primary rotation + gentle wobble
      innerPoints.rotation.y = t * 0.9;
      innerPoints.rotation.x = t * 0.35 + Math.sin(t * 0.4) * 0.2;

      // Outer halo – slightly slower, opposite tilt for parallax
      outerPoints.rotation.y = t * 0.55;
      outerPoints.rotation.x = -t * 0.22 + Math.cos(t * 0.3) * 0.15;
      outerPoints.rotation.z = t * 0.12;

      // Equatorial ring – fast spin on its own axis
      ringPoints.rotation.y = t * 1.4;
      ringPoints.rotation.z = Math.sin(t * 0.5) * 0.3;

      // Pulse the inner opacity for a breathing effect
      innerMat.opacity = 0.72 + Math.sin(t * 1.6) * 0.28;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafRef.current);
      innerGeo.dispose();
      outerGeo.dispose();
      ringGeo.dispose();
      innerMat.dispose();
      outerMat.dispose();
      ringMat.dispose();
      sprite.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: "block", width: size, height: size }}
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
      }}
    />
  );
}
