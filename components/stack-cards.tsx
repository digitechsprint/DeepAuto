import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";

type StackCard = {
  title: string;
  text: string;
  href: string;
  image: string;
  color: string;
  ink: string;
};

const cards: StackCard[] = [
  {
    title: "Wire Harnesses",
    text: "Head lamp, tail lamp, winker, meter and ADAS assembly harnesses — cut, crimped, sealed and tested on our own lines.",
    href: "/products/wire-harnesses",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=2000&q=80",
    color: "#0A6CF1",
    ink: "#0857c4",
  },
  {
    title: "Manufacturing",
    text: "100+ machines across wire processing, crimping, pressing, welding, moulding and an in-house tool room.",
    href: "/infrastructure",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=2000&q=80",
    color: "#F37A30",
    ink: "#b5531a",
  },
  {
    title: "Quality",
    text: "IATF 16949:2016 and ISO 9001:2015 certified, with an internal laboratory checking every stage. Trust On Quality.",
    href: "/quality",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=2000&q=80",
    color: "#00A651",
    ink: "#007a3c",
  },
  {
    title: "People & CSR",
    text: "Women empowerment on our shop floor, Dojo training for every team member and a safe, healthy workplace.",
    href: "/life-at-daepl",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80",
    color: "#E52E36",
    ink: "#b01e25",
  },
];

/** Three stacked chevron layers; drawn in a 1600×900 box, anchored left and scaled to cover. */
function Chevrons() {
  const chevron = (x: number) => `M0 0H${x}L${x + 420} 420Q${x + 450} 450 ${x + 420} 480L${x} 900H0Z`;
  return (
    <svg className="stack-chevrons" viewBox="0 0 1600 900" preserveAspectRatio="xMinYMid slice" aria-hidden="true">
      <path d={chevron(620)} opacity=".28" />
      <path d={chevron(490)} opacity=".5" />
      <path d={chevron(360)} />
    </svg>
  );
}

export function StackCards() {
  return (
    <section className="stack-section" aria-label="What drives DAEPL">
      {cards.map((card, i) => (
        <article
          key={card.title}
          className="stack-card"
          style={{ "--card": `var(--card-${i + 1}, ${card.color})`, "--card-ink": `var(--card-ink-${i + 1}, ${card.ink})`, zIndex: i + 1 } as React.CSSProperties}
        >
          <div className="stack-media" style={{ backgroundImage: `url("${card.image}")` }} role="img" aria-label={card.title} />
          <Chevrons />
          <div className="stack-content">
            <ScrollReveal>
              <h2 className="stack-title">
                {card.title}
                <svg className="stack-arrow" viewBox="0 0 40 60" aria-hidden="true">
                  <path d="M4 0h16l20 30-20 30H4l20-30z" fill="currentColor" />
                </svg>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={120}>
              <p className="stack-text">{card.text}</p>
            </ScrollReveal>
            <ScrollReveal delay={220}>
              <Link href={card.href} className="stack-btn">Explore</Link>
            </ScrollReveal>
          </div>
        </article>
      ))}
    </section>
  );
}
