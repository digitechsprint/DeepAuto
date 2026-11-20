"use client";

/* eslint-disable @next/next/no-img-element */
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { harnessHotspots, storyChapters } from "@/lib/story";
import type { StoryInput } from "./story-scene";

const StoryCanvas = dynamic(() => import("./story-scene").then((m) => m.StoryCanvas), { ssr: false });
const HarnessCanvas = dynamic(() => import("./story-scene").then((m) => m.HarnessCanvas), { ssr: false });

function canUse3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Runs the render loop only while the element is near the viewport. */
function useNearViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setNear(e.isIntersecting), { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, near] as const;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ---------------------------------------------------------------- full scroll story */

export function StoryScroller() {
  const [section, near] = useNearViewport<HTMLElement>();
  const steps = useRef<(HTMLElement | null)[]>([]);
  const bar = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);
  const input = useRef<StoryInput>({ yaw: 0, pitch: 0, dragging: false });
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const total = storyChapters.length;

  useEffect(() => setMode(canUse3D() ? "3d" : "static"), []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const anchor = window.innerHeight * (window.innerWidth < 900 ? 0.8 : 0.55);
      let p = 0;
      steps.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= anchor) p = i + Math.min(1, (anchor - r.top) / r.height);
      });
      p = Math.min(p, total - 0.001);
      progress.current = p;
      if (bar.current) bar.current.style.transform = `scaleX(${p / total})`;
      setActive(Math.floor(p));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [total]);

  const goTo = (i: number) => {
    const el = steps.current[i];
    if (!el) return;
    const anchor = window.innerHeight * (window.innerWidth < 900 ? 0.8 : 0.55);
    const top = el.getBoundingClientRect().top + window.scrollY - anchor + el.offsetHeight * 0.62;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const pointer = {
    onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => { drag.current = { x: e.clientX, y: e.clientY }; input.current.dragging = true; },
    onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
      if (!drag.current) return;
      const inp = input.current;
      inp.yaw = Math.max(-1.5, Math.min(1.5, inp.yaw - (e.clientX - drag.current.x) * 0.008));
      inp.pitch = Math.max(-0.4, Math.min(0.4, inp.pitch - (e.clientY - drag.current.y) * 0.004));
      drag.current = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: () => { drag.current = null; input.current.dragging = false; },
    onPointerLeave: () => { drag.current = null; input.current.dragging = false; },
    onPointerCancel: () => { drag.current = null; input.current.dragging = false; },
  };

  return (
    <section className="story" id="story" ref={section} aria-label="How Deep Auto works, step by step">
      <div className="story-stage">
        <div className={`story-viewport${mode === "3d" ? " is-3d" : ""}`} {...(mode === "3d" ? pointer : {})}>
          <div className={`story-posters${mode === "3d" && ready ? " is-hidden" : ""}`}>
            {storyChapters.map((c, i) => <img key={c.key} src={c.poster} alt={mode === "static" && i === active ? `3D render: ${c.step}` : ""} className={i === active ? "is-active" : ""} loading={i === 0 ? "eager" : "lazy"} />)}
          </div>
          {mode === "3d" && <div className={`story-canvas${ready ? " is-ready" : ""}`}><StoryCanvas progress={progress} input={input} running={near} onReady={onReady} /></div>}
          <div className="story-hud" aria-live="polite">
            <span className="story-count"><strong>{pad(active + 1)}</strong> / {pad(total)}</span>
            <span className="story-step-name">{storyChapters[active].step}</span>
          </div>
          {mode === "3d" && <span className="story-hint" aria-hidden="true"><span className="story-hint-icon">⟷</span>Drag to look around</span>}
          <div className="story-bar" aria-hidden="true"><span ref={bar} /></div>
        </div>
        <nav className="story-rail" aria-label="Story chapters">
          {storyChapters.map((c, i) => (
            <button key={c.key} type="button" className={i === active ? "is-active" : i < active ? "is-done" : ""} onClick={() => goTo(i)} aria-current={i === active ? "step" : undefined}>
              <span className="story-rail-dot" /><span className="story-rail-label">{c.step}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="story-steps">
        {storyChapters.map((c, i) => (
          <article key={c.key} ref={(el) => { steps.current[i] = el; }} className={`story-step${i === active ? " is-active" : ""}`}>
            <div className="story-card">
              <span className="story-index"><b>{pad(i + 1)}</b>{c.step}</span>
              <h2>{c.title}</h2>
              <p className="story-lead">{c.lead}</p>
              <p>{c.body}</p>
              <dl className="story-facts">{c.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl>
              <Link href={c.link.href} className="story-link">{c.link.label} <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- home page: explore a harness */

export function HarnessExplorer() {
  const [wrap, near] = useNearViewport<HTMLDivElement>();
  const [mode, setMode] = useState<"pending" | "3d" | "static">("pending");
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<number | null>(0);
  const [testStart, setTestStart] = useState(0);
  const [testState, setTestState] = useState<"idle" | "running" | "pass">("idle");
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => setMode(canUse3D() ? "3d" : "static"), []);

  const runTest = () => {
    setTestStart(performance.now());
    setTestState("running");
    window.setTimeout(() => setTestState("pass"), 2500);
  };
  const spot = active === null ? null : harnessHotspots[active];

  return (
    <div className="harness-explorer" ref={wrap}>
      <div className="harness-stage">
        {(mode !== "3d" || !ready) && <img className="harness-poster" src="/images/story/harness.webp" alt={mode === "static" ? "3D render of a DAEPL wire harness" : ""} />}
        {mode === "3d" && <div className={`harness-canvas${ready ? " is-ready" : ""}`}><HarnessCanvas hotspots={harnessHotspots} active={active} onSelect={setActive} testStart={testStart} running={near} onReady={onReady} /></div>}
        {mode === "3d" && <span className="story-hint harness-hint" aria-hidden="true"><span className="story-hint-icon">⟷</span>Drag to rotate · tap a number</span>}
      </div>
      <div className="harness-panel">
        <ol className="harness-list">
          {harnessHotspots.map((h, i) => (
            <li key={h.node}>
              <button type="button" className={active === i ? "is-active" : ""} aria-expanded={active === i} onClick={() => setActive(active === i ? null : i)}>
                <span className="harness-num">{i + 1}</span>{h.title}
              </button>
            </li>
          ))}
        </ol>
        <div className="harness-detail" aria-live="polite">
          {spot ? <><strong>{spot.title}</strong><p>{spot.text}</p></> : <p>Select a point on the harness to see how it&apos;s made.</p>}
        </div>
        <div className="harness-actions">
          <button type="button" className={`test-button is-${testState}`} onClick={runTest} disabled={testState === "running" || mode !== "3d"}>
            <span className="test-led" />
            {testState === "running" ? "Testing circuits…" : testState === "pass" ? "All circuits OK — run again" : "Run circuit test"}
          </button>
          <Link href="/how-we-work" className="button button-lime">See how it&apos;s made <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </div>
  );
}
