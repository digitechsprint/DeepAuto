import Link from "next/link";
import { ArrowIcon, FloatingActions } from "@/components/site";
import { EnquiryForm } from "@/components/forms";
import { HomeHero } from "@/components/home-hero";
import { ScrollReveal } from "@/components/scroll-reveal";

const images = {
  hero: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2200&q=85",
  harness: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85",
  factory: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=1500&q=85",
  production: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1400&q=85",
  engineering: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1200&q=85",
  component: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=1200&q=85",
  assembly: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85",
  qualityLab: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?auto=format&fit=crop&w=1200&q=85",
};

const categories = [
  { name: "Wire harnesses", slug: "wire-harnesses", number: "01", summary: "Purpose-designed assemblies that bring every connection together.", image: images.harness, products: ["Headlamp harness", "Tail lamp harness", "Meter harness", "ADAS harness"] },
  { name: "Cable manufacturing", slug: "cables", number: "02", summary: "Reliable cable solutions, engineered for demanding applications.", image: images.assembly, products: ["Automotive cables", "Custom cable assemblies"] },
  { name: "Automotive terminals", slug: "terminals", number: "03", summary: "High-precision connections built for a secure fit and lasting performance.", image: images.qualityLab, products: ["Connector terminals", "Battery terminals"] },
  { name: "PVC sleeves", slug: "pvc-sleeves", number: "04", summary: "Durable protection and insulation for critical wire assemblies.", image: images.component, products: ["Protective PVC sleeves", "Custom sleeves"] },
  { name: "Sheet metal components", slug: "sheet-metal", number: "05", summary: "Accurate formed parts that fit seamlessly into your assembly.", image: images.engineering, products: ["Precision sheet metal parts"] },
  { name: "Plastic moulded parts", slug: "plastic-moulding", number: "06", summary: "Application-ready mouldings, made with in-house process control.", image: images.component, products: ["Custom plastic mouldings"] },
];

function ImagePanel({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <div className={`image-panel ${className}`} role="img" aria-label={alt} style={{ backgroundImage: `url("${src}")` }}><span className="image-shade" /></div>;
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`eyebrow${light ? " eyebrow-light" : ""}`}><span className="eyebrow-dot" />{children}</span>;
}

