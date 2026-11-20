import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  AboutPage, AdminPreview, HowWeWorkPage, ApplicationPage, CareersPage, ContactPage, CustomersPage, InfrastructurePage, JobDetailPage, LegalPage,
  LifePage, LocationsPage, ProductCategoryPage, ProductDetailPage, QualityPage, ThankYouPage,
} from "@/components/pages";
import { categories, jobs } from "@/lib/company";

const pages: Record<string, { title: string; description: string }> = {
  about: { title: "About Us — Trust On Quality since 1998", description: "Deep Auto Electricals Pvt. Ltd. — established November 1998 in Delhi. Our story, vision, quality policy, milestones, Vision 2027-28 road map and leadership." },
  "how-we-work": { title: "How We Work — From Brass Coil to Headlamp", description: "Follow a Deep Auto wire harness through our plants in an interactive 3D story: tool room, power presses, cutting & crimping, injection moulding, harness assembly and electrical testing." },
  infrastructure: { title: "Infrastructure & Machines", description: "100+ machines: 44 semi-automatic crimping machines, 15 power presses, 6 injection moulding machines (35-180 ton), heat sealing, welding, in-house tool room and internal laboratory." },
  quality: { title: "Quality & Certifications — IATF 16949 & ISO 9001", description: "IATF 16949:2016 and ISO 9001:2015 certified by Quality Austria. Quality policy, major quality aspects and internal laboratory at Deep Auto Electricals." },
  customers: { title: "Our Customers", description: "Direct customers and the OEM brands — Suzuki, Honda, Hero, TVS, Mahindra, Tata and more — that DAEPL components reach." },
  locations: { title: "Plant Locations — Samaypur, Bawana & IMT Manesar", description: "DAEPL plants at Samaypur Industrial Area and Bawana Industrial Area, Delhi, and the upcoming Unit-2 at IMT Manesar, Haryana." },
  "life-at-daepl": { title: "CSR & Life at DAEPL", description: "Women empowerment, social responsibility, Dojo training and a safe, healthy workplace at Deep Auto Electricals." },
  careers: { title: "Careers", description: "Open positions at Deep Auto Electricals in production, quality and tool room. Apply online with your CV." },
  "careers/apply": { title: "General Application", description: "Send your CV to Deep Auto Electricals for future openings." },
  contact: { title: "Contact Us", description: "Contact Deep Auto Electricals Pvt. Ltd., Samaypur Ext. Industrial Area, Delhi-110042. Phone 011-27833871, md@deepautoelectricals.com." },
  privacy: { title: "Privacy Policy", description: "How Deep Auto Electricals uses information shared through enquiry, quote and careers forms, in line with the DPDP Act 2023." },
  terms: { title: "Terms of Use", description: "Terms for using the Deep Auto Electricals website." },
  "thank-you": { title: "Thank You", description: "Thank you for contacting Deep Auto Electricals." },
  admin: { title: "Admin Preview", description: "A visual preview of the proposed DAEPL content management workspace." },
};

export function generateStaticParams() {
  const base = Object.keys(pages).map((p) => ({ slug: p.split("/") }));
  const products = categories.flatMap((c) => [{ slug: ["products", c.slug] }, ...c.products.map((p) => ({ slug: ["products", c.slug, p.slug] }))]);
  const careers = jobs.map((j) => ({ slug: ["careers", j.slug] }));
  return [...base, ...products, ...careers];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = slug.join("/");
  if (pages[route]) return { title: pages[route].title, description: pages[route].description, robots: route === "admin" || route === "thank-you" ? { index: false } : undefined };
  if (slug[0] === "products") {
    const category = categories.find((c) => c.slug === slug[1]);
    const product = category?.products.find((p) => p.slug === slug[2]);
    if (product && category) return { title: `${product.name} | ${category.name}`, description: `${product.description} Manufactured by Deep Auto Electricals, Delhi.` };
    if (category && !slug[2]) return { title: `${category.name} Manufacturer in Delhi`, description: category.summary };
  }
  if (slug[0] === "careers") {
    const job = jobs.find((j) => j.slug === slug[1]);
    if (job) return { title: `${job.title} — ${job.plant}`, description: job.summary };
  }
  return {};
}

export default async function RoutePage({ params, searchParams }: { params: Promise<{ slug: string[] }>; searchParams: Promise<{ type?: string }> }) {
  const { slug } = await params;
  const [first, second, third] = slug;
  if (slug.length > 3) notFound();
  if (first === "products") {
    if (!second) notFound();
    if (!categories.some((c) => c.slug === second)) notFound();
    if (!third) return <ProductCategoryPage slug={second} />;
    if (!categories.find((c) => c.slug === second)?.products.some((p) => p.slug === third)) notFound();
    return <ProductDetailPage categorySlug={second} productSlug={third} />;
  }
  if (first === "careers" && second) {
    if (second === "apply" && !third) return <ApplicationPage />;
    if (!third && jobs.some((j) => j.slug === second)) return <JobDetailPage slug={second} />;
    notFound();
  }
  if (second) notFound();
  switch (first) {
    case "about": return <AboutPage />;
    case "how-we-work": return <HowWeWorkPage />;
    case "infrastructure": return <InfrastructurePage />;
    case "quality": return <QualityPage />;
    case "customers": return <CustomersPage />;
    case "locations": return <LocationsPage />;
    case "life-at-daepl": return <LifePage />;
    case "careers": return <CareersPage />;
    case "contact": return <ContactPage />;
    case "privacy": return <LegalPage type="privacy" />;
    case "terms": return <LegalPage type="terms" />;
    case "thank-you": { const { type } = await searchParams; return <ThankYouPage type={type} />; }
    case "admin": return <AdminPreview />;
    default: notFound();
  }
}
