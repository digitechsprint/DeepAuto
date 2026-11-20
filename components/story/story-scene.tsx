"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Html, Lightformer, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";

export const MODEL_URL = "/models/daepl-story.glb";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => { const t = clamp01(x); return t * t * (3 - 2 * t); };
const seg = (t: number, a: number, b: number) => smooth((t - a) / (b - a));
type Std = THREE.MeshStandardMaterial;

/* ---------------------------------------------------------------- model */

function prepareMaterials(materials: Record<string, THREE.Material>) {
  for (const [name, mat] of Object.entries(materials)) {
    const m = mat as Std;
    if (!("emissive" in m)) continue;
    // Pure metals read black against the dark page; keep some diffuse response.
    if (m.metalness > 0.9 && name !== "chrome") { m.metalness = 0.7; m.roughness = Math.max(m.roughness, 0.3); }
    m.envMapIntensity = 1.3;
    if (name.startsWith("wire_")) { m.emissive = m.color.clone(); m.emissiveIntensity = 0; }
    else if (name.startsWith("led_")) { m.emissive = new THREE.Color("#3dff8a"); m.emissiveIntensity = 0; }
    else if (name === "bulb") { m.emissive = new THREE.Color("#ffe9b8"); m.emissiveIntensity = 0; }
    else if (name === "screen") { m.emissive = new THREE.Color("#2f8bff"); m.emissiveIntensity = 0.15; }
    else if (name === "lens") { m.transparent = true; m.opacity = 0.16; m.depthWrite = false; }
    else if (name === "chrome") m.envMapIntensity = 1.5;
  }
}

/** Loads the Blender GLB, clones it for this canvas and indexes every node by name with its authored position. */
function useStoryModel() {
  const gltf = useGLTF(MODEL_URL) as unknown as { scene: THREE.Group; materials: Record<string, THREE.Material> };
  const model = useMemo(() => {
    prepareMaterials(gltf.materials);
    const root = gltf.scene.clone(true);
    const node: Record<string, THREE.Object3D> = {};
    const base: Record<string, THREE.Vector3> = {};
    root.traverse((o) => { if (o.name && !node[o.name]) { node[o.name] = o; base[o.name] = o.position.clone(); } });
    // Tape and clips fade in during assembly — give them their own transparent materials.
    const fade: Std[] = [];
    for (const name of ["tape", "clips"]) {
      node[name]?.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        const m = (mesh.material as Std).clone();
        m.transparent = true;
        mesh.material = m;
        fade.push(m);
      });
    }
    return { root, node, base, fade, mats: gltf.materials as Record<string, Std> };
  }, [gltf]);
  return model;
}

const WIRES = ["red", "black", "orange", "yellow", "green", "blue", "white"];

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <hemisphereLight args={["#dbe8ff", "#0b1f3a", 1.1]} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} />
      <directionalLight position={[-5, 2, -4]} intensity={0.7} color="#9cc4ff" />
      <directionalLight position={[0, -4, 3]} intensity={0.25} color="#ffb98a" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={5} position={[0, 5, 4]} scale={[10, 4, 1]} />
        <Lightformer form="rect" intensity={2.5} position={[0, 1, 6]} scale={[10, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-6, 1, 2]} scale={[3, 6, 1]} color="#bcd6ff" />
        <Lightformer form="rect" intensity={1.5} position={[6, 1, -2]} scale={[3, 6, 1]} color="#ffd2ad" />
        <Lightformer form="circle" intensity={2} position={[0, -5, 0]} rotation-x={Math.PI / 2} scale={4} color="#0a6cf1" />
      </Environment>
    </>
  );
}

/** Soft additive glow texture, generated once in the browser. */
function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,244,214,1)");
  grad.addColorStop(0.35, "rgba(255,226,160,.45)");
  grad.addColorStop(1, "rgba(255,210,130,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const beamShader = {
  vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
  fragmentShader: "uniform float uOpacity; uniform vec3 uColor; varying vec2 vUv; void main(){ float a = pow(vUv.y, 2.2) * uOpacity; gl_FragColor = vec4(uColor * a, a); }",
};

/* ---------------------------------------------------------------- story (scroll-driven) */

export type StoryInput = { yaw: number; pitch: number; dragging: boolean };