export function HomePage() {
  return (
    <div className="home-page">
      <HomeHero />

      <section className="intro-section section-space">
        <div className="container intro-grid">
          <ScrollReveal className="intro-aside"><Eyebrow>BUILT ON EXPERIENCE</Eyebrow><span className="intro-aside-note">A little more about<br />what drives us.</span></ScrollReveal>
          <ScrollReveal className="intro-copy" delay={100}>
            <h2>Connection is<br />where it <span>begins.</span></h2>
            <p>Since 1998, Deep Auto Electricals has helped move the automotive industry forward—one carefully made component at a time. From wire harnesses to precision parts, quality is part of every connection we make.</p>
            <Link href="/about" className="text-button">Our story <ArrowIcon /></Link>
          </ScrollReveal>
          <ScrollReveal className="intro-visual" delay={180} direction="right"><ImagePanel src={images.production} alt="Automotive manufacturing process" className="intro-image" /><span className="image-tag"><span className="tag-dot" />DELHI NCR · INDIA</span><div className="image-years"><strong>25<span>+</span></strong><span>years moving<br />forward</span></div></ScrollReveal>
        </div>
      </section>

      <section className="metrics-strip"><div className="container metrics-grid">
        <ScrollReveal className="metric-item"><strong>1998</strong><span>Our story began</span></ScrollReveal>
        <ScrollReveal className="metric-item" delay={80}><strong>44</strong><span>Crimping machines</span></ScrollReveal>
        <ScrollReveal className="metric-item" delay={160}><strong>35–180<span className="metric-unit">T</span></strong><span>Moulding capacity</span></ScrollReveal>
        <ScrollReveal className="metric-item" delay={240}><strong>03</strong><span>Plant locations in North India</span></ScrollReveal>
      </div></section>

      <section className="products-section section-space">
        <div className="container">
          <ScrollReveal className="section-heading heading-split"><div><Eyebrow>WHAT WE MAKE</Eyebrow><h2>Engineered for<br /><span>the bigger picture.</span></h2></div><div className="heading-side"><p>One connected set of capabilities. Six ways to support the components that move your business forward.</p><Link href="/products" className="text-button">Explore all capabilities <ArrowIcon /></Link></div></ScrollReveal>
          <div className="product-card-grid reveal-stagger">{categories.map((category, index) => <ScrollReveal key={category.slug} delay={index * 70}><Link className="product-card" href={`/products/${category.slug}`}><div className="product-card-image" style={{ backgroundImage: `url("${category.image}")` }}><span className="product-number">{category.number}</span><span className="product-open"><ArrowIcon diagonal /></span></div><div className="product-card-copy"><div><h3>{category.name}</h3><p>{category.summary}</p></div><span className="product-link-icon"><ArrowIcon /></span></div></Link></ScrollReveal>)}</div>
        </div>
      </section>

      <section className="factory-editorial section-space">
        <div className="container">
          <ScrollReveal className="factory-editorial-heading">
            <div><Eyebrow>MADE WITH PURPOSE</Eyebrow><h2>Precision comes<br />from <span>people.</span></h2></div>
            <p>Good manufacturing is a thousand small decisions made well. See the experience, people and care behind every connection.</p>
          </ScrollReveal>
          <div className="factory-mosaic">
            <ScrollReveal className="factory-frame factory-frame-large" direction="left">
              <ImagePanel src={images.factory} alt="Industrial manufacturing workshop" className="factory-image" />
              <span className="factory-image-caption">01 / THE PRODUCTION FLOOR</span>
            </ScrollReveal>
            <ScrollReveal className="factory-frame factory-frame-tall" direction="right" delay={120}>
              <ImagePanel src={images.assembly} alt="Close-up of careful assembly work" className="factory-image" />
              <span className="factory-image-caption">02 / ATTENTION TO EVERY DETAIL</span>
            </ScrollReveal>
            <ScrollReveal className="factory-note">
              <span className="factory-note-mark">DAE<span> / </span>01</span>
              <p>Thoughtful engineering.<br /><strong>Hands-on know-how.</strong></p>
              <Link href="/infrastructure" className="text-button">Inside our facilities <ArrowIcon /></Link>
            </ScrollReveal>
            <ScrollReveal className="factory-frame factory-frame-wide" delay={100}>
              <ImagePanel src={images.engineering} alt="Engineering process and production planning" className="factory-image" />
              <span className="factory-image-caption">03 / BUILT AROUND YOUR APPLICATION</span>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="dark-statement"><div className="container statement-grid"><ScrollReveal className="statement-overline"><span className="statement-star">✳</span><span>MADE WITH CARE.<br />BUILT WITH PURPOSE.</span></ScrollReveal><ScrollReveal delay={90}><div><h2>Capability you can<br /><span>build on.</span></h2><p>44 crimping machines, an in-house tool room, internal lab and moulding capacity from 35 to 180 tonnes.</p><Link href="/infrastructure" className="button button-lime">Explore our capabilities <ArrowIcon /></Link></div></ScrollReveal><ScrollReveal className="statement-number" delay={170} direction="right">D<span>/</span>A</ScrollReveal></div></section>

      <section className="quality-band quality-feature">
        <div className="container quality-band-inner">
          <ScrollReveal className="quality-feature-image" direction="left"><ImagePanel src={images.qualityLab} alt="Quality testing and inspection equipment" className="quality-lab-image" /><span className="factory-image-caption">QUALITY · CHECKED AT EVERY STEP</span></ScrollReveal>
          <ScrollReveal className="quality-feature-copy" direction="right">
            <Eyebrow>QUALITY ISN’T A CHECKBOX</Eyebrow><h2>It&apos;s how we<br /><span>do things.</span></h2>
            <p>Quality is designed into our work, supported by our certified management systems and in-house quality checks.</p>
            <div className="quality-seals"><div className="quality-seal"><span>IATF</span><strong>16949</strong><small>QUALITY SYSTEM</small></div><div className="quality-seal"><span>ISO</span><strong>9001</strong><small>QUALITY MANAGEMENT</small></div></div>
            <Link href="/quality" className="text-button">Explore our quality approach <ArrowIcon /></Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="customers-section section-space"><div className="container customer-row"><ScrollReveal><Eyebrow>BUILT TO BE TRUSTED</Eyebrow><h2>Good work grows<br />through <span>partnership.</span></h2><p>We value the long-term relationships that help the industry keep moving.</p><Link href="/customers" className="text-button">Meet our customers <ArrowIcon /></Link></ScrollReveal><ScrollReveal className="customer-wordmark-grid" delay={130} direction="right"><div className="customer-wordmark">MARUTI<span>SUZUKI</span></div><div className="customer-wordmark fiem">FIEM<span>INDUSTRIES</span></div><div className="customer-caption">A growing network<br />of industry partners</div><div className="customer-cross">✳</div></ScrollReveal></div></section>

      <section className="locations-editorial">
        <div className="locations-editorial-image" style={{ backgroundImage: `url("${images.factory}")` }} />
        <div className="container locations-editorial-inner">
          <ScrollReveal><Eyebrow light>THREE LOCATIONS · ONE COMMITMENT</Eyebrow><h2>Rooted here.<br /><span>Ready to connect.</span></h2><p>With locations in Samaypur and Bawana, Delhi, and at Kharkhoda, Haryana, we’re close to the people and businesses we work with.</p><Link href="/locations" className="button button-lime">Find our locations <ArrowIcon /></Link></ScrollReveal>
          <ScrollReveal className="location-pin-list" delay={150} direction="right"><span><i>01</i> SAMAYPUR <small>DELHI</small></span><span><i>02</i> BAWANA <small>DELHI</small></span><span><i>03</i> KHARKHODA <small>HARYANA</small></span></ScrollReveal>
        </div>
      </section>

      <section className="careers-teaser"><div className="container careers-teaser-inner"><div><Eyebrow light>MAKE YOUR NEXT MOVE</Eyebrow><h2>Build what<br />moves <span>people.</span></h2><p>Thoughtful work. Shared purpose. Room to grow. Find your place at Deep Auto.</p><Link href="/careers" className="button button-lime">Explore careers <ArrowIcon /></Link></div><ImagePanel src={images.production} alt="People working in manufacturing" className="careers-image" /><div className="careers-shape">D<span>/</span>A</div></div></section>

      <section className="home-cta"><div className="container home-cta-inner"><Eyebrow>HAVE SOMETHING IN MIND?</Eyebrow><h2>Let&apos;s make the<br /><span>right connection.</span></h2><Link href="/rfq" className="button button-dark">Start your RFQ <ArrowIcon /></Link><p>Tell us what you&apos;re working on. We&apos;ll take it from there.</p></div></section>
      <FloatingActions />
    </div>
  );
}

