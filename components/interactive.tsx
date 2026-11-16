"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Job } from "@/lib/company";

/** Number that counts up when it scrolls into view. */
export function Counter({ value, suffix = "", plain = false }: { value: number; suffix?: string; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(plain ? value : 0);
  useEffect(() => {
    if (plain) return;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { setShown(value); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [value, plain]);
  return <span ref={ref}>{shown}{suffix}</span>;
}

/** Careers vacancy list with department and plant filters. */
export function JobBoard({ jobs }: { jobs: Job[] }) {
  const [dept, setDept] = useState("All");
  const [plant, setPlant] = useState("All");
  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];
  const plants = ["All", ...Array.from(new Set(jobs.map((j) => j.plant)))];
  const today = new Date().toISOString().slice(0, 10);
  const open = jobs.filter((j) => j.lastDate >= today);
  const list = open.filter((j) => (dept === "All" || j.department === dept) && (plant === "All" || j.plant === plant));
  return (
    <div className="job-board">
      <div className="job-filters" role="group" aria-label="Filter vacancies">
        <div><span>Department</span><div className="chip-row">{departments.map((d) => <button key={d} type="button" className={d === dept ? "is-active" : ""} aria-pressed={d === dept} onClick={() => setDept(d)}>{d}</button>)}</div></div>
        <div><span>Plant location</span><div className="chip-row">{plants.map((p) => <button key={p} type="button" className={p === plant ? "is-active" : ""} aria-pressed={p === plant} onClick={() => setPlant(p)}>{p}</button>)}</div></div>
      </div>
      <p className="job-count" aria-live="polite">{list.length} {list.length === 1 ? "opening" : "openings"}</p>
      {list.length ? (
        <div className="job-list">
          {list.map((j) => (
            <Link key={j.slug} href={`/careers/${j.slug}`} className="job-row">
              <div>
                <span className="job-dept">{j.department}</span>
                <h3>{j.title}</h3>
                <p>{j.summary}</p>
              </div>
              <dl>
                <div><dt>Plant</dt><dd>{j.plant}</dd></div>
                <div><dt>Experience</dt><dd>{j.experience}</dd></div>
                <div><dt>Openings</dt><dd>{j.openings}</dd></div>
              </dl>
              <span className="job-go" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="job-empty"><h3>No openings match these filters.</h3><p>Try another department or plant — or send us your CV for future roles.</p><Link href="/careers/apply" className="button button-dark">Send your CV</Link></div>
      )}
    </div>
  );
}

/** Photo grid with a full-screen viewer. */
export function Gallery({ items }: { items: { src: string; caption: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open, items.length]);
  // Pick large/wide tiles so a 4-column grid always fills completely.
  const bigs = items.length >= 10 ? [0, 5] : [0];
  const rem = (items.length + bigs.length * 3) % 4;
  const wides = rem ? Array.from({ length: 4 - rem }, (_, k) => items.length - 1 - k * 2) : [];
  const tile = (i: number) => (bigs.includes(i) ? " gallery-big" : wides.includes(i) ? " gallery-wide" : "");
  return (
    <>
      <div className="gallery-grid">
        {items.map((item, i) => (
          <button key={item.src} type="button" className={`gallery-item${tile(i)}`} onClick={() => setOpen(i)} aria-label={`View photo: ${item.caption}`}>
            <img src={item.src} alt={item.caption} loading="lazy" />
            <span>{item.caption}</span>
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={items[open].caption} onClick={() => setOpen(null)}>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={items[open].src} alt={items[open].caption} />
            <figcaption><span>{String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>{items[open].caption}</figcaption>
          </figure>
          <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setOpen(null)}>×</button>
          <button type="button" className="lightbox-nav lightbox-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + items.length) % items.length); }}>‹</button>
          <button type="button" className="lightbox-nav lightbox-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % items.length); }}>›</button>
        </div>
      )}
    </>
  );
}

/** WhatsApp / LinkedIn share links for a vacancy. */
export function ShareJob({ title, path }: { title: string; path: string }) {
  const [url, setUrl] = useState(path);
  useEffect(() => setUrl(window.location.origin + path), [path]);
  const text = encodeURIComponent(`${title} — opening at Deep Auto Electricals: ${url}`);
  return (
    <div className="share-job">
      <span>Share this opening</span>
      <a href={`https://wa.me/?text=${text}`} target="_blank" rel="noreferrer">WhatsApp</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">LinkedIn</a>
    </div>
  );
}
