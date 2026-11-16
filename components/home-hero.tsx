"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowIcon } from "@/components/site";
import { AnimatedHeadline } from "@/components/scroll-reveal";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2200&q=85",
    eyebrow: "AUTOMOTIVE COMPONENTS · SINCE 1998",
    heading: [{ text: "Precision in" }, { text: "every connection.", accent: true }],
    description: "Wire harnesses, electrical terminals, sheet metal and moulded parts for India’s leading automotive brands — made with care since November 1998.",
  },
  {
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2200&q=85",
    eyebrow: "ENGINEERED AROUND YOUR APPLICATION",
    heading: [{ text: "Made to fit." }, { text: "Made to move.", accent: true }],
    description: "From head lamp to ADAS harnesses, every part is built to your drawing — with tooling, moulding and testing under one roof.",
  },
  {
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=2200&q=85",
    eyebrow: "BUILT ON EXPERIENCE · BUILT TOGETHER",
    heading: [{ text: "A legacy of care." }, { text: "Ready for what’s next.", accent: true }],
    description: "More than 25 years of automotive manufacturing across Samaypur and Bawana, with a new unit planned at IMT Manesar.",
  },
  {
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=2200&q=85",
    eyebrow: "QUALITY IN EVERY STEP",
    heading: [{ text: "Details that matter." }, { text: "Quality that lasts.", accent: true }],
    description: "IATF 16949:2016 and ISO 9001:2015 certified systems, backed by our own laboratory. Trust On Quality.",
  },
];

export function HomeHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const slide = slides[active];
  return (
    <section className="hero">
      {slides.map((item, index) => (
        <div
          key={item.eyebrow}
          className={`hero-photo${active === index ? " hero-photo-active" : ""}`}
          style={{ backgroundImage: `url("${item.image}")` }}
          aria-hidden="true"
        />
      ))}
      <div className="hero-scrim" />
      <div className="hero-grid-pattern" />
      <div className="container hero-content" key={slide.eyebrow}>
        <div className="hero-kicker"><span className="kicker-line" />{slide.eyebrow}</div>
        <AnimatedHeadline lines={slide.heading} />
        <p>{slide.description}</p>
        <div className="hero-actions">
          <Link href="/products" className="button button-lime">Discover what we make <ArrowIcon /></Link>
          <Link href="/about" className="button button-outline-light">Get to know us <ArrowIcon /></Link>
        </div>
        <div className="hero-bottom">
          <div className="hero-scroll"><span className="scroll-track" />SCROLL TO EXPLORE</div>
          <div className="hero-trust"><span>IATF 16949</span><span className="trust-divider" /><span>ISO 9001</span><span className="trust-divider" /><span>Since 1998</span></div>
        </div>
      </div>
      <div className="hero-index">
        <span>{String(active + 1).padStart(2, "0")}</span>
        <span className="index-rule" />
        <span>{String(slides.length).padStart(2, "0")}</span>
        <div className="hero-pagination" aria-label="Hero slides">
          {slides.map((item, index) => (
            <button
              key={item.eyebrow}
              type="button"
              className={index === active ? "is-active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show slide ${index + 1}: ${item.eyebrow}`}
              aria-current={index === active ? "true" : undefined}
            />
          ))}
        </div>
      </div>
      <div className="hero-orbit"><span className="orbit-core" /><span className="orbit-ring orbit-ring-one" /><span className="orbit-ring orbit-ring-two" /><span className="orbit-label">DAEPL / 1998</span></div>
    </section>
  );
}