export function PageHero({ eyebrow, title, lead, image, compact = false }: { eyebrow: string; title: React.ReactNode; lead: string; image?: string; compact?: boolean }) {
  return <section className={`page-hero${compact ? " page-hero-compact" : ""}`} style={image ? { backgroundImage: `linear-gradient(90deg,rgba(18,31,29,.92) 0%,rgba(18,31,29,.72) 48%,rgba(18,31,29,.28) 100%),url("${image}")` } : undefined}><div className="container page-hero-inner"><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1><p>{lead}</p><div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{eyebrow}</span></div></div></section>;
}

function SectionTitle({ eyebrow, title, text, centered = false }: { eyebrow: string; title: React.ReactNode; text?: string; centered?: boolean }) {
  return <div className={`section-title${centered ? " section-title-center" : ""}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function CategoryCard({ category }: { category: (typeof categories)[number] }) {
  return <Link className="category-feature" href={`/products/${category.slug}`}><ImagePanel src={category.image} alt={category.name} className="category-feature-image" /><span className="category-feature-index">{category.number}</span><div className="category-feature-copy"><h3>{category.name}</h3><p>{category.summary}</p><span className="text-button">Explore category <ArrowIcon /></span></div></Link>;
}

function ProductTile({ name, category, index }: { name: string; category: (typeof categories)[number]; index: number }) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return <Link className="product-tile" href={`/products/${category.slug}/${slug}`}><div className="product-tile-image" style={{ backgroundImage: `url("${category.image}")` }}><span>{String(index + 1).padStart(2, "0")}</span><span className="product-tile-arrow"><ArrowIcon diagonal /></span></div><div className="product-tile-copy"><span className="eyebrow">ENGINEERED COMPONENT</span><h3>{name}</h3><span className="text-button">Explore product <ArrowIcon /></span></div></Link>;
}

export function ProductOverview() {
  return <><PageHero eyebrow="PRODUCTS & CAPABILITIES" title={<>Components for<br /><em>every connection.</em></>} lead="A range built around the needs of modern mobility—from dependable wiring to precision-made components." image={images.harness} /><section className="section-space"><div className="container"><SectionTitle eyebrow="OUR CAPABILITIES" title={<>Built around your<br /><span>application.</span></>} text="Explore our product families and discover how we can support your next project." /><div className="category-grid">{categories.map((category) => <CategoryCard key={category.slug} category={category} />)}</div><div className="note-banner"><span className="note-icon">↗</span><p>Have a part or application in mind? <strong>Talk to our team about a custom requirement.</strong></p><Link href="/rfq" className="button button-dark">Discuss your project <ArrowIcon /></Link></div></div></section><FloatingActions /></>;
}

export function ProductCategoryPage({ slug }: { slug: string }) {
  const category = categories.find((item) => item.slug === slug);
  if (!category) return <NotFoundPage />;
  return <><PageHero eyebrow="PRODUCT CATEGORY" title={<>{category.name.split(" ").slice(0, -1).join(" ")}<br /><em>{category.name.split(" ").slice(-1)}</em></>} lead={category.summary} image={category.image} /><section className="section-space"><div className="container category-detail-grid"><div><Eyebrow>MADE FOR YOUR APPLICATION</Eyebrow><h2>Reliable by design.<br /><span>Ready for the road.</span></h2></div><p>Deep Auto Electricals develops and manufactures automotive components with a focus on fit, consistency and dependable performance. Share your application with our team to discuss requirements and specifications.</p></div><div className="container product-tiles-grid">{category.products.map((product, index) => <ProductTile key={product} name={product} category={category} index={index} />)}</div><div className="container"><div className="note-banner"><span className="note-icon">↗</span><p>Need a product tailored to your drawing or specification?</p><Link href={`/rfq?product=${category.slug}`} className="button button-dark">Request a quote <ArrowIcon /></Link></div></div></section><FloatingActions /></>;
}

export function ProductDetailPage({ categorySlug, productSlug }: { categorySlug: string; productSlug: string }) {
  const category = categories.find((item) => item.slug === categorySlug);
  const productName = category?.products.find((name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === productSlug);
  if (!category || !productName) return <NotFoundPage />;
  return <><PageHero eyebrow={category.name.toUpperCase()} title={<>{productName.split(" ").slice(0, -1).join(" ")}<br /><em>{productName.split(" ").slice(-1)}</em></>} lead="A dependable automotive component designed around your application." image={category.image} /><section className="section-space"><div className="container product-detail-grid"><div><ImagePanel src={category.image} alt={productName} className="product-detail-image" /><div className="image-caption">A closer look at our capabilities</div></div><div className="product-detail-copy"><Eyebrow>APPLICATION-LED ENGINEERING</Eyebrow><h2>Designed around<br /><span>what matters.</span></h2><p>We work with your requirements to deliver components with dependable quality and a focus on application fit. Product specifications, materials and volumes are confirmed against your approved drawing and enquiry.</p><ul className="check-list"><li>Application-specific specifications</li><li>Consistent, quality-led manufacturing</li><li>Particulars reviewed with your team</li><li>Supporting documentation on request</li></ul><Link href={`/rfq?product=${productSlug}`} className="button button-dark">Request product information <ArrowIcon /></Link></div></div></section><section className="related-section section-space"><div className="container"><SectionTitle eyebrow="EXPLORE MORE" title={<>More ways to <span>connect.</span></>} /><div className="related-grid">{categories.filter((item) => item.slug !== categorySlug).slice(0, 3).map((item) => <CategoryCard key={item.slug} category={item} />)}</div></div></section><FloatingActions /></>;
}

export function AboutPage() {
  return <><PageHero eyebrow="ABOUT DEEP AUTO" title={<>Experience that<br /><em>moves us forward.</em></>} lead="Built on a belief that dependable quality, thoughtful engineering and people who care can move an industry forward." image={images.production} /><section className="section-space"><div className="container about-intro"><div><Eyebrow>OUR STORY · SINCE 1998</Eyebrow><h2>Good work has<br />a way of <span>moving.</span></h2></div><div><p className="body-lead">Deep Auto Electricals Pvt. Ltd. has been a part of the automotive industry since 1998, making components that connect, protect and support the vehicles people rely on.</p><p>Over the years, our capabilities have grown across wire harnesses, cables, terminals, PVC sleeves, sheet metal and moulded parts. What stays constant is our focus on quality, collaboration and doing the work with care.</p><p>From our plants in Delhi and Haryana, we bring people, processes and manufacturing together to support the needs of automotive customers.</p></div></div><div className="container"><ImagePanel src={images.factory} alt="Inside a Deep Auto Electricals manufacturing facility" className="wide-image" /></div></section><section className="values-section section-space"><div className="container"><SectionTitle eyebrow="WHAT GUIDES US" title={<>A better way to<br /><span>move forward.</span></>} /><div className="values-grid"><div><span>01 / QUALITY</span><h3>Do it with care.</h3><p>Consistent work begins with attention to the details that matter.</p></div><div><span>02 / PARTNERSHIP</span><h3>Build it together.</h3><p>We listen, collaborate and work to understand the requirements behind each component.</p></div><div><span>03 / PROGRESS</span><h3>Keep moving.</h3><p>We believe every process can be improved and every connection made stronger.</p></div></div></div></section><section className="timeline-section section-space"><div className="container timeline-inner"><div><Eyebrow>THE ROAD SO FAR</Eyebrow><h2>Moving forward,<br /><span>since 1998.</span></h2><p>Our company story starts in 1998. Today, we continue to grow capabilities across products and locations.</p></div><div className="timeline"><div className="timeline-item"><span>1998</span><div><i /><strong>Deep Auto begins its journey</strong><p>A commitment to quality and automotive manufacturing takes shape.</p></div></div><div className="timeline-item timeline-current"><span>TODAY</span><div><i /><strong>Built for what moves next</strong><p>Six product families. Three locations across Delhi and Haryana.</p></div></div></div></div></section><FloatingActions /></>;
}

export function InfrastructurePage() {
  const machines = [
    { number: "44", label: "Crimping machines", detail: "For wire harness manufacturing" },
    { number: "35–180", label: "Tonne moulding range", detail: "Injection moulding capability" },
    { number: "01", label: "In-house tool room", detail: "Tooling expertise under one roof" },
    { number: "01", label: "Internal laboratory", detail: "Quality checks as part of our process" },
  ];
  return <><PageHero eyebrow="INFRASTRUCTURE" title={<>The right capability<br /><em>behind every part.</em></>} lead="People, processes and manufacturing know-how working together across our facilities." image={images.factory} /><section className="section-space"><div className="container"><SectionTitle eyebrow="BUILT TO DELIVER" title={<>A closer look at<br /><span>how we work.</span></>} text="Our infrastructure supports the precision, repeatability and care that automotive manufacturing demands." /><div className="capability-stats-grid">{machines.map((item) => <div key={item.label} className="capability-stat"><strong>{item.number}</strong><h3>{item.label}</h3><p>{item.detail}</p></div>)}</div></div></section><section className="facility-section section-space"><div className="container facility-grid"><div className="facility-image-stack"><ImagePanel src={images.engineering} alt="Engineering and tool room work" className="facility-main-image" /><ImagePanel src={images.production} alt="Production operations" className="facility-small-image" /><span className="facility-caption">ENGINEERING · PRODUCTION · QUALITY</span></div><div className="facility-copy"><Eyebrow>MADE WITH PRECISION</Eyebrow><h2>Know-how that<br /><span>works together.</span></h2><p>From the tool room to the production floor, every step is connected to the next. Our capabilities span crimping, moulding, assembly and internal quality checks.</p><div className="facility-process">{["Tool room & engineering", "Wire harness production", "Injection moulding", "In-process quality checks"].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowIcon /></div>)}</div></div></div></section><section className="locations-preview"><div className="container locations-preview-inner"><div><Eyebrow light>MADE IN NORTH INDIA</Eyebrow><h2>Local roots.<br /><span>Connected reach.</span></h2></div><div className="location-preview-list"><span>DELHI · SAMAYPUR</span><span>DELHI · BAWANA</span><span>HARYANA · KHARKHODA</span><Link href="/locations" className="text-button text-button-light">Explore plant locations <ArrowIcon /></Link></div></div></section><FloatingActions /></>;
}

export function QualityPage() {
  return <><PageHero eyebrow="QUALITY & CERTIFICATIONS" title={<>Quality in every<br /><em>step forward.</em></>} lead="A commitment built into our process, backed by certified management systems and in-house quality checks." image={images.engineering} /><section className="section-space"><div className="container quality-intro-grid"><div><Eyebrow>QUALITY BY DESIGN</Eyebrow><h2>It&apos;s a way<br />of <span>working.</span></h2></div><div><p className="body-lead">Quality is more than an inspection at the end of a process. It starts with understanding requirements and is carried through every step of manufacturing.</p><p>Our quality approach is supported by IATF 16949 and ISO 9001 management systems and an internal laboratory. Current certificate copies and validity details can be shared by our team on request.</p><Link href="/contact" className="text-button">Ask about our certifications <ArrowIcon /></Link></div></div><div className="container certificate-grid"><div className="certificate-card"><span className="certificate-icon">DAE</span><span className="eyebrow">AUTOMOTIVE QUALITY</span><strong>IATF 16949</strong><p>Automotive quality management system certification.</p><span className="certificate-status">CURRENT DETAILS AVAILABLE ON REQUEST</span></div><div className="certificate-card certificate-card-accent"><span className="certificate-icon">DAE</span><span className="eyebrow">QUALITY MANAGEMENT</span><strong>ISO 9001</strong><p>Quality management system certification.</p><span className="certificate-status">CURRENT DETAILS AVAILABLE ON REQUEST</span></div><div className="certificate-note"><span className="note-icon">↗</span><h3>Need a copy?</h3><p>Request certificate documents and validity information from our team.</p><Link href="/contact" className="text-button">Get in touch <ArrowIcon /></Link></div></div></section><section className="quality-process section-space"><div className="container"><SectionTitle eyebrow="QUALITY THROUGH EVERY STEP" title={<>Attention where<br /><span>it matters.</span></>} /><div className="quality-steps">{[["01", "Understand", "Requirements and applications begin every conversation."], ["02", "Make", "Manufacturing processes are built around care and consistency."], ["03", "Check", "Internal checks support dependable output at every stage."], ["04", "Improve", "We keep looking for ways to make the next part better."]].map((step) => <div className="quality-step" key={step[0]}><span>{step[0]}</span><h3>{step[1]}</h3><p>{step[2]}</p></div>)}</div></div></section><FloatingActions /></>;
}

export function CustomersPage() {
  return <><PageHero eyebrow="OUR CUSTOMERS" title={<>Partnerships built<br /><em>on confidence.</em></>} lead="We value the relationships, trust and collaboration that help move our industry forward." image={images.production} /><section className="section-space"><div className="container customer-page-intro"><SectionTitle eyebrow="INDUSTRY PARTNERSHIPS" title={<>Better work starts<br /><span>with trust.</span></>} text="We work alongside customers and partners across the automotive ecosystem. Every relationship is grounded in collaboration, careful manufacturing and a shared commitment to quality." /><div className="customer-partner-grid"><div><span className="customer-wordmark">MARUTI<span>SUZUKI</span></span><small>AUTOMOTIVE PARTNER</small></div><div><span className="customer-wordmark fiem">FIEM<span>INDUSTRIES</span></span><small>INDUSTRY PARTNER</small></div><div className="partner-callout"><span className="note-icon">✳</span><p>A growing network of automotive relationships</p></div></div><p className="partner-disclaimer">Partner names are shown for identification. Customer logos and references are published with the appropriate permission.</p></div></section><section className="customer-cta"><div className="container customer-cta-inner"><div><Eyebrow light>LET’S WORK TOGETHER</Eyebrow><h2>Every good partnership<br />starts with a <span>conversation.</span></h2></div><Link href="/contact" className="button button-lime">Talk to our team <ArrowIcon /></Link></div></section><FloatingActions /></>;
}

export function LocationsPage() {
  const plants = [
    { city: "Samaypur", state: "Delhi", status: "HEAD OFFICE & PLANT", query: "Samaypur Delhi" },
    { city: "Bawana", state: "Delhi", status: "MANUFACTURING LOCATION", query: "Bawana Industrial Area Delhi" },
    { city: "Kharkhoda", state: "Haryana", status: "UNIT 2", query: "Kharkhoda Haryana" },
  ];
  return <><PageHero eyebrow="PLANT LOCATIONS" title={<>Rooted in the north.<br /><em>Ready to connect.</em></>} lead="Our locations across Delhi and Haryana bring us closer to the people and industries we work with." image={images.factory} /><section className="section-space"><div className="container"><SectionTitle eyebrow="FIND OUR PLANTS" title={<>Three locations.<br /><span>One shared purpose.</span></>} text="Explore our plant locations across the National Capital Region and Haryana." /><div className="plant-grid">{plants.map((plant, index) => <article className="plant-card" key={plant.city}><div className="plant-map"><iframe title={`${plant.city} map`} src={`https://maps.google.com/maps?q=${encodeURIComponent(plant.query)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><span className="plant-index">0{index + 1}</span></div><div className="plant-card-copy"><span className="eyebrow">{plant.state.toUpperCase()} · {plant.status}</span><h3>{plant.city}</h3><p>{plant.city === "Kharkhoda" ? "Kharkhoda, Haryana. Full address and map pin to be confirmed." : `${plant.city}, ${plant.state}. Contact our team for directions and location details.`}</p><a className="text-button" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plant.query)}`} target="_blank" rel="noreferrer">Get directions <ArrowIcon diagonal /></a></div></article>)}</div><p className="location-note">For exact plant addresses and visit arrangements, please contact our team in advance.</p></div></section><div className="container"><div className="note-banner"><span className="note-icon">↗</span><p>Planning a visit? We&apos;d be happy to help you find us.</p><Link href="/contact" className="button button-dark">Get in touch <ArrowIcon /></Link></div></div><FloatingActions /></>;
}

export function LifePage() {
  return <><PageHero eyebrow="CSR & LIFE AT DEEP AUTO" title={<>People make<br /><em>the difference.</em></>} lead="A workplace built by the people behind every detail, every process and every part." image={images.factory} /><section className="section-space"><div className="container life-intro"><div><Eyebrow>OUR PEOPLE. OUR PURPOSE.</Eyebrow><h2>Good work begins<br />with <span>people.</span></h2></div><div><p className="body-lead">A responsible, collaborative workplace makes better work possible. At Deep Auto, people are at the centre of what we do—on the production floor, in our labs and across every team.</p><p>We value the different perspectives and experiences our people bring. Women empowerment and social responsibility are important parts of the kind of workplace and community we aim to build.</p><Link href="/careers" className="text-button">Explore careers at Deep Auto <ArrowIcon /></Link></div></div><div className="container life-gallery"><ImagePanel src={images.factory} alt="Manufacturing workplace" className="life-gallery-main" /><ImagePanel src={images.engineering} alt="Engineering team at work" className="life-gallery-small" /><div className="life-gallery-note"><span>✳</span><p>Different people.<br />A shared commitment.</p></div></div></section><section className="careers-teaser life-cta"><div className="container careers-teaser-inner"><div><Eyebrow light>FIND YOUR PLACE</Eyebrow><h2>Let&apos;s build<br />what&apos;s <span>next.</span></h2><p>See where a career at Deep Auto could take you.</p><Link href="/careers" className="button button-lime">Explore careers <ArrowIcon /></Link></div><ImagePanel src={images.harness} alt="Precision manufacturing" className="careers-image" /></div></section><FloatingActions /></>;
}

export function CareersPage() {
  return <><PageHero eyebrow="CAREERS AT DAEPL" title={<>Find purpose in<br /><em>what you make.</em></>} lead="Join a team that takes pride in its work, builds with care and believes in moving forward together." image={images.factory} /><section className="section-space"><div className="container careers-intro"><div><Eyebrow>YOUR NEXT MOVE</Eyebrow><h2>Make something<br /><span>that matters.</span></h2><p>From manufacturing to quality, engineering to operations, there are many ways to contribute to the work we do.</p></div><div className="careers-value-cards"><div><span>01</span><h3>Work with purpose</h3><p>Be a part of the automotive components that help bring everyday mobility to life.</p></div><div><span>02</span><h3>Learn through doing</h3><p>Build your experience in a hands-on manufacturing environment.</p></div><div><span>03</span><h3>Grow together</h3><p>Bring your perspective, share your ideas and grow with a team that moves forward together.</p></div></div></div></section><section className="job-listings section-space"><div className="container"><div className="jobs-heading"><div><Eyebrow>OPEN POSITIONS</Eyebrow><h2>Find your <span>fit.</span></h2></div><span className="jobs-count">CURRENT OPENINGS</span></div><div className="jobs-empty"><span className="jobs-empty-icon">✳</span><h3>No vacancies to share just yet.</h3><p>Our open roles will appear here. Interested in working with us? Send your details and we’ll reach out if a suitable opportunity comes up.</p><Link href="/careers/apply" className="button button-dark">Share your details <ArrowIcon /></Link></div></div></section><section className="careers-banner"><div className="container careers-banner-inner"><div><Eyebrow light>LET’S BUILD WHAT’S NEXT</Eyebrow><h2>A good place to<br /><span>make a difference.</span></h2></div><Link href="/careers/apply" className="button button-lime">Send your details <ArrowIcon /></Link></div></section><FloatingActions /></>;
}

export function ApplicationPage() {
  return <><PageHero compact eyebrow="CAREERS · GENERAL APPLICATION" title={<>Tell us a little<br /><em>about yourself.</em></>} lead="There are no current vacancies listed. Share your details and the kind of role you’re interested in." /><section className="section-space"><div className="container form-layout"><div className="form-side-note"><Eyebrow>YOUR NEXT MOVE</Eyebrow><h2>Keep your<br /><span>options open.</span></h2><p>We’ll keep your information in mind if a suitable opportunity becomes available.</p><Link href="/careers" className="text-button">Back to careers <ArrowIcon /></Link></div><EnquiryForm kind="apply" /></div></section><FloatingActions /></>;
}

export function ContactPage() {
  return <><PageHero compact eyebrow="CONTACT US" title={<>Let&apos;s start<br /><em>a conversation.</em></>} lead="From a product question to a new project, we’re here to help you make the right connection." /><section className="section-space"><div className="container contact-layout"><div className="contact-side"><Eyebrow>WE’RE HERE TO HELP</Eyebrow><h2>Tell us what<br />you&apos;re <span>looking for.</span></h2><p>Share a few details and our team will be in touch. For exact plant directions, please contact us before visiting.</p><div className="contact-locations"><div><span>01 / DELHI</span><strong>Samaypur & Bawana</strong><p>Delhi, India</p></div><div><span>02 / HARYANA</span><strong>Kharkhoda · Unit 2</strong><p>Haryana, India · Full address available on request</p></div></div><div className="contact-mark">D<span>/</span>A</div></div><EnquiryForm kind="contact" /></div></section><FloatingActions /></>;
}

export function RfqPage({ product = "" }: { product?: string }) {
  const prefilledProduct = product
    ? product.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    : "";
  return <><PageHero compact eyebrow="REQUEST A QUOTE" title={<>Let&apos;s build<br /><em>the right fit.</em></>} lead="Tell us about your requirement. Share part details, estimated quantities and a drawing if you have one." /><section className="section-space"><div className="container form-layout"><div className="form-side-note"><Eyebrow>YOUR PROJECT, OUR ATTENTION</Eyebrow><h2>Every good part<br />starts with a <span>brief.</span></h2><p>Our team will review your application and specifications. Add a drawing to give us a clearer understanding of your requirement.</p><div className="form-privacy"><span>✓</span><p>Your information is handled in line with our <Link href="/privacy">privacy policy</Link>.</p></div></div><EnquiryForm key={product} kind="rfq" product={prefilledProduct} /></div></section><FloatingActions /></>;
}

export function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return <><PageHero compact eyebrow={privacy ? "PRIVACY POLICY" : "TERMS OF USE"} title={privacy ? <>Your information,<br /><em>handled with care.</em></> : <>Clear terms.<br /><em>Clear expectations.</em></>} lead={privacy ? "A simple overview of how information shared with us may be used." : "Terms for using this website and the information available on it."} /><section className="section-space"><article className="container legal-content"><p className="legal-updated">INFORMATION FOR WEBSITE VISITORS</p>{privacy ? <><h2>Information you share</h2><p>When you use an enquiry, quote request or careers form, you may choose to share your name, company, email, phone number, project information or application details. Please do not include confidential or customer-restricted information unless you have approval to share it.</p><h2>How information may be used</h2><p>Information you provide is intended to help Deep Auto Electricals respond to your question, understand a product requirement or follow up about a potential career opportunity. Uploaded drawings, documents and CVs should only be used for the purpose for which they were shared.</p><h2>Contact and messaging</h2><p>If you contact us through a messaging service, the information in that conversation may be used to respond to your request. Please review that service’s own privacy terms before using it.</p><h2>Retention and your choices</h2><p>Information should be retained only as long as needed for its intended purpose or applicable requirements. To ask about information you have shared, please use the <Link href="/contact">contact form</Link>.</p><h2>Notice</h2><p>This page is starter website copy and must be reviewed by DAEPL’s legal counsel against its actual data practices and applicable DPDP Act 2023 requirements before publication.</p></> : <><h2>Using this website</h2><p>The content on this website is provided for general business information. Product availability, specifications, pricing and lead times are not confirmed until agreed in writing by Deep Auto Electricals Pvt. Ltd.</p><h2>Product information</h2><p>Illustrations and descriptions are indicative. Final requirements, specifications, materials, quantities and pricing must be discussed and confirmed through an authorised company representative.</p><h2>Intellectual property</h2><p>Website text, design and materials belong to Deep Auto Electricals or their respective rights holders. Customer and partner names are shown for identification; references and logos should be published only with permission.</p><h2>External services</h2><p>Links and embedded maps may be provided by third-party services. Deep Auto Electricals does not control their availability or privacy practices.</p><h2>Updates</h2><p>These terms are starter website copy and should be reviewed by DAEPL’s legal counsel before publication. This website preview does not create a contract or confirm that any enquiry has been received.</p></>}</article></section><FloatingActions /></>;
}