// [camera position, look-at target] per chapter, three.js coords (Blender X, Z, -Y)
const POSES: [number, number, number][][] = [
  [[1.9, 2.4, 4.1], [0.2, -0.15, 0]],
  [[1.3, 1.0, 3.3], [0.05, 0.1, 0]],
  [[2.6, 1.9, -2.9], [0, 0, -0.3]],
  [[0, 1.0, 5.6], [0, 0, 0]],
  [[1.5, 1.5, 5.6], [0, 0, 0]],
  [[-2.7, 0.9, 2.9], [0, 0, -0.35]],
];
const GROUPS: [string, number, number][] = [["ch_strip", 0, 1], ["ch_crimp", 1, 2], ["ch_mould", 2, 3], ["ch_harness", 3, 5], ["ch_test", 4, 5], ["ch_lamp", 5, 6]];
const FADE = 0.16;

function StoryRig({ progress, input, onReady }: { progress: RefObject<number>; input: RefObject<StoryInput>; onReady?: () => void }) {
  const { root, node, base, fade, mats } = useStoryModel();
  const { camera, size } = useThree();
  const cur = useRef(progress.current ?? 0);
  const beam = useRef<THREE.Group>(null);
  const lampLight = useRef<THREE.PointLight>(null);
  const tmp = useMemo(() => ({ t0: new THREE.Vector3(), t1: new THREE.Vector3(), v: new THREE.Vector3(), s0: new THREE.Spherical(), s1: new THREE.Spherical() }), []);
  const glow = useMemo(() => new THREE.SpriteMaterial({ map: glowTexture(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0 }), []);
  const beamMat = useMemo(() => new THREE.ShaderMaterial({ ...beamShader, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, uniforms: { uOpacity: { value: 0 }, uColor: { value: new THREE.Color("#ffe3a6") } } }), []);

  useEffect(() => { onReady?.(); }, [onReady]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const target = progress.current ?? 0;
    cur.current += (target - cur.current) * Math.min(1, dt * 4.5);
    const p = cur.current;
    const time = state.clock.elapsedTime;
    const n = (k: string) => node[k];
    const b = (k: string) => base[k];
    const local = (k: number) => clamp01(p - k);

    for (const [name, a, z] of GROUPS) {
      const g = n(name);
      if (!g) continue;
      const pr = (a === 0 ? 1 : smooth((p - a) / FADE)) * (z === 6 ? 1 : 1 - smooth((p - (z - FADE)) / FADE));
      g.visible = pr > 0.002;
      g.scale.setScalar(0.6 + 0.4 * pr);
      g.rotation.y = (1 - pr) * (p < a + 0.5 ? -0.8 : 0.8);
    }

    // 01 progressive die: strip steps forward one pitch per press stroke, coil unwinds
    {
      const c = (time * 0.55) % 1;
      const press = c < 0.22 ? smooth(c / 0.22) : c < 0.42 ? 1 - smooth((c - 0.22) / 0.2) : 0;
      n("die_top").position.y = b("die_top").y - 0.07 * press;
      n("strip_feed").position.x = b("strip_feed").x + 0.22 * (c > 0.5 ? smooth((c - 0.5) / 0.5) : 0);
      n("coil").rotation.z = time * 0.35;
    }
    // 02 crimp: wire slides in, ram strikes, wings close
    {
      const t = local(1);
      n("wire").position.x = b("wire").x - 1.3 * (1 - seg(t, 0.04, 0.34));
      const up = t < 0.4 ? 1 : t < 0.5 ? 1 - seg(t, 0.4, 0.5) : t < 0.6 ? 0 : seg(t, 0.6, 0.8);
      n("ram").position.y = b("ram").y + 0.5 * up;
      const closed = t >= 0.49;
      n("wings_open").visible = !closed;
      n("wings_closed").visible = closed;
    }
    // 03 moulding: mould opens, terminals are pushed into the housing
    {
      const t = local(2);
      const open = seg(t, 0.1, 0.36);
      n("mould_a").position.x = b("mould_a").x - 0.7 * open;
      n("mould_b").position.x = b("mould_b").x + 0.7 * open;
      n("housing").position.y = b("housing").y + 0.06 * Math.sin(seg(t, 0.3, 0.5) * Math.PI);
      n("pins").position.z = b("pins").z - 0.95 * (1 - seg(t, 0.48, 0.82));
    }
    // 04 assembly: wires converge, connectors arrive, tape & clips appear
    {
      const t = p >= 4 ? 1 : local(3);
      const asm = seg(t, 0.04, 0.58);
      WIRES.forEach((w, i) => {
        const o = n("w_" + w);
        if (o) o.position.y = b("w_" + w).y + (i - 3) * 0.3 * (1 - asm);
      });
      const out = 1 - asm;
      n("conn_main").position.x = b("conn_main").x - 0.7 * out;
      n("conn_meter").position.x = b("conn_meter").x + 0.7 * out;
      n("conn_lamp").position.y = b("conn_lamp").y + 0.6 * out;
      n("conn_winker").position.y = b("conn_winker").y - 0.6 * out;
      const tf = seg(t, 0.5, 0.72);
      fade.forEach((m) => { m.opacity = tf; m.depthWrite = tf > 0.98; });
      n("tape").visible = n("clips").visible = tf > 0.01;
    }
    // 05 testing: board slides in behind, each circuit lights in turn, LEDs latch green
    {
      const t = local(4);
      const testing = p >= 3.9;
      n("ch_test").position.z = b("ch_test").z - 1.4 * (1 - seg(t, 0, 0.25));
      const slot = 0.6 / WIRES.length;
      WIRES.forEach((w, i) => {
        const m = mats["wire_" + w];
        if (!m) return;
        const x = (t - 0.25 - i * slot) / slot;
        m.emissiveIntensity = testing && x > 0 && x < 1.6 ? Math.sin(Math.min(1, x / 1.6) * Math.PI) * 1.6 : 0;
      });
      for (let i = 0; i < 6; i++) {
        const m = mats["led_" + i];
        if (m) m.emissiveIntensity = testing && t > 0.25 + ((i + 1) * 0.6) / 6 ? 3.2 : 0.05;
      }
      if (mats.screen) mats.screen.emissiveIntensity = 0.15 + 1.4 * seg(t, 0.86, 0.96);
    }
    // 06 headlamp: plug goes home, bulb lights, beam fades up
    {
      const t = local(5);
      n("lamp_plug").position.z = b("lamp_plug").z - 0.9 * (1 - seg(t, 0.04, 0.38));
      const on = p >= 5 ? seg(t, 0.44, 0.62) : 0;
      const flicker = on > 0 && on < 1 ? 0.75 + 0.25 * Math.sin(time * 60) : 1;
      if (mats.bulb) mats.bulb.emissiveIntensity = on * 7 * flicker;
      const lamp = n("ch_lamp");
      if (beam.current) {
        beam.current.visible = lamp.visible && on > 0.001;
        beam.current.scale.copy(lamp.scale);
        beam.current.rotation.copy(lamp.rotation);
      }
      beamMat.uniforms.uOpacity.value = on * 0.32 * flicker;
      glow.opacity = on * 0.95 * flicker;
      if (lampLight.current) lampLight.current.intensity = on * 6;
    }

    // camera: hold a pose through each chapter, glide (spherically) across chapter boundaries
    const k = Math.round(p);
    const d = p - k;
    let q = Math.abs(d) < 0.24 ? k - 1 + smooth((d + 0.24) / 0.48) : Math.floor(p);
    q = Math.min(5, Math.max(0, q));
    const i0 = Math.floor(q), i1 = Math.min(5, i0 + 1), f = q - i0;
    const { t0, t1, v, s0, s1 } = tmp;
    t0.fromArray(POSES[i0][1]);
    t1.fromArray(POSES[i1][1]);
    s0.setFromVector3(v.fromArray(POSES[i0][0]).sub(t0));
    s1.setFromVector3(v.fromArray(POSES[i1][0]).sub(t1));
    let dTheta = s1.theta - s0.theta;
    if (dTheta > Math.PI) dTheta -= Math.PI * 2;
    if (dTheta < -Math.PI) dTheta += Math.PI * 2;
    const inp = input.current;
    if (inp && !inp.dragging) { inp.yaw *= Math.exp(-dt * 1.2); inp.pitch *= Math.exp(-dt * 1.2); }
    const aspect = size.width / Math.max(1, size.height);
    const fit = Math.max(1, 1.2 / aspect);
    const radius = (s0.radius + (s1.radius - s0.radius) * f) * fit;
    const phi = Math.min(2.6, Math.max(0.35, s0.phi + (s1.phi - s0.phi) * f - (inp?.pitch ?? 0)));
    const theta = s0.theta + dTheta * f + (inp?.yaw ?? 0) + Math.sin(time * 0.25) * 0.04;
    t0.lerp(t1, f);
    v.setFromSphericalCoords(radius, phi, theta).add(t0);
    camera.position.copy(v);
    camera.lookAt(t0);
  });

  return (
    <>
      <primitive object={root} />
      <group ref={beam} visible={false}>
        <mesh position={[0, 0, 0.2 + 2.2]} rotation-x={-Math.PI / 2} material={beamMat}>
          <coneGeometry args={[1.5, 4.4, 48, 1, true]} />
        </mesh>
        <sprite material={glow} position={[0, 0, 0.25]} scale={[2.4, 2.4, 1]} />
        <pointLight ref={lampLight} position={[0, 0, 1.2]} intensity={0} distance={6} color="#ffe3a6" />
      </group>
    </>
  );
}

