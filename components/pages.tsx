/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowIcon } from "@/components/site";
import { EnquiryForm } from "@/components/forms";
import { HomeHero } from "@/components/home-hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StackCards } from "@/components/stack-cards";
import { Counter, Gallery, JobBoard, ShareJob } from "@/components/interactive";
import { HarnessExplorer, StoryScroller } from "@/components/story/story-sections";
import {
  allProducts, categories, certBody, certificates, certScope, company, contacts, directCustomers, facilities, img, jobs, labEquipment,
  leadership, machineGroups, milestones, oemBrands, plants, qualityAspects, qualityPolicy, roadmap, stats, strengths, vision,
  type Category,
} from "@/lib/company";

/* ---------------------------------------------------------------- helpers */

function ImagePanel({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <div className={`image-panel ${className}`} role="img" aria-label={alt} style={{ backgroundImage: `url("${src}")` }}><span className="image-shade" /></div>;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow${light ? " eyebrow-light" : ""}`}><span className="eyebrow-dot" />{children}</span>;
}

export function PageHero({ eyebrow, title, lead, image, compact = false, crumbs }: { eyebrow: string; title: React.ReactNode; lead: string; image?: string; compact?: boolean; crumbs?: { href?: string; label: string }[] }) {
  const trail = crumbs ?? [{ label: eyebrow.split("·")[0].trim() }];
  return (
    <section className={`page-hero${compact ? " page-hero-compact" : ""}`} style={image ? { backgroundImage: `linear-gradient(90deg,rgba(6,21,43,.94) 0%,rgba(6,21,43,.78) 50%,rgba(6,21,43,.35) 100%),url("${image}")` } : undefined}>
      <div className="container page-hero-inner">
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{lead}</p>
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {trail.map((c) => <span key={c.label} className="crumb"><span aria-hidden="true">/</span>{c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</span>)}
        </nav>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, text, centered = false, light = false }: { eyebrow: string; title: React.ReactNode; text?: string; centered?: boolean; light?: boolean }) {
  return <div className={`section-title${centered ? " section-title-center" : ""}${light ? " section-title-light" : ""}`}><Eyebrow light={light}>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function CtaBand({ title, text, href = "/rfq", label = "Request a quote" }: { title: React.ReactNode; text: string; href?: string; label?: string }) {
  return (
    <section className="cta-band">
      <div className="container cta-band-inner">
        <div><Eyebrow light>LET&apos;S WORK TOGETHER</Eyebrow><h2>{title}</h2><p>{text}</p></div>
        <div className="cta-band-actions">
          <Link href={href} className="button button-lime">{label} <ArrowIcon /></Link>
          <a href={company.whatsappHref} target="_blank" rel="noreferrer" className="button button-outline-light">WhatsApp our team <ArrowIcon /></a>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link className="category-feature" href={`/products/${category.slug}`}>
      <div className="category-feature-image category-feature-photo" role="img" aria-label={category.name} style={{ backgroundImage: `url("${category.image}")` }} />
      <span className="category-feature-index">{category.number}</span>
      <div className="category-feature-copy">
        <span className="category-tagline">{category.tagline}</span>
        <h3>{category.name}</h3>
        <p>{category.summary}</p>
        <span className="category-meta">{category.products.length} product {category.products.length === 1 ? "family" : "types"} · {category.plant}</span>
        <span className="text-button">Explore category <ArrowIcon /></span>
      </div>
    </Link>
  );
}

function ProductTile({ product, category, index }: { product: Category["products"][number]; category: Category; index: number }) {
  return (
    <Link className="product-tile" href={`/products/${category.slug}/${product.slug}`}>
      <div className="product-tile-image product-tile-photo" style={{ backgroundImage: `url("${product.image}")` }}><span>{String(index + 1).padStart(2, "0")}</span><span className="product-tile-arrow"><ArrowIcon diagonal /></span></div>
      <div className="product-tile-copy"><span className="eyebrow">{category.name.toUpperCase()}</span><h3>{product.name}</h3><p>{product.application}</p><span className="text-button">View product <ArrowIcon /></span></div>
    </Link>
  );
}

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className={`marquee${reverse ? " marquee-reverse" : ""}`}>
      <div className="marquee-track">
        {[0, 1].map((n) => <div className="marquee-set" key={n} aria-hidden={n === 1}>{items.map((item) => <span key={item}>{item}</span>)}</div>)}
      </div>
    </div>
  );
}

const initials = (name: string) => name.replace(/^Mr\.?\s*/, "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2);

/* ---------------------------------------------------------------- how we work (3D story) */

export function HowWeWorkPage() {
  return (
    <>
      <PageHero eyebrow="HOW DEEP AUTO WORKS" title={<>From a coil of brass<br />to a light on the <span>road.</span></>} lead="Follow one wire harness through our plants: tool room, power presses, crimping, moulding, assembly and testing, all under one roof. Scroll to begin, and drag the model to look around." crumbs={[{ label: "How we work" }]} image={img.shopFloor} />
      <StoryScroller />
      <CtaBand title={<>Have a drawing?<br />We&apos;ll tool it, build it and test it.</>} text="Share your drawing, part number and quantity. Our team responds within one working day." />
    </>
  );
}

/* ---------------------------------------------------------------- home */

export function HomePage() {
  return (
    <div className="home-page">
      <HomeHero />

      <section className="intro-section section-space">
        <div className="container intro-grid">
          <ScrollReveal className="intro-aside"><Eyebrow>WELCOME TO DAEPL</Eyebrow><span className="intro-aside-note">Established<br />November 1998</span></ScrollReveal>
          <ScrollReveal className="intro-copy" delay={100}>
            <h2>Trust on quality,<br />since <span>1998.</span></h2>
            <p>Deep Auto Electricals Pvt. Ltd. is one of the leading professional automotive parts manufacturers in Delhi NCR. We make electrical wiring harnesses, electrical terminals in chain and loose, sheet metal and moulded components — serving the automobile, general engineering and electrical &amp; electronics industries with consistency in quality, cost and delivery.</p>
            <Link href="/about" className="text-button">Discover our story <ArrowIcon /></Link>
          </ScrollReveal>
          <ScrollReveal className="intro-visual" delay={180} direction="right"><ImagePanel src={img.shopFloor} alt="Wire harness assembly line at DAEPL" className="intro-image" /><span className="image-tag"><span className="tag-dot" />SAMAYPUR · DELHI</span><div className="image-years"><strong>25<span>+</span></strong><span>years of<br />manufacturing</span></div></ScrollReveal>
        </div>
      </section>

      <section className="metrics-strip"><div className="container metrics-grid">
        {stats.map((s, i) => <ScrollReveal className="metric-item" key={s.label} delay={i * 80}><strong><Counter value={s.value} suffix={s.suffix} plain={s.plain} /></strong><span>{s.label}</span></ScrollReveal>)}
      </div></section>

      <section className="products-section section-space">
        <div className="container">
          <ScrollReveal className="section-heading heading-split"><div><Eyebrow>WHAT WE MAKE</Eyebrow><h2>Four product lines.<br /><span>One standard of quality.</span></h2></div><div className="heading-side"><p>Every product is manufactured to customer drawing, with tooling, moulding and testing under our own roof.</p><Link href="/products" className="text-button">Explore all products <ArrowIcon /></Link></div></ScrollReveal>
          <div className="product-card-grid product-card-grid-4">
            {categories.map((c, i) => (
              <ScrollReveal key={c.slug} delay={i * 70}>
                <Link className="product-card" href={`/products/${c.slug}`}>
                  <div className="product-card-image product-card-photo" style={{ backgroundImage: `url("${c.image}")` }}><span className="product-number">{c.number}</span><span className="product-open"><ArrowIcon diagonal /></span></div>
                  <div className="product-card-copy"><div><h3>{c.name}</h3><p>{c.tagline}</p></div><span className="product-link-icon"><ArrowIcon /></span></div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="explore-section section-space">
        <div className="container">
          <ScrollReveal className="section-heading heading-split"><div><Eyebrow light>INSIDE A DAEPL HARNESS</Eyebrow><h2>Take a harness apart.<br /><span>See how it&apos;s made.</span></h2></div><div className="heading-side"><p>A 3D model of a typical two-wheeler wire harness, built in Blender. Rotate it, tap the numbered points and run the circuit test, then follow the full journey from brass coil to headlamp.</p><Link href="/how-we-work" className="text-button">Scroll the full story <ArrowIcon /></Link></div></ScrollReveal>
          <HarnessExplorer />
        </div>
      </section>

      <StackCards />

      <section className="industries-section section-space">
        <div className="container">
          <SectionTitle eyebrow="INDUSTRIES WE SERVE" title={<>Connections that power<br /><span>three industries.</span></>} centered />
          <div className="industries-grid">
            {[
              ["Automobile", "Lighting, instrumentation and ADAS harnesses, terminals and components for two-wheeler, passenger and commercial vehicle programmes."],
              ["General Engineering", "Precision sheet metal, pressed and moulded parts built to drawing for engineering customers."],
              ["Electrical & Electronics", "Electrical terminals, harnesses and moulded parts for electrical and electronics manufacturers."],
            ].map(([t, d], i) => <ScrollReveal key={t} delay={i * 90} className="industry-card"><span>0{i + 1}</span><h3>{t}</h3><p>{d}</p></ScrollReveal>)}
          </div>
        </div>
      </section>

      <section className="factory-editorial section-space">
        <div className="container">
          <ScrollReveal className="factory-editorial-heading">
            <div><Eyebrow>INSIDE OUR PLANTS</Eyebrow><h2>Precision comes<br />from <span>people.</span></h2></div>
            <p>Skilled teams, clean 5S shop floors and processes displayed in the local language — this is how quality is built at DAEPL every day.</p>
          </ScrollReveal>
          <div className="factory-mosaic">
            <ScrollReveal className="factory-frame factory-frame-large" direction="left"><ImagePanel src={img.crimping} alt="Semi-automatic crimping line" className="factory-image" /><span className="factory-image-caption">01 / 44 SEMI-AUTOMATIC CRIMPING MACHINES</span></ScrollReveal>
            <ScrollReveal className="factory-frame factory-frame-tall" direction="right" delay={120}><ImagePanel src={img.women} alt="Women team members on the harness assembly line" className="factory-image" /><span className="factory-image-caption">02 / WOMEN EMPOWERMENT</span></ScrollReveal>
            <ScrollReveal className="factory-note"><span className="factory-note-mark">DAEPL<span> / </span>01</span><p>Everything under one roof.<br /><strong>Terminals, stamping, moulding &amp; assembly.</strong></p><Link href="/infrastructure" className="text-button">Inside our facilities <ArrowIcon /></Link></ScrollReveal>
            <ScrollReveal className="factory-frame factory-frame-wide" delay={100}><ImagePanel src={img.toolRoom} alt="In-house tool room" className="factory-image" /><span className="factory-image-caption">03 / IN-HOUSE TOOL ROOM</span></ScrollReveal>
          </div>
        </div>
      </section>

      <section className="dark-statement"><div className="container statement-grid"><ScrollReveal className="statement-overline"><span className="statement-star">✳</span><span>EVERYTHING IN-HOUSE.<br />EVERY PART CHECKED.</span></ScrollReveal><ScrollReveal delay={90}><div><h2>Capability you can<br /><span>build on.</span></h2><p>44 semi-automatic crimping machines, 15 power presses, 6 injection moulding machines from 35 to 180 tonnes, 19 heat sealing machines and an in-house tool room with EDM.</p><Link href="/infrastructure" className="button button-lime">See our machine list <ArrowIcon /></Link></div></ScrollReveal><ScrollReveal className="statement-number" delay={170} direction="right">100<span>+</span></ScrollReveal></div></section>

      <section className="quality-band quality-feature">
        <div className="container quality-band-inner">
          <ScrollReveal className="quality-feature-image" direction="left"><ImagePanel src={img.lab} alt="DAEPL internal quality laboratory" className="quality-lab-image" /><span className="factory-image-caption">INTERNAL LABORATORY · SINCE 2016</span></ScrollReveal>
          <ScrollReveal className="quality-feature-copy" direction="right">
            <Eyebrow>QUALITY ISN&apos;T A CHECKBOX</Eyebrow><h2>Trust On Quality<br /><span>is how we work.</span></h2>
            <p>{qualityPolicy.statement} Our internal laboratory checks crimps, plating, hardness and corrosion resistance at every stage.</p>
            <div className="quality-seals"><div className="quality-seal"><span>IATF</span><strong>16949</strong><small>2016 · VALID TO 2027</small></div><div className="quality-seal"><span>ISO</span><strong>9001</strong><small>2015 · VALID TO 2027</small></div></div>
            <Link href="/quality" className="text-button">Explore our quality approach <ArrowIcon /></Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="oem-section">
        <div className="container oem-head">
          <ScrollReveal><Eyebrow>OUR PARTS ON THE ROAD</Eyebrow><h2>Trusted across the<br /><span>automotive supply chain.</span></h2></ScrollReveal>
          <ScrollReveal delay={100}><p>Through our direct customers, DAEPL parts reach vehicles from more than fifteen of the world&apos;s leading OEM brands.</p><Link href="/customers" className="text-button">Meet our customers <ArrowIcon /></Link></ScrollReveal>
        </div>
        <Marquee items={oemBrands} />
        <Marquee items={directCustomers} reverse />
      </section>

      <section className="milestone-section section-space">
        <div className="container">
          <div className="milestone-head"><SectionTitle eyebrow="THE ROAD SO FAR" title={<>25+ years of<br /><span>moving forward.</span></>} /><Link href="/about#milestones" className="text-button">Our full journey <ArrowIcon /></Link></div>
        </div>
        <div className="milestone-rail" tabIndex={0} aria-label="Company milestones">
          {milestones.map((m, i) => <article className="milestone-card" key={m.year}><span className="milestone-year">{m.year}</span><i style={{ background: ["#0A6CF1", "#F37A30", "#E52E36", "#00A651"][i % 4] }} /><h3>{m.title}</h3><p>{m.text}</p></article>)}
          <article className="milestone-card milestone-next"><span className="milestone-year">2028</span><i /><h3>Vision 2027–28</h3><p>New unit at IMT Manesar, EMS certification and new domestic &amp; export customers.</p></article>
        </div>
      </section>

      <section className="locations-editorial">
        <div className="locations-editorial-image" style={{ backgroundImage: `url("${img.heroFactory}")` }} />
        <div className="container locations-editorial-inner">
          <ScrollReveal><Eyebrow light>THREE LOCATIONS · ONE COMMITMENT</Eyebrow><h2>Rooted in Delhi NCR.<br /><span>Growing to Manesar.</span></h2><p>Our plants in Samaypur and Bawana, Delhi, manufacture wire harnesses, sheet metal and moulded parts. Unit-2 at IMT Manesar, Haryana is being planned.</p><Link href="/locations" className="button button-lime">Find our plants <ArrowIcon /></Link></ScrollReveal>
          <ScrollReveal className="location-pin-list" delay={150} direction="right">{plants.map((p) => <span key={p.slug}><i>{p.number}</i> {p.city.toUpperCase()} <small>{p.state.toUpperCase()}{p.operational ? "" : " · UPCOMING"}</small></span>)}</ScrollReveal>
        </div>
      </section>

      <section className="careers-teaser"><div className="container careers-teaser-inner"><div><Eyebrow light>MAKE YOUR NEXT MOVE</Eyebrow><h2>Build what<br />moves <span>India.</span></h2><p>Skilled operators, quality inspectors and tool-room engineers grow with us through hands-on Dojo training.</p><Link href="/careers" className="button button-lime">View open positions <ArrowIcon /></Link></div><ImagePanel src={img.welding} alt="DAEPL team at work" className="careers-image" /><div className="careers-shape">D<span>/</span>A</div></div></section>

      <section className="home-cta"><div className="container home-cta-inner"><Eyebrow>HAVE A DRAWING OR PART NUMBER?</Eyebrow><h2>Let&apos;s make the<br /><span>right connection.</span></h2><Link href="/rfq" className="button button-dark">Request a quote <ArrowIcon /></Link><p>Share your drawing and quantity — our team responds within one working day.</p></div></section>
    </div>
  );
}

/* ---------------------------------------------------------------- about */

export function AboutPage() {
  const top = leadership.filter((l) => l.level < 3);
  const heads = leadership.filter((l) => l.level === 3);
  return (
    <>
      <PageHero eyebrow="ABOUT DAEPL" title={<>Trust on quality.<br /><em>Since 1998.</em></>} lead="One of the leading professional automotive parts manufacturers in Delhi NCR — growing through quality service and customer satisfaction." image={img.heroFactory} />

      <section className="section-space">
        <div className="container about-intro">
          <div><Eyebrow>OUR STORY</Eyebrow><h2>Built on quality<br />service since <span>1998.</span></h2></div>
          <div>
            <p className="body-lead">Deep Auto Electricals Pvt. Ltd. was established in November 1998 with an objective of growing through quality service and customer satisfaction.</p>
            <p>What began as a terminal manufacturing unit has grown into an integrated manufacturer of electrical wiring harnesses, electrical terminals in chain and loose, sheet metal and moulded components. Today we serve customers in the automobile, general engineering and electrical &amp; electronics industries.</p>
            <p>We have well-equipped production facilities, quality systems, laboratory facilities and trained personnel to meet the specific requirements of every customer — and we assure our customers of consistency in quality, cost and delivery.</p>
            <div className="about-facts">{[["Nov 1998", "Established"], ["3", "Plants (1 upcoming)"], ["100+", "Machines"], ["IATF · ISO", "Certified"]].map(([v, l]) => <div key={l}><strong>{v}</strong><span>{l}</span></div>)}</div>
          </div>
        </div>
        <div className="container"><ImagePanel src={img.shopFloor} alt="DAEPL wire harness shop floor" className="wide-image" /></div>
      </section>

      <section className="vision-section section-space">
        <div className="container">
          <SectionTitle eyebrow="OUR VISION" title={<>Where we are<br /><span>headed.</span></>} light />
          <div className="vision-grid">{vision.map((v, i) => <ScrollReveal key={v.title} delay={i * 90} className="vision-card"><span>0{i + 1}</span><h3>{v.title}</h3><p>{v.text}</p></ScrollReveal>)}</div>
        </div>
      </section>

      <section className="section-space policy-section">
        <div className="container policy-grid">
          <div><Eyebrow>QUALITY POLICY</Eyebrow><h2>Continual<br /><span>improvement.</span></h2><blockquote>“{qualityPolicy.statement}”</blockquote></div>
          <div className="policy-pillars"><span className="policy-label">This shall be achieved through</span>{qualityPolicy.pillars.map((p, i) => <ScrollReveal key={p.title} delay={i * 80} className="policy-pillar"><i style={{ background: ["#0A6CF1", "#00A651", "#E52E36"][i] }} /><div><h3>{p.title}</h3><p>{p.text}</p></div></ScrollReveal>)}</div>
        </div>
      </section>

      <section className="timeline-section section-space" id="milestones">
        <div className="container timeline-inner">
          <div><Eyebrow>KEY MILESTONES</Eyebrow><h2>The road<br /><span>so far.</span></h2><p>From a terminal manufacturing unit in 1998 to an IATF 16949 certified, multi-plant automotive supplier.</p></div>
          <div className="timeline">{milestones.map((m, i) => <div key={m.year} className={`timeline-item${i === milestones.length - 1 ? " timeline-current" : ""}`}><span>{m.year}</span><div><i /><strong>{m.title}</strong><p>{m.text}</p></div></div>)}</div>
        </div>
      </section>

      <section className="roadmap-section section-space">
        <div className="container">
          <SectionTitle eyebrow="VISION 2027–28 · DAEPL ROAD MAP" title={<>The next chapter,<br /><span>step by step.</span></>} text="Our road map focuses on systems, people, capacity and new markets." />
          <ol className="roadmap">{roadmap.map((r, i) => <li key={r.year} style={{ ["--road" as string]: ["#0A6CF1", "#00A651", "#00B3FB", "#F37A30", "#E52E36", "#0b1f3a"][i] }}><span className="roadmap-step">{i + 1}</span><span className="roadmap-year">{r.year}</span><h3>{r.title}</h3><p>{r.text}</p></li>)}</ol>
        </div>
      </section>

      <section className="section-space leadership-section">
        <div className="container">
          <SectionTitle eyebrow="LEADERSHIP & ORGANISATION" title={<>The people behind<br /><span>every commitment.</span></>} centered />
          <div className="org-top">{top.map((p) => <div className="org-card org-card-lead" key={p.name}><span className="org-avatar">{initials(p.name)}</span><strong>{p.name}</strong><small>{p.role}</small></div>)}</div>
          <div className="org-heads">{heads.map((p) => <div className="org-card" key={p.name}><span className="org-avatar">{initials(p.name)}</span><strong>{p.name}</strong><small>{p.role}</small></div>)}</div>
        </div>
      </section>

      <section className="section-space strengths-section">
        <div className="container">
          <SectionTitle eyebrow="OUR STRENGTHS" title={<>Why customers<br /><span>choose DAEPL.</span></>} />
          <div className="strengths-grid">{strengths.map((s, i) => <ScrollReveal key={s.title} delay={(i % 5) * 60} className="strength-card"><span>{String(i + 1).padStart(2, "0")}</span><h3>{s.title}</h3><p>{s.text}</p></ScrollReveal>)}</div>
        </div>
      </section>

      <CtaBand title={<>Enrol DAEPL as your<br /><span>approved vendor.</span></>} text="Give us the opportunity to prove our worthiness on your next requirement." />
    </>
  );
}

/* ---------------------------------------------------------------- products */

export function ProductOverview() {
  return (
    <>
      <PageHero eyebrow="PRODUCTS" title={<>Components for<br /><em>every connection.</em></>} lead="Wire harnesses, electrical terminals, sheet metal and plastic moulded parts — manufactured to your drawing and specification." image={img.heroHarness} />
      <section className="section-space">
        <div className="container">
          <SectionTitle eyebrow="PRODUCT PORTFOLIO" title={<>Four product lines,<br /><span>made in-house.</span></>} text="Select a product line to see the parts we manufacture and the capabilities behind them." />
          <div className="category-grid category-grid-4">{categories.map((c) => <CategoryCard key={c.slug} category={c} />)}</div>
          <div className="portfolio-strip">
            {allProducts.map((p) => <Link key={p.slug} href={`/products/${p.category.slug}/${p.slug}`} className="portfolio-chip"><img src={p.image} alt="" loading="lazy" /><span>{p.short}</span></Link>)}
          </div>
          <div className="note-banner"><span className="note-icon">↗</span><p>Don&apos;t see your part? <strong>We manufacture to customer drawing — send us yours.</strong></p><Link href="/rfq" className="button button-dark">Request a quote <ArrowIcon /></Link></div>
        </div>
      </section>
    </>
  );
}

export function ProductCategoryPage({ slug }: { slug: string }) {
  const category = categories.find((c) => c.slug === slug);
  if (!category) return <NotFoundPage />;
  return (
    <>
      <PageHero eyebrow={`PRODUCTS · ${category.number}`} title={<>{category.name.split(" ").slice(0, -1).join(" ")}<br /><em>{category.name.split(" ").slice(-1)}</em></>} lead={category.summary} image={category.photo} crumbs={[{ href: "/products", label: "Products" }, { label: category.name }]} />
      <section className="section-space">
        <div className="container category-detail-grid">
          <div><Eyebrow>{category.tagline.toUpperCase()}</Eyebrow><h2>Made for your<br /><span>application.</span></h2></div>
          <div>
            <p>{category.summary} Manufactured at {category.plant}.</p>
            <ul className="check-list">{category.capabilities.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
        <div className="container product-tiles-grid">{category.products.map((p, i) => <ProductTile key={p.slug} product={p} category={category} index={i} />)}</div>
        <div className="container"><div className="note-banner"><span className="note-icon">↗</span><p>Need a {category.name.toLowerCase()} part built to your drawing?</p><Link href={`/rfq?product=${encodeURIComponent(category.name)}`} className="button button-dark">Request a quote <ArrowIcon /></Link></div></div>
      </section>
      <section className="related-section section-space"><div className="container"><SectionTitle eyebrow="OTHER PRODUCT LINES" title={<>More ways we can<br /><span>support you.</span></>} /><div className="related-grid">{categories.filter((c) => c.slug !== slug).map((c) => <CategoryCard key={c.slug} category={c} />)}</div></div></section>
    </>
  );
}

export function ProductDetailPage({ categorySlug, productSlug }: { categorySlug: string; productSlug: string }) {
  const category = categories.find((c) => c.slug === categorySlug);
  const product = category?.products.find((p) => p.slug === productSlug);
  if (!category || !product) return <NotFoundPage />;
  const siblings = category.products.filter((p) => p.slug !== productSlug);
  return (
    <>
      <PageHero compact eyebrow={category.name.toUpperCase()} title={<>{product.name.split(" ").slice(0, -2).join(" ")}<br /><em>{product.name.split(" ").slice(-2).join(" ")}</em></>} lead={product.application} crumbs={[{ href: "/products", label: "Products" }, { href: `/products/${category.slug}`, label: category.name }, { label: product.short }]} />
      <section className="section-space">
        <div className="container product-detail-grid">
          <div className="product-gallery">
            <div className="product-main-photo"><img src={product.image} alt={product.name} /></div>
            <div className="product-thumbs"><img src={product.image} alt="" /><img src={category.photo} alt={`${category.name} manufacturing`} /><img src={img.labInstruments} alt="Quality testing in the DAEPL laboratory" /></div>
          </div>
          <div className="product-detail-copy">
            <Eyebrow>{category.tagline.toUpperCase()}</Eyebrow>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <table className="spec-table"><caption>Specifications</caption><tbody>{product.specs.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>
            <div className="product-actions">
              <Link href={`/rfq?product=${encodeURIComponent(product.name)}`} className="button button-dark">Enquire about this product <ArrowIcon /></Link>
              <Link href="/contact" className="button button-outline-dark">Datasheet on request <ArrowIcon /></Link>
            </div>
            <p className="product-note">Specifications are confirmed against your approved drawing. Prices are shared on quotation.</p>
          </div>
        </div>
      </section>
      {siblings.length > 0 && <section className="related-section section-space"><div className="container"><SectionTitle eyebrow={`MORE ${category.name.toUpperCase()}`} title={<>Related <span>products.</span></>} /><div className="product-tiles-grid">{siblings.map((p, i) => <ProductTile key={p.slug} product={p} category={category} index={i} />)}</div></div></section>}
      <CtaBand title={<>Have a drawing<br /><span>ready?</span></>} text="Send it with your expected quantity — our NPD team will respond with feasibility and a quotation." href={`/rfq?product=${encodeURIComponent(product.name)}`} />
    </>
  );
}

/* ---------------------------------------------------------------- infrastructure */

export function InfrastructurePage() {
  const capability = [
    { number: 100, suffix: "+", label: "Machines", detail: "Across six manufacturing processes" },
    { number: 44, suffix: "", label: "Crimping machines", detail: "Semi-automatic · Regenato & Sai Paradise" },
    { number: 15, suffix: "", label: "Power presses", detail: "Auto & semi-auto · 5 to 30 ton" },
    { number: 6, suffix: "", label: "Moulding machines", detail: "Injection moulding · 35 to 180 ton" },
  ];
  return (
    <>
      <PageHero eyebrow="INFRASTRUCTURE" title={<>The right machine<br /><em>behind every part.</em></>} lead="Well-equipped production facilities, an in-house tool room and an internal laboratory — operated by trained, skilled teams." image={img.heroFactory} />
      <section className="section-space">
        <div className="container">
          <SectionTitle eyebrow="MANUFACTURING CAPABILITY" title={<>Everything under<br /><span>one roof.</span></>} text="Terminals, stamping, moulding and harness assembly are all set up in-house, so we control quality, cost and delivery end to end." />
          <div className="capability-stats-grid">{capability.map((c) => <div key={c.label} className="capability-stat"><strong><Counter value={c.number} suffix={c.suffix} /></strong><h3>{c.label}</h3><p>{c.detail}</p></div>)}</div>
        </div>
      </section>

      <section className="machines-section section-space">
        <div className="container">
          <SectionTitle eyebrow="MACHINE LIST BY PROCESS" title={<>Our manufacturing<br /><span>operation facilities.</span></>} />
          <div className="machine-list">
            {machineGroups.map((g, i) => (
              <ScrollReveal key={g.title} className={`machine-block${i % 2 ? " machine-block-flip" : ""}`}>
                <div className="machine-photo"><img src={g.image} alt={g.title} loading="lazy" /><span>{String(i + 1).padStart(2, "0")}</span></div>
                <div className="machine-copy">
                  <span className="machine-total"><strong>{g.total}</strong> machines</span>
                  <h3>{g.title}</h3>
                  <table className="machine-table"><thead><tr><th>Machine / utility</th><th>Qty.</th><th>Make</th></tr></thead><tbody>{g.rows.map((r) => <tr key={r[0] + r[2]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>)}</tbody></table>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space lab-section">
        <div className="container lab-grid">
          <div>
            <Eyebrow light>INTERNAL LABORATORY</Eyebrow>
            <h2>Tested in-house,<br /><span>at every stage.</span></h2>
            <p>Established in 2016, our laboratory verifies raw material, crimps, plating, dimensions and corrosion resistance before parts leave the plant.</p>
            <ul className="lab-list">{labEquipment.map((l) => <li key={l.name}><strong>{l.name}</strong><span>{l.use}</span></li>)}</ul>
          </div>
          <div className="lab-photos"><img src={img.lab} alt="DAEPL quality laboratory" loading="lazy" /><img src={img.labInstruments} alt="Profile projector, coating thickness and hardness testers" loading="lazy" /><img src={img.labTesting} alt="Salt spray chamber and lux meter" loading="lazy" /></div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <SectionTitle eyebrow="WORKPLACE STANDARDS" title={<>5S, FIFO &amp;<br /><span>visual management.</span></>} />
          <div className="facility-cards">{facilities.map((f) => <article key={f.title} className="facility-card"><img src={f.image} alt={f.title} loading="lazy" /><div><h3>{f.title}</h3><ul>{f.points.map((p) => <li key={p}>{p}</li>)}</ul></div></article>)}</div>
        </div>
      </section>

      <section className="section-space gallery-section">
        <div className="container">
          <SectionTitle eyebrow="PHOTO TOUR" title={<>Take a walk<br /><span>through our plants.</span></>} text="Click any photo to view it full screen." />
          <Gallery items={[
            { src: img.shopFloor, caption: "Wire harness assembly line" }, { src: img.crimping, caption: "Terminal & joint crimping" }, { src: img.wireCutting, caption: "Wire cutting & stripping" },
            { src: img.toolRoom, caption: "In-house tool room" }, { src: img.powerPress, caption: "Auto & semi-auto power presses" }, { src: img.moulding, caption: "Plastic injection moulding" },
            { src: img.welding, caption: "Spot welding & heat sealing" }, { src: img.lab, caption: "Internal laboratory" }, { src: img.storage, caption: "FIFO material storage" }, { src: img.office, caption: "Office & planning team" },
          ]} />
        </div>
      </section>

      <CtaBand title={<>See it for<br /><span>yourself.</span></>} text="Plan a plant visit or audit — our team will be happy to walk you through our facilities." href="/contact" label="Plan a visit" />
    </>
  );
}

/* ---------------------------------------------------------------- quality */

export function QualityPage() {
  return (
    <>
      <PageHero eyebrow="QUALITY & CERTIFICATIONS" title={<>Trust on quality.<br /><em>Certified.</em></>} lead="IATF 16949:2016 and ISO 9001:2015 certified quality management, backed by an internal laboratory and a culture of continual improvement." image={img.heroQuality} />

      <section className="section-space">
        <div className="container policy-grid">
          <div><Eyebrow>OUR QUALITY POLICY</Eyebrow><h2>Customer satisfaction<br />through <span>improvement.</span></h2><blockquote>“{qualityPolicy.statement}”</blockquote></div>
          <div className="policy-pillars"><span className="policy-label">This shall be achieved through</span>{qualityPolicy.pillars.map((p, i) => <div key={p.title} className="policy-pillar"><i style={{ background: ["#0A6CF1", "#00A651", "#E52E36"][i] }} /><div><h3>{p.title}</h3><p>{p.text}</p></div></div>)}</div>
        </div>
      </section>

      <section className="section-space cert-section">
        <div className="container">
          <SectionTitle eyebrow="CERTIFICATIONS" title={<>Independently<br /><span>certified.</span></>} text={`Scope: ${certScope}. Certified by ${certBody}.`} light />
          <div className="cert-showcase">
            {certificates.map((c) => (
              <ScrollReveal key={c.code} className="cert-tile">
                <div className="cert-image"><img src={c.image} alt={`${c.code} certificate — Deep Auto Electricals Pvt. Ltd.`} loading="lazy" /></div>
                <div className="cert-copy"><span className="cert-badge">CERTIFIED</span><h3>{c.code}</h3><p>{c.title}</p><dl>{c.details.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>
              </ScrollReveal>
            ))}
          </div>
          <div className="cert-next"><span>NEXT</span><p><strong>Environmental Management System (EMS)</strong> certification is planned as part of our Vision 2027–28 road map.</p></div>
        </div>
      </section>

      <section className="section-space">
        <div className="container">
          <SectionTitle eyebrow="MAJOR QUALITY ASPECTS" title={<>Quality built into<br /><span>every stage.</span></>} text="At the core: DAEPL Trust On Quality and customer satisfaction." />
          <div className="aspect-grid">{qualityAspects.map((a) => <ScrollReveal key={a.number} className="aspect-card"><span>{a.number}</span><h3>{a.title}</h3><ul>{a.points.map((p) => <li key={p}>{p}</li>)}</ul></ScrollReveal>)}</div>
        </div>
      </section>

      <section className="section-space lab-section">
        <div className="container lab-grid">
          <div><Eyebrow light>INTERNAL LABORATORY</Eyebrow><h2>Measured,<br /><span>not assumed.</span></h2><p>Our laboratory equipment supports incoming, in-process and final inspection.</p><ul className="lab-list">{labEquipment.map((l) => <li key={l.name}><strong>{l.name}</strong><span>{l.use}</span></li>)}</ul></div>
          <div className="lab-photos"><img src={img.labInstruments} alt="Profile projector, coating thickness and Rockwell hardness testers" loading="lazy" /><img src={img.labTesting} alt="Salt spray chamber and lux meter" loading="lazy" /><img src={img.lab} alt="Quality laboratory" loading="lazy" /></div>
        </div>
      </section>

      <CtaBand title={<>Need certificate<br /><span>copies?</span></>} text="Our quality team can share current certificates and support your supplier audit." href="/contact" label="Contact quality team" />
    </>
  );
}

/* ---------------------------------------------------------------- customers */

export function CustomersPage() {
  return (
    <>
      <PageHero eyebrow="OUR CUSTOMERS" title={<>Partnerships built<br /><em>on trust.</em></>} lead="Valued, satisfied customers across the automotive supply chain — and the OEM brands our parts reach." image={img.heroHarness} />
      <section className="section-space">
        <div className="container">
          <SectionTitle eyebrow="DIRECT CUSTOMERS" title={<>Our valuable<br /><span>satisfied customers.</span></>} text="Tier-1 and lighting manufacturers we supply directly." />
          <div className="logo-wall">{directCustomers.map((c) => <div key={c} className="logo-tile">{c}</div>)}</div>
        </div>
      </section>
      <section className="section-space oem-wall-section">
        <div className="container">
          <SectionTitle eyebrow="INDIRECT OEM CUSTOMERS" title={<>Our parts reach<br /><span>leading OEMs.</span></>} text="Through our direct customers, DAEPL components are part of vehicles from these OEM brands." light />
          <div className="logo-wall logo-wall-dark">{oemBrands.map((c) => <div key={c} className="logo-tile">{c}</div>)}</div>
          <p className="partner-disclaimer">Brand names are shown for identification only. Trademarks belong to their respective owners; logos will be displayed with permission.</p>
        </div>
      </section>
      <section className="section-space">
        <div className="container industries-grid">{company.industries.map((t, i) => <div key={t} className="industry-card"><span>0{i + 1}</span><h3>{t}</h3><p>{["Two-wheeler, passenger & commercial vehicle programmes.", "Pressed, formed and moulded parts to drawing.", "Terminals, harnesses & moulded parts."][i]}</p></div>)}</div>
      </section>
      <CtaBand title={<>Become our<br /><span>next partner.</span></>} text="We would welcome the opportunity to be enrolled as an approved vendor for your requirements." />
    </>
  );
}

/* ---------------------------------------------------------------- locations */

export function LocationsPage() {
  return (
    <>
      <PageHero eyebrow="PLANT LOCATIONS" title={<>Close to the<br /><em>industry.</em></>} lead="Two operational plants in Delhi and a new unit planned at IMT Manesar, Haryana — at the heart of North India's automotive cluster." image={img.heroFactory} />
      <section className="section-space">
        <div className="container">
          <SectionTitle eyebrow="OUR PLANTS" title={<>Three locations.<br /><span>One commitment.</span></>} />
          <div className="plant-grid">
            {plants.map((p) => (
              <article className={`plant-card${p.operational ? "" : " plant-card-upcoming"}`} key={p.slug}>
                <div className="plant-map"><iframe title={`${p.city} map`} src={`https://maps.google.com/maps?q=${encodeURIComponent(p.query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><span className="plant-index">{p.number}</span></div>
                <div className="plant-card-copy">
                  <span className="eyebrow">{p.state.toUpperCase()} · {p.status.toUpperCase()}</span>
                  <h3>{p.city}</h3>
                  <p className="plant-name">{p.name}</p>
                  <p><strong>Manufactures:</strong> {p.scope}</p>
                  <p>{p.address}</p>
                  {p.operational ? <a className="text-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.query)}`} target="_blank" rel="noreferrer">Get directions <ArrowIcon diagonal /></a> : <span className="plant-soon">Planning in progress</span>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title={<>Planning<br /><span>a visit?</span></>} text="Let us know in advance and we'll arrange a plant tour or supplier audit." href="/contact" label="Contact us" />
    </>
  );
}

/* ---------------------------------------------------------------- CSR & life */

export function LifePage() {
  return (
    <>
      <PageHero eyebrow="CSR & LIFE AT DAEPL" title={<>People make<br /><em>the difference.</em></>} lead="Women empowerment, social responsibility and a safe, healthy workplace — part of who we are." image={img.women} />
      <section className="section-space">
        <div className="container life-intro">
          <div><Eyebrow>OUR PEOPLE. OUR PURPOSE.</Eyebrow><h2>Good work begins<br />with <span>people.</span></h2></div>
          <div>
            <p className="body-lead">Our vision includes our social and civil responsibilities — and creating a safe and healthy working environment for every team member.</p>
            <p>Through Dojo training we enhance skills and communication across the organisation, and we motivate our workers towards quality. Our young team brings innovative ideas, supported by experienced leaders.</p>
          </div>
        </div>
      </section>
      <section className="section-space csr-feature">
        <div className="container csr-grid">
          <ScrollReveal className="csr-photo" direction="left"><img src={img.women} alt="Women team members on the DAEPL harness assembly line" loading="lazy" /></ScrollReveal>
          <ScrollReveal className="csr-copy" direction="right">
            <Eyebrow>WOMEN EMPOWERMENT</Eyebrow>
            <h2>Building skills,<br /><span>building futures.</span></h2>
            <p>Women form a key part of our wire harness assembly teams. We provide training, a safe workplace and the opportunity to build a skilled career in automotive manufacturing.</p>
            <ul className="check-list"><li>Skill training through Dojo</li><li>Safe, clean 5S workplace</li><li>Work instructions in the local language</li></ul>
          </ScrollReveal>
        </div>
      </section>
      <section className="section-space">
        <div className="container csr-cards">
          {[
            ["Social responsibility", "DAEPL supports the Pulse Polio campaign — “Two polio drops, every child, every time” — helping to keep communities healthy."],
            ["Safe & healthy workplace", "Personal protective equipment, clean 5S work areas and standard operating procedures for every process."],
            ["Learning through Dojo", "Structured training that improves skills and communication, from new operators to experienced technicians."],
          ].map(([t, d], i) => <ScrollReveal key={t} delay={i * 90} className="csr-card"><span style={{ background: ["#E52E36", "#00A651", "#0A6CF1"][i] }} /><h3>{t}</h3><p>{d}</p></ScrollReveal>)}
        </div>
      </section>
      <section className="section-space gallery-section">
        <div className="container">
          <SectionTitle eyebrow="LIFE AT DAEPL" title={<>A day on<br /><span>our floors.</span></>} />
          <Gallery items={[{ src: img.women, caption: "Harness assembly team" }, { src: img.wireCutting, caption: "Wire processing" }, { src: img.welding, caption: "Welding with PPE" }, { src: img.office, caption: "Office team" }, { src: img.toolRoom, caption: "Tool room" }, { src: img.labInstruments, caption: "Quality laboratory" }, { src: img.crimping, caption: "Crimping line" }]} />
        </div>
      </section>
      <CtaBand title={<>Grow your<br /><span>career with us.</span></>} text="Explore current openings at our Delhi plants." href="/careers" label="View careers" />
    </>
  );
}

/* ---------------------------------------------------------------- careers */

export function CareersPage() {
  return (
    <>
      <PageHero eyebrow="CAREERS AT DAEPL" title={<>Build what<br /><em>moves India.</em></>} lead="Join a young, skilled team at an IATF 16949 certified manufacturer — and grow with hands-on training." image={img.wireCutting} />
      <section className="section-space">
        <div className="container careers-intro">
          <div><Eyebrow>WHY JOIN DAEPL</Eyebrow><h2>Make something<br /><span>that matters.</span></h2><p>Our parts reach vehicles from India&apos;s leading brands. Here, your work is visible on the road every day.</p></div>
          <div className="careers-value-cards">
            <div><span>01</span><h3>Learn through Dojo</h3><p>Structured, hands-on training that builds your skills from day one.</p></div>
            <div><span>02</span><h3>Safe workplace</h3><p>Clean 5S shop floors, PPE and clear work instructions in the local language.</p></div>
            <div><span>03</span><h3>Grow with us</h3><p>A growing company with a new unit planned at IMT Manesar — and room to grow.</p></div>
          </div>
        </div>
      </section>
      <section className="job-listings section-space" id="openings">
        <div className="container">
          <div className="jobs-heading"><div><Eyebrow>CURRENT OPENINGS</Eyebrow><h2>Find your <span>fit.</span></h2></div></div>
          <JobBoard jobs={jobs} />
        </div>
      </section>
      <section className="section-space">
        <div className="container">
          <SectionTitle eyebrow="HOW WE HIRE" title={<>Simple, quick<br /><span>and transparent.</span></>} />
          <ol className="hire-steps">{[["Apply", "Apply online with your CV, or share it on WhatsApp for shop-floor roles."], ["Screening", "Our HR team reviews every application."], ["Interview", "Meet the department head and visit the plant."], ["Offer", "Join DAEPL and start your Dojo training."]].map(([t, d], i) => <li key={t}><span>{i + 1}</span><h3>{t}</h3><p>{d}</p></li>)}</ol>
        </div>
      </section>
      <section className="careers-banner"><div className="container careers-banner-inner"><div><Eyebrow light>DON&apos;T SEE THE RIGHT ROLE?</Eyebrow><h2>Send us<br /><span>your CV.</span></h2></div><Link href="/careers/apply" className="button button-lime">Submit general application <ArrowIcon /></Link></div></section>
    </>
  );
}

export function JobDetailPage({ slug }: { slug: string }) {
  const job = jobs.find((j) => j.slug === slug);
  if (!job) return <NotFoundPage />;
  const date = new Date(job.lastDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <PageHero compact eyebrow={`CAREERS · ${job.department.toUpperCase()}`} title={<>{job.title}</>} lead={job.summary} crumbs={[{ href: "/careers", label: "Careers" }, { label: job.title }]} />
      <section className="section-space">
        <div className="container form-layout job-layout">
          <div className="job-detail">
            <dl className="job-facts">{[["Department", job.department], ["Plant location", job.plant], ["Employment", job.type], ["Experience", job.experience], ["Qualification", job.qualification], ["Openings", String(job.openings)], ["Last date to apply", date]].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <h2>Responsibilities</h2>
            <ul className="check-list">{job.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
            <ShareJob title={job.title} path={`/careers/${job.slug}`} />
            <Link href="/careers#openings" className="text-button">All openings <ArrowIcon /></Link>
          </div>
          <EnquiryForm kind="apply" role={job.title} />
        </div>
      </section>
    </>
  );
}

export function ApplicationPage() {
  return (
    <>
      <PageHero compact eyebrow="CAREERS · GENERAL APPLICATION" title={<>Tell us about<br /><em>yourself.</em></>} lead="Share your details and CV — we'll contact you when a suitable opportunity opens." crumbs={[{ href: "/careers", label: "Careers" }, { label: "General application" }]} />
      <section className="section-space"><div className="container form-layout"><div className="form-side-note"><Eyebrow>YOUR NEXT MOVE</Eyebrow><h2>Keep your<br /><span>options open.</span></h2><p>We keep every application on file for future openings in production, quality, tool room, NPD and support functions.</p><p>Shop-floor candidates (ITI / diploma) can also send their CV on <a href={company.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>.</p><Link href="/careers" className="text-button">Back to careers <ArrowIcon /></Link></div><EnquiryForm kind="apply" /></div></section>
    </>
  );
}

/* ---------------------------------------------------------------- contact & rfq */

export function ContactPage() {
  const head = plants[0];
  return (
    <>
      <PageHero compact eyebrow="CONTACT US" title={<>Let&apos;s start<br /><em>a conversation.</em></>} lead="From a product question to a new project or a plant visit — we're here to help." />
      <section className="section-space">
        <div className="container contact-cards-grid">
          <div className="contact-card contact-card-main"><span>HEAD OFFICE & PLANT</span><h3>{company.name}</h3><address>{company.address.map((l) => <span key={l}>{l}</span>)}</address><a href={company.landlineHref}>{company.landline}</a><a href={`mailto:${company.email}`}>{company.email}</a><p>{company.hours}</p></div>
          {contacts.map((c) => <div className="contact-card" key={c.email}><span>{c.topic.toUpperCase()}</span><h3>{c.name}</h3><p>{c.role}</p><a href={c.phoneHref}>{c.phone}</a>{c.alt && <a href={`tel:+91${c.alt.replace(/\D/g, "").slice(-10)}`}>{c.alt}</a>}<a href={`mailto:${c.email}`}>{c.email}</a></div>)}
        </div>
        <div className="container contact-layout">
          <div className="contact-side">
            <Eyebrow>WRITE TO US</Eyebrow><h2>Tell us what<br />you&apos;re <span>looking for.</span></h2>
            <p>Share a few details and the right person on our team will be in touch — usually within one working day.</p>
            <div className="contact-quick"><a href={company.whatsappHref} target="_blank" rel="noreferrer" className="button button-dark">Chat on WhatsApp <ArrowIcon /></a><a href={company.phoneHref} className="button button-outline-dark">Call {company.phone}</a></div>
            <div className="contact-map"><iframe title="DAEPL head office map" src={`https://maps.google.com/maps?q=${encodeURIComponent(head.query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
          <EnquiryForm kind="contact" />
        </div>
      </section>
    </>
  );
}

export function RfqPage({ product = "" }: { product?: string }) {
  return (
    <>
      <PageHero compact eyebrow="REQUEST A QUOTE" title={<>Let&apos;s build<br /><em>the right fit.</em></>} lead="Share part details, expected quantity and your drawing — PDF, DWG or image." />
      <section className="section-space">
        <div className="container form-layout">
          <div className="form-side-note">
            <Eyebrow>WHAT TO INCLUDE</Eyebrow><h2>A good quote<br />starts with a <span>brief.</span></h2>
            <ol className="rfq-steps"><li><strong>Part details</strong><span>Name, part number or application.</span></li><li><strong>Drawing</strong><span>PDF, DWG, DXF or a clear photo.</span></li><li><strong>Quantity</strong><span>Monthly or annual volume.</span></li><li><strong>Timeline</strong><span>When you need samples and production.</span></li></ol>
            <div className="form-privacy"><span>✓</span><p>Drawings are used only to prepare your quotation, in line with our <Link href="/privacy">privacy policy</Link>.</p></div>
            <p className="rfq-direct">Prefer to talk? Call <a href={contacts[0].phoneHref}>{contacts[0].phone}</a> or email <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
          </div>
          <EnquiryForm key={product} kind="rfq" product={product} />
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------- legal, thank-you, 404 */

export function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return (
    <>
      <PageHero compact eyebrow={privacy ? "PRIVACY POLICY" : "TERMS OF USE"} title={privacy ? <>Your information,<br /><em>handled with care.</em></> : <>Clear terms.<br /><em>Clear expectations.</em></>} lead={privacy ? "How Deep Auto Electricals Pvt. Ltd. collects and uses information shared through this website." : "Terms for using this website and the information on it."} />
      <section className="section-space">
        <article className="container legal-content">
          <p className="legal-updated">LAST UPDATED · {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }).toUpperCase()}</p>
          {privacy ? (
            <>
              <h2>Who we are</h2><p>This website is operated by {company.name}, {company.addressLine} (“DAEPL”, “we”). For any privacy request, write to <a href={`mailto:${company.email}`}>{company.email}</a>.</p>
              <h2>Information we collect</h2><p>When you use our contact, request-for-quote or careers forms we collect the details you choose to share — such as your name, company, email, phone number, part details, drawings, CV and employment details (experience, CTC, notice period). We also collect basic, anonymous usage statistics to improve the website.</p>
              <h2>How we use it</h2><p>We use your information only to respond to your enquiry, prepare quotations, evaluate job applications and keep records required by law. Drawings and CVs are used solely for the purpose they were shared. We do not sell your personal data.</p>
              <h2>Consent and your rights</h2><p>We process personal data on the basis of your consent, in line with the Digital Personal Data Protection Act, 2023. You may request access to, correction of, or erasure of your personal data, or withdraw consent, by writing to us. Withdrawal does not affect processing already carried out.</p>
              <h2>Retention and security</h2><p>Enquiry and application records are kept only as long as needed for their purpose or as required by law, and are protected with access controls, encrypted connections (HTTPS) and regular backups.</p>
              <h2>Third-party services</h2><p>Maps, WhatsApp and analytics services are provided by third parties and are governed by their own privacy policies.</p>
            </>
          ) : (
            <>
              <h2>Use of this website</h2><p>The content on this website is provided for general business information about {company.name}. By using the website you agree to these terms.</p>
              <h2>Product information</h2><p>Product images and descriptions are indicative. Specifications, quantities, prices and lead times are confirmed only through a written quotation or purchase order agreed with DAEPL.</p>
              <h2>Intellectual property</h2><p>The DAEPL name, logo, text and photographs on this website belong to DAEPL. Customer and OEM brand names are shown for identification only and remain the property of their owners.</p>
              <h2>Submissions</h2><p>Please share drawings or documents only if you are authorised to do so. Information covered by a customer NDA should not be uploaded without approval.</p>
              <h2>Limitation of liability</h2><p>While we keep this website accurate and up to date, DAEPL is not liable for any loss arising from the use of information on it. These terms are governed by the laws of India, with courts at Delhi having jurisdiction.</p>
            </>
          )}
        </article>
      </section>
    </>
  );
}

export function ThankYouPage({ type = "contact" }: { type?: string }) {
  const copy: Record<string, [string, string]> = {
    rfq: ["Your quote request is in.", "Our sales and NPD team will review your requirement and get back to you within one working day."],
    apply: ["Application received.", "Thank you for your interest in DAEPL. Our HR team will contact you if your profile matches the role."],
    contact: ["Thank you for writing to us.", "The right person on our team will respond to your enquiry within one working day."],
  };
  const [title, text] = copy[type] ?? copy.contact;
  return (
    <section className="thankyou-page">
      <div className="container thankyou-inner">
        <span className="thankyou-check">✓</span>
        <Eyebrow>THANK YOU</Eyebrow>
        <h1>{title.split(" ").slice(0, -2).join(" ")} <span>{title.split(" ").slice(-2).join(" ")}</span></h1>
        <p>{text} For anything urgent, call <a href={company.phoneHref}>{company.phone}</a>.</p>
        <div className="hero-actions"><Link href="/" className="button button-dark">Back to home <ArrowIcon /></Link><Link href="/products" className="button button-outline-dark">Explore products <ArrowIcon /></Link></div>
      </div>
    </section>
  );
}

export function NotFoundPage() {
  return (
    <section className="thankyou-page notfound-page">
      <div className="container thankyou-inner">
        <span className="notfound-code">404</span>
        <Eyebrow>PAGE NOT FOUND</Eyebrow>
        <h1>This connection<br />is <span>missing.</span></h1>
        <p>The page you&apos;re looking for may have moved. Try one of these instead.</p>
        <div className="hero-actions"><Link href="/" className="button button-dark">Return home <ArrowIcon /></Link><Link href="/products" className="button button-outline-dark">Our products <ArrowIcon /></Link><Link href="/contact" className="button button-outline-dark">Contact us <ArrowIcon /></Link></div>
      </div>
    </section>
  );
}

export function AdminPreview() {
  const modules = [["01", "Products & categories", `${allProducts.length} products · ${categories.length} categories`], ["02", "Home banners", "4 banners"], ["03", "Certificates", "IATF 16949 · ISO 9001"], ["04", "Customer logos", `${directCustomers.length} direct · ${oemBrands.length} OEM`], ["05", "Careers", `${jobs.length} vacancies`], ["06", "Applications", "Filter · shortlist · export"], ["07", "Enquiries & RFQs", "Mark responded · export"], ["08", "Users & roles", "Up to 5 logins (HR, Marketing, MD)"]];
  return (
    <>
      <PageHero compact eyebrow="ADMIN · PREVIEW" title={<>A clearer view<br /><em>of your business.</em></>} lead="A visual preview of the content-management workspace described in the website scope." />
      <section className="section-space"><div className="container admin-preview"><div className="admin-notice"><span>ⓘ</span><p><strong>Visual preview only.</strong> This workspace is not connected to a database. Do not enter real information.</p></div><h2>Website content</h2><div className="admin-modules">{modules.map((m) => <div className="admin-module" key={m[0]}><span>{m[0]}</span><div><strong>{m[1]}</strong><small>{m[2]}</small></div><ArrowIcon /></div>)}</div><div className="admin-preview-footer"><p>Production admin access requires an authenticated backend, database, secure file storage and configured user roles.</p><Link href="/" className="text-button">Return to website <ArrowIcon /></Link></div></div></section>
    </>
  );
}
