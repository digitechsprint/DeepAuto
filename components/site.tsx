"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/about", label: "About us", group: "Company" },
  { href: "/life-at-daepl", label: "CSR & life at DAEPL", group: "Company" },
  { href: "/products", label: "All products", group: "Solutions" },
  { href: "/products/wire-harnesses", label: "Wire harnesses", group: "Solutions" },
  { href: "/products/cables", label: "Cable manufacturing", group: "Solutions" },
  { href: "/products/terminals", label: "Automotive terminals", group: "Solutions" },
  { href: "/products/pvc-sleeves", label: "PVC sleeves", group: "Solutions" },
  { href: "/products/sheet-metal", label: "Sheet metal components", group: "Solutions" },
  { href: "/products/plastic-moulding", label: "Plastic moulded parts", group: "Solutions" },
  { href: "/infrastructure", label: "Infrastructure", group: "Capabilities" },
  { href: "/quality", label: "Quality & certifications", group: "Capabilities" },
  { href: "/customers", label: "Our customers", group: "Company" },
  { href: "/locations", label: "Plant locations", group: "Company" },
  { href: "/careers", label: "Careers", group: "Company" },
];

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/quality", label: "Quality" },
  { href: "/customers", label: "Customers" },
  { href: "/careers", label: "Careers" },
];

export function Mark({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand${light ? " brand-light" : ""}`}
      aria-label="Deep Auto Electricals home"
    >
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 42 42" fill="none">
          <path d="M7 29.5 16.8 9h8.4L16 29.5H7Z" fill="#188fc5" />
          <path d="M21 33 30.8 12.5h5.8L26.8 33H21Z" fill="#efb43e" />
          <path d="M7 33h11.4l2-4H9l-2 4Z" fill="#db4966" />
        </svg>
      </span>
      <span className="brand-copy">
        <strong>DEEP AUTO</strong>
        <span>ELECTRICALS</span>
      </span>
    </Link>
  );
}

export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "arrow-icon arrow-diagonal" : "arrow-icon"}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function SiteHeader() {
  const [panel, setPanel] = useState<"menu" | "search" | null>(null);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const matchingLinks = links.filter((link) =>
    link.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setPanel(null);
  }, [pathname]);

  useEffect(() => {
    if (!panel) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setPanel(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`site-header${panel ? " header-panel-open" : ""}${scrolled ? " is-scrolled" : ""}`}
    >
      <div className="container nav-row">
        <Mark />
        <nav className="primary-nav" aria-label="Primary">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "is-active" : undefined}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-controls">
          <button
            type="button"
            className={`search-toggle${panel === "search" ? " is-open" : ""}`}
            onClick={() => setPanel(panel === "search" ? null : "search")}
            aria-label={panel === "search" ? "Close search" : "Search the website"}
            aria-expanded={panel === "search"}
            aria-controls="header-search-panel"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
              <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </button>
          <button
            type="button"
            className={`menu-toggle${panel === "menu" ? " is-open" : ""}`}
            onClick={() => setPanel(panel === "menu" ? null : "menu")}
            aria-label={panel === "menu" ? "Close menu" : "Open menu"}
            aria-expanded={panel === "menu"}
            aria-controls="header-menu-panel"
          >
            <span />
            <span />
          </button>
          <Link href="/rfq" className="header-cta">
            Get a quote <ArrowIcon />
          </Link>
        </div>
      </div>
      {panel === "menu" && (
        <div className="header-panel menu-panel" id="header-menu-panel">
          <div className="container menu-panel-inner">
            <span className="eyebrow"><span className="eyebrow-dot" />EXPLORE DEEP AUTO</span>
            <div className="menu-panel-grid">
              {(["Company", "Solutions", "Capabilities"] as const).map((group) => (
                <div className="menu-group" key={group}>
                  <span>{group}</span>
                  {links.filter((link) => link.group === group).map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setPanel(null)}>
                      {link.label}<ArrowIcon />
                    </Link>
                  ))}
                </div>
              ))}
              <div className="menu-contact">
                <span>HAVE A PROJECT IN MIND?</span>
                <strong>Let’s make the<br />right connection.</strong>
                <Link href="/rfq" className="button button-dark" onClick={() => setPanel(null)}>
                  Start an enquiry <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {panel === "search" && (
        <div className="header-panel search-panel" id="header-search-panel">
          <div className="container search-panel-inner">
            <label htmlFor="site-search">What are you looking for?</label>
            <div className="search-field">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
                <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.8" />
              </svg>
              <input
                autoFocus
                id="site-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, capabilities, locations…"
              />
              {query && <button type="button" onClick={() => setQuery("")}>Clear</button>}
            </div>
            <div className="search-results" aria-live="polite">
              {matchingLinks.length ? matchingLinks.slice(0, 7).map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setPanel(null)}>
                  <span>{link.group}</span>{link.label}<ArrowIcon />
                </Link>
              )) : <p>No matching pages. Try a product or location.</p>}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Mark light />
          <p>Trust on quality.<br />Built for what moves next.</p>
        </div>
        <div className="footer-column">
          <span className="footer-label">Explore</span>
          <Link href="/about">About us</Link>
          <Link href="/products">Our products</Link>
          <Link href="/infrastructure">Infrastructure</Link>
          <Link href="/quality">Quality & certifications</Link>
          <Link href="/life-at-daepl">CSR & life at Deep Auto</Link>
        </div>
        <div className="footer-column">
          <span className="footer-label">Connect</span>
          <Link href="/locations">Plant locations</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact us</Link>
          <Link href="/rfq">Request a quote</Link>
        </div>
        <div className="footer-cta">
          <span className="footer-label">Have a component in mind?</span>
          <h3>Let&apos;s make it<br />move forward.</h3>
          <Link href="/rfq" className="button button-lime">Start an enquiry <ArrowIcon /></Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Deep Auto Electricals Pvt. Ltd.</span>
        <span>Made with purpose in India.</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="floating-actions">
      <Link href="/rfq" className="floating-rfq" aria-label="Request a quote">
        <span className="float-icon">↗</span>
        <span>Request a quote</span>
      </Link>
      <Link
        href="/contact"
        className="floating-chat"
        aria-label="Contact our team"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20 11.6a8 8 0 0 1-11.8 7l-4.2 1.1 1.1-4.1A8 8 0 1 1 20 11.6Z" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8.2 12h.1m3.7 0h.1m3.7 0h.1" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
        </svg>
      </Link>
    </div>
  );
}
