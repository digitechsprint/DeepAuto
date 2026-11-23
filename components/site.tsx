"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/lib/company";

const links = [
  { href: "/about", label: "About DAEPL", group: "Company" },
  { href: "/customers", label: "Our customers", group: "Company" },
  { href: "/locations", label: "Plant locations", group: "Company" },
  { href: "/life-at-daepl", label: "CSR & life at DAEPL", group: "Company" },
  { href: "/careers", label: "Careers", group: "Company" },
  { href: "/products", label: "All products", group: "Products" },
  { href: "/products/wire-harnesses", label: "Wire harnesses", group: "Products" },
  { href: "/products/terminals", label: "Electrical terminals", group: "Products" },
  { href: "/products/sheet-metal", label: "Sheet metal components", group: "Products" },
  { href: "/products/plastic-moulding", label: "Plastic moulded parts", group: "Products" },
  { href: "/how-we-work", label: "How we work (3D story)", group: "Capabilities" },
  { href: "/infrastructure", label: "Infrastructure & machines", group: "Capabilities" },
  { href: "/quality", label: "Quality & certifications", group: "Capabilities" },
  { href: "/rfq", label: "Request a quote", group: "Capabilities" },
  { href: "/contact", label: "Contact us", group: "Capabilities" },
];

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/infrastructure", label: "Infrastructure" },
  { href: "/quality", label: "Quality" },
  { href: "/customers", label: "Customers" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

/** Official DAEPL logo (vector, converted from the client’s CorelDRAW master in /public). */
export function Mark({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`brand${light ? " brand-light" : ""}`} aria-label="Deep Auto Electricals home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={light ? "/daepl-logo-white.svg" : "/daepl-logo.svg"} alt="DAEPL — Trust On Quality" width={116} height={100} className="brand-logo" />
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
    <>
    <div className="topbar"><div className="container topbar-inner"><strong className="topbar-name">Deep Auto Electricals Pvt. Ltd.</strong><span className="topbar-certs"><i className="topbar-dot" />IATF 16949:2016 &amp; ISO 9001:2015 Certified<b aria-hidden="true">·</b>Since 1998</span></div></div>
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
              {(["Company", "Products", "Capabilities"] as const).map((group) => (
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
                <span>TALK TO OUR TEAM</span>
                <strong>{company.phone}<br /><small>{company.email}</small></strong>
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
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Mark light />
          <p>{company.name} — {company.certifications} manufacturer of wire harnesses, electrical terminals, sheet metal and plastic moulded parts since {company.since}.</p>
        </div>
        <div className="footer-column">
          <span className="footer-label">Company</span>
          <Link href="/about">About DAEPL</Link>
          <Link href="/infrastructure">Infrastructure</Link>
          <Link href="/quality">Quality & certifications</Link>
          <Link href="/customers">Our customers</Link>
          <Link href="/life-at-daepl">CSR & life at DAEPL</Link>
          <Link href="/careers">Careers</Link>
        </div>
        <div className="footer-column">
          <span className="footer-label">Products</span>
          <Link href="/products/wire-harnesses">Wire harnesses</Link>
          <Link href="/products/terminals">Electrical terminals</Link>
          <Link href="/products/sheet-metal">Sheet metal components</Link>
          <Link href="/products/plastic-moulding">Plastic moulded parts</Link>
          <Link href="/rfq">Request a quote</Link>
        </div>
        <div className="footer-column footer-contact">
          <span className="footer-label">Head office</span>
          <address>{company.address.map((line) => <span key={line}>{line}</span>)}</address>
          <a href={company.landlineHref}>{company.landline}</a>
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {company.name} All rights reserved.</span>
        <span>{company.tagline} · Made in India</span>
        <div><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link></div>
      </div>
    </footer>
  );
}

/** WhatsApp, call and quote shortcuts — shown on every page. */
export function FloatingActions() {
  return (
    <div className="floating-actions">
      <Link href="/rfq" className="floating-rfq" aria-label="Request a quote">
        <span className="float-icon">↗</span>
        <span>Request a quote</span>
      </Link>
      <a href={company.phoneHref} className="floating-call" aria-label={`Call ${company.phone}`}>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h3.2l1.6 4-2 1.3a11 11 0 0 0 5 5l1.3-2 4 1.6V17a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
      </a>
      <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="floating-chat" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.36A9.93 9.93 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.09.81.83-3-.2-.31a8.22 8.22 0 1 1 6.95 3.83Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.73 6.73 0 0 1-3.37-2.94c-.25-.44.25-.41.73-1.36.08-.16.04-.31-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06 4.8 4.8 0 0 0 1 2.56 11 11 0 0 0 4.21 3.72c1.57.68 2.18.74 2.97.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" /></svg>
      </a>
    </div>
  );
}