export function StoryCanvas({ progress, input, running, onReady }: { progress: RefObject<number>; input: RefObject<StoryInput>; running: boolean; onReady?: () => void }) {
  return (
    <Canvas frameloop={running ? "always" : "never"} dpr={[1, 1.75]} camera={{ fov: 30, near: 0.1, far: 60, position: [2, 2, 5] }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <Lights />
      <Suspense fallback={null}>
        <StoryRig progress={progress} input={input} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}

/* ---------------------------------------------------------------- interactive harness (home page) */

export type Hotspot = { node: string; title: string; text: string; pos: [number, number, number] };

function HarnessRig({ hotspots, active, onSelect, testStart, onReady }: { hotspots: Hotspot[]; active: number | null; onSelect: (i: number | null) => void; testStart: number; onReady?: () => void }) {
  const { root, node, base, fade, mats } = useStoryModel();
  const group = useRef<THREE.Group>(null);
  const { size, camera } = useThree();

  useEffect(() => {
    for (const k of ["ch_strip", "ch_crimp", "ch_mould", "ch_test", "ch_lamp"]) if (node[k]) node[k].visible = false;
    const h = node.ch_harness;
    h.visible = true;
    h.scale.setScalar(1);
    h.rotation.set(0, 0, 0);
    for (const [k, v] of Object.entries(base)) if (k.startsWith("w_") || k.startsWith("conn_")) node[k].position.copy(v);
    node.tape.visible = node.clips.visible = true;
    fade.forEach((m) => { m.opacity = 1; m.depthWrite = true; });
    onReady?.();
  }, [node, base, fade, onReady]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    if (group.current) {
      const targetY = active === null ? Math.sin(time * 0.35) * 0.3 : 0;
      group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, dt * 2);
    }
    const aspect = size.width / Math.max(1, size.height);
    (camera as THREE.PerspectiveCamera).zoom = Math.min(1, aspect / 1.15);
    camera.updateProjectionMatrix();
    // "Run circuit test": wires light in sequence over ~2.4 s
    const t = testStart ? (performance.now() - testStart) / 2400 : -1;
    const slot = 0.8 / WIRES.length;
    WIRES.forEach((w, i) => {
      const m = mats["wire_" + w];
      if (!m) return;
      const x = (t - i * slot) / (slot * 1.8);
      const done = t > 1 && t < 1.5 ? 0.6 * (1 - (t - 1) / 0.5) : 0;
      m.emissiveIntensity = x > 0 && x < 1 ? Math.sin(x * Math.PI) * 1.8 : done;
    });
  });

  return (
    <group ref={group}>
      <primitive object={root} />
      {hotspots.map((h, i) => (
        <Html key={h.node} position={h.pos} center zIndexRange={[5, 0]}>
          <button type="button" className={`hotspot${active === i ? " is-active" : ""}`} aria-label={h.title} aria-pressed={active === i} onClick={() => onSelect(active === i ? null : i)}>
            <span>{i + 1}</span>
          </button>
        </Html>
      ))}
    </group>
  );
}

export function HarnessCanvas(props: { hotspots: Hotspot[]; active: number | null; onSelect: (i: number | null) => void; testStart: number; running: boolean; onReady?: () => void }) {
  const { running, ...rest } = props;
  return (
    <Canvas frameloop={running ? "always" : "never"} dpr={[1, 1.75]} camera={{ fov: 30, near: 0.1, far: 60, position: [0, 0.9, 6.2] }} gl={{ antialias: true, alpha: true }}>
      <Lights />
      <Suspense fallback={null}>
        <HarnessRig {...rest} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0.9} maxPolarAngle={2.1} minAzimuthAngle={-1.1} maxAzimuthAngle={1.1} rotateSpeed={0.6} />
    </Canvas>
  );
}

export function preloadStoryModel() {
  useGLTF.preload(MODEL_URL);
}