export function ThankYouPage() {
  return <section className="thankyou-page"><div className="container thankyou-inner"><span className="thankyou-check">✓</span><Eyebrow>THANK YOU FOR REACHING OUT</Eyebrow><h1>Good things start<br />with a <span>connection.</span></h1><p>This preview doesn’t send submissions. For follow-up, please connect the production enquiry form to DAEPL’s approved inbox or CRM.</p><div className="hero-actions"><Link href="/" className="button button-dark">Back to home <ArrowIcon /></Link><Link href="/products" className="button button-outline-dark">Explore products <ArrowIcon /></Link></div></div></section>;
}

export function NotFoundPage() {
  return <section className="thankyou-page notfound-page"><div className="container thankyou-inner"><Eyebrow>PAGE NOT FOUND</Eyebrow><h1>Not every path<br />is the <span>right one.</span></h1><p>The page you’re looking for may have moved. Let’s find a better way forward.</p><Link href="/" className="button button-dark">Return home <ArrowIcon /></Link></div></section>;
}

export function AdminPreview() {
  const modules = [["01", "Products & categories", "12 products"], ["02", "Price list", "Terminal pricing"], ["03", "Certificates", "IATF 16949 · ISO 9001"], ["04", "Customer logos", "2 partner references"], ["05", "Home banners", "3 banners"], ["06", "Careers & applications", "No current vacancies"], ["07", "Enquiries & RFQs", "Demo workspace"], ["08", "Team & access", "Role-based logins"]];
  return <><PageHero compact eyebrow="ADMIN · PREVIEW" title={<>A clearer view<br /><em>of your business.</em></>} lead="A visual preview of the content-management workspace described in the proposal." /><section className="section-space"><div className="container admin-preview"><div className="admin-notice"><span>ⓘ</span><p><strong>Visual preview only.</strong> This workspace is not protected by an admin login and does not connect to a database. Do not enter real information.</p></div><div className="admin-summary"><div><span>WORKSPACE</span><strong>Deep Auto Electricals</strong></div><div><span>PREVIEW MODE</span><strong>Demo content</strong></div><div><span>YOUR WEBSITE</span><strong><Link href="/">View live preview ↗</Link></strong></div></div><h2>Website content</h2><div className="admin-modules">{modules.map((item) => <div className="admin-module" key={item[0]}><span>{item[0]}</span><div><strong>{item[1]}</strong><small>{item[2]}</small></div><ArrowIcon /></div>)}</div><div className="admin-preview-footer"><p>Production admin access requires an authenticated backend, database, secure file storage and configured user roles.</p><Link href="/" className="text-button">Return to website <ArrowIcon /></Link></div></div></section><FloatingActions /></>;
}
