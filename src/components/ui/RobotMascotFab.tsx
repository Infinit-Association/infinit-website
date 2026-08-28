"use client";

/**
 * RobotMascotFab
 * A cute 3D robot head built in Three.js – hovering, glowing, winking.
 * Colors: dark metallic head, #FFD700 LED face + antenna, #E60000 ear rings.
 * Transparent canvas, sized for the 64x64 FAB container.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Props {
  size?: number;
}

// ── Build the LED face canvas texture ────────────────────────────────────────
function buildFaceTexture(wink: boolean): THREE.CanvasTexture {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 220;
  const ctx = c.getContext("2d")!;

  // Dark screen background
  const bg = ctx.createLinearGradient(0, 0, 0, 220);
  bg.addColorStop(0, "#040810");
  bg.addColorStop(1, "#080c18");
  ctx.fillStyle = bg;
  ctx.roundRect(0, 0, 256, 220, 18);
  ctx.fill();

  // LED dot grid (subtle)
  for (let x = 10; x < 256; x += 14) {
    for (let y = 10; y < 220; y += 14) {
      ctx.beginPath();
      ctx.arc(x, y, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(40, 90, 200, 0.2)";
      ctx.fill();
    }
  }

  // ── Left eye: filled circle ───────────────────────────────────────────────
  ctx.shadowColor = "#FFD700";
  ctx.shadowBlur = 24;
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.arc(82, 92, 26, 0, Math.PI * 2);
  ctx.fill();
  // Inner pupil
  ctx.fillStyle = "#1a0a00";
  ctx.beginPath();
  ctx.arc(86, 88, 10, 0, Math.PI * 2);
  ctx.fill();

  // ── Right eye: wink arc or full circle ───────────────────────────────────
  ctx.shadowColor = "#FFD700";
  ctx.shadowBlur = 24;
  if (wink) {
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(174, 92, 24, Math.PI * 0.12, Math.PI * 0.88);
    ctx.stroke();
  } else {
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(174, 92, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1a0a00";
    ctx.beginPath();
    ctx.arc(170, 88, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // ── Smile arc ─────────────────────────────────────────────────────────────
  ctx.shadowColor = "#FFD700";
  ctx.shadowBlur = 20;
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(128, 118, 52, Math.PI * 0.08, Math.PI * 0.92);
  ctx.stroke();

  ctx.shadowBlur = 0;
  return new THREE.CanvasTexture(c);
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function RobotMascotFab({ size = 64 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.08, 4.6);

    // ── Lighting ──────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xc8d0ff, 0.55);
    scene.add(ambient);

    // Key light – warm white from top-right
    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.2);
    keyLight.position.set(2.5, 3.5, 3);
    scene.add(keyLight);

    // Rim light – blue-white from back-left
    const rimLight = new THREE.DirectionalLight(0x8888ff, 1.2);
    rimLight.position.set(-3, 1, -2);
    scene.add(rimLight);

    // Red fill from below (ear glow spill)
    const redFill = new THREE.PointLight(0xe60000, 1.0, 6);
    redFill.position.set(0, -2, 1.5);
    scene.add(redFill);

    // Gold screen glow
    const goldGlow = new THREE.PointLight(0xffd700, 0.7, 4);
    goldGlow.position.set(0, 0, 2.5);
    scene.add(goldGlow);

    // ── Robot group ───────────────────────────────────────────────────────────
    const robot = new THREE.Group();
    scene.add(robot);

    // ── Head – dark metallic sphere ───────────────────────────────────────────
    const headGeo = new THREE.SphereGeometry(1.0, 48, 48);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.88,
      roughness: 0.18,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    robot.add(headMesh);

    // ── Face bezel (slightly recessed ring) ───────────────────────────────────
    const bezelGeo = new THREE.BoxGeometry(1.38, 1.08, 0.05);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x1e2235,
      metalness: 0.9,
      roughness: 0.15,
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.set(0, 0.06, 0.94);
    robot.add(bezelMesh);

    // ── Face screen (LED canvas) ──────────────────────────────────────────────
    const faceTexOpen = buildFaceTexture(false);
    const faceTexWink = buildFaceTexture(true);

    const faceGeo = new THREE.BoxGeometry(1.28, 0.98, 0.06);
    const faceMat = new THREE.MeshStandardMaterial({
      map: faceTexOpen,
      emissiveMap: faceTexOpen,
      emissive: new THREE.Color(0xffd700),
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.0,
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.set(0, 0.06, 0.98);
    robot.add(faceMesh);

    // ── Left ear ring ─────────────────────────────────────────────────────────
    const earRingGeo = new THREE.TorusGeometry(0.24, 0.072, 20, 48);
    const earMat = new THREE.MeshStandardMaterial({
      color: 0xe60000,
      emissive: new THREE.Color(0xe60000),
      emissiveIntensity: 0.85,
      metalness: 0.6,
      roughness: 0.25,
    });
    const leftEar = new THREE.Mesh(earRingGeo, earMat);
    leftEar.position.set(-1.08, 0.1, 0.1);
    leftEar.rotation.y = Math.PI / 2;
    robot.add(leftEar);

    // ── Right ear ring ────────────────────────────────────────────────────────
    const rightEar = new THREE.Mesh(earRingGeo, earMat);
    rightEar.position.set(1.08, 0.1, 0.1);
    rightEar.rotation.y = Math.PI / 2;
    robot.add(rightEar);

    // ── Ear hub discs ─────────────────────────────────────────────────────────
    const hubGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
    const hubMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a3e,
      metalness: 0.95,
      roughness: 0.1,
    });
    const leftHub = new THREE.Mesh(hubGeo, hubMat);
    leftHub.rotation.z = Math.PI / 2;
    leftHub.position.set(-1.12, 0.1, 0.1);
    robot.add(leftHub);
    const rightHub = new THREE.Mesh(hubGeo, hubMat);
    rightHub.rotation.z = Math.PI / 2;
    rightHub.position.set(1.12, 0.1, 0.1);
    robot.add(rightHub);

    // ── Antenna stem ─────────────────────────────────────────────────────────
    const antStemGeo = new THREE.CylinderGeometry(0.038, 0.048, 0.44, 10);
    const antStemMat = new THREE.MeshStandardMaterial({
      color: 0x2d2d4a,
      metalness: 0.92,
      roughness: 0.12,
    });
    const antStem = new THREE.Mesh(antStemGeo, antStemMat);
    antStem.position.set(0, 1.42, 0);
    robot.add(antStem);

    // ── Antenna tip – glowing gold sphere ─────────────────────────────────────
    const antTipGeo = new THREE.SphereGeometry(0.115, 20, 20);
    const antTipMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: new THREE.Color(0xffd700),
      emissiveIntensity: 1.4,
      metalness: 0.3,
      roughness: 0.1,
    });
    const antTip = new THREE.Mesh(antTipGeo, antTipMat);
    antTip.position.set(0, 1.68, 0);
    robot.add(antTip);

    // ── Chin accent stripe ────────────────────────────────────────────────────
    const chinGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.06, 32, 1, true,
      Math.PI * 0.2, Math.PI * 0.6);
    const chinMat = new THREE.MeshStandardMaterial({
      color: 0xe60000,
      emissive: new THREE.Color(0xe60000),
      emissiveIntensity: 0.5,
      metalness: 0.4,
      roughness: 0.3,
      side: THREE.DoubleSide,
    });
    const chin = new THREE.Mesh(chinGeo, chinMat);
    chin.position.set(0, -0.76, 0.4);
    chin.rotation.x = Math.PI * 0.25;
    robot.add(chin);

    // ── Scale to fit 64px canvas ──────────────────────────────────────────────
    robot.scale.setScalar(0.68);
    robot.position.y = -0.06;

    // ── Animation ─────────────────────────────────────────────────────────────
    let t = 0;
    let winkPhase = false;
    let winkTimer = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const speed = hoverRef.current ? 2.2 : 1;
      t += 0.016 * speed;
      winkTimer += 0.016 * speed;

      // Wink every ~3.5 s
      const shouldWink = winkTimer % 3.5 < 0.35;
      if (shouldWink !== winkPhase) {
        winkPhase = shouldWink;
        faceMat.map = winkPhase ? faceTexWink : faceTexOpen;
        faceMat.emissiveMap = winkPhase ? faceTexWink : faceTexOpen;
        faceMat.needsUpdate = true;
      }

      // Bobbing float
      robot.position.y = -0.06 + Math.sin(t * 1.15) * 0.07;

      // Gentle sway / head tilt
      robot.rotation.y = Math.sin(t * 0.55) * 0.22;
      robot.rotation.z = Math.sin(t * 0.38) * 0.045;

      // Antenna pulse
      antTipMat.emissiveIntensity = 1.0 + Math.sin(t * 3.5) * 0.5;
      antTip.scale.setScalar(1 + Math.sin(t * 3.5) * 0.06);

      // Screen breathing glow
      faceMat.emissiveIntensity = 0.38 + Math.sin(t * 1.8) * 0.12;

      // Ear ring pulse
      earMat.emissiveIntensity = 0.65 + Math.sin(t * 2.4 + 0.8) * 0.3;

      // Screen point light synced with glow
      goldGlow.intensity = 0.5 + Math.sin(t * 1.8) * 0.25;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafRef.current);
      [headGeo, bezelGeo, faceGeo, earRingGeo, hubGeo,
        antStemGeo, antTipGeo, chinGeo].forEach((g) => g.dispose());
      [headMat, bezelMat, faceMat, earMat, hubMat,
        antStemMat, antTipMat, chinMat].forEach((m) => m.dispose());
      faceTexOpen.dispose();
      faceTexWink.dispose();
      renderer.dispose();
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: "block", width: size, height: size }}
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
    />
  );
}
