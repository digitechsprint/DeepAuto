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
    text: "Purpose-built harness assemblies for lighting, instrumentation and ADAS — made to your drawing and electrically tested before dispatch.",
    href: "/products/wire-harnesses",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=2000&q=80",
    color: "#188fc5",
    ink: "#0f6f9c",
  },
  {
    title: "Manufacturing",
    text: "44 crimping machines, an in-house tool room and injection moulding from 35 to 180 tonnes — people, processes and machines working as one.",
    href: "/infrastructure",
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=2000&q=80",
    color: "#efa21e",
    ink: "#b06f00",
  },
  {
    title: "Quality",
    text: "IATF 16949 and ISO 9001 certified systems, with internal lab checks at every stage. Trust On Quality is how we work, not a slogan.",
    href: "/quality",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=2000&q=80",
    color: "#2f9e6b",
    ink: "#1f7a50",
  },
  {
    title: "People & CSR",
    text: "Women empowerment, skill development and a shared commitment to the communities around our plants in Delhi and Haryana.",
    href: "/life-at-daepl",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2000&q=80",
    color: "#db4966",
    ink: "#b02c4a",
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
    <section className="stack-section" aria-label="What drives Deep Auto">
      {cards.map((card, i) => (
        <article
          key={card.title}
          className="stack-card"
          style={{ "--card": card.color, "--card-ink": card.ink, zIndex: i + 1 } as React.CSSProperties}
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
