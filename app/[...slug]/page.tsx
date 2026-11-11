import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  AboutPage,
  AdminPreview,
  ApplicationPage,
  CareersPage,
  ContactPage,
  CustomersPage,
  InfrastructurePage,
  LegalPage,
  LocationsPage,
  ProductCategoryPage,
  ProductDetailPage,
  ProductOverview,
  QualityPage,
  RfqPage,
  ThankYouPage,
  LifePage,
} from "@/components/pages";

const categorySlugs = ["wire-harnesses", "cables", "terminals", "pvc-sleeves", "sheet-metal", "plastic-moulding"];
const productSlugs: Record<string, string[]> = {
  "wire-harnesses": ["headlamp-harness", "tail-lamp-harness", "meter-harness", "adas-harness"],
  cables: ["automotive-cables", "custom-cable-assemblies"],
  terminals: ["connector-terminals", "battery-terminals"],
  "pvc-sleeves": ["protective-pvc-sleeves", "custom-sleeves"],
  "sheet-metal": ["precision-sheet-metal-parts"],
  "plastic-moulding": ["custom-plastic-mouldings"],
};
const pages: Record<string, { title: string; description: string }> = {
  about: { title: "About Deep Auto", description: "Meet Deep Auto Electricals. Automotive manufacturing and trusted relationships, since 1998." },
  infrastructure: { title: "Infrastructure & Capabilities", description: "Explore Deep Auto Electricals' automotive manufacturing capability, tool room and internal lab." },
  quality: { title: "Quality & Certifications", description: "Learn about Deep Auto Electricals' IATF 16949 and ISO 9001 certified quality systems." },
  customers: { title: "Our Customers", description: "Learn about the customer and industry partnerships behind Deep Auto Electricals." },
  locations: { title: "Plant Locations", description: "Find Deep Auto Electricals locations in Samaypur, Bawana and Kharkhoda." },
  "life-at-daepl": { title: "CSR & Life at Deep Auto", description: "Discover our people, shared purpose and commitment to social responsibility." },
  careers: { title: "Careers", description: "Explore career opportunities and share your details with Deep Auto Electricals." },
  contact: { title: "Contact", description: "Get in touch with Deep Auto Electricals in Delhi and Haryana." },
  privacy: { title: "Privacy Policy", description: "Learn how information shared through this website may be used." },
  terms: { title: "Terms of Use", description: "Terms for using the Deep Auto Electricals website." },
  "thank-you": { title: "Thank You", description: "Thank you for reaching out to Deep Auto Electricals." },
  admin: { title: "Admin Preview", description: "A visual preview of the proposed Deep Auto Electricals content management workspace." },
};

export function generateStaticParams() {
  const paths = Object.keys(pages).map((slug) => ({ slug: [slug] }));
  const productPaths = categorySlugs.flatMap((category) => [
    { slug: ["products", category] },
    ...productSlugs[category].map((product) => ({ slug: ["products", category, product] })),
  ]);
  return [...paths, ...productPaths, { slug: ["careers", "apply"] }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const route = slug.join("/");
  const data = pages[route];
  if (data) return { title: data.title, description: data.description };
  if (route.startsWith("products/")) {
    const title = route
      .split("/")
      .slice(1)
      .map((part) => part.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()))
      .join(" — ");
    return {
      title,
      description: `Explore application-focused automotive products and manufacturing capabilities from Deep Auto Electricals.`,
    };
  }
  return {};
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const [first, second, third] = slug;
  if (first === "products") {
    if (!second) return <ProductOverview />;
    if (!third) return <ProductCategoryPage slug={second} />;
    return <ProductDetailPage categorySlug={second} productSlug={third} />;
  }
  if (first === "careers" && second === "apply") return <ApplicationPage />;
  const route = second ? "" : first;
  switch (route) {
    case "about": return <AboutPage />;
    case "infrastructure": return <InfrastructurePage />;
    case "quality": return <QualityPage />;
    case "customers": return <CustomersPage />;
    case "locations": return <LocationsPage />;
    case "life-at-daepl": return <LifePage />;
    case "careers": return <CareersPage />;
    case "contact": return <ContactPage />;
    case "privacy": return <LegalPage type="privacy" />;
    case "terms": return <LegalPage type="terms" />;
    case "thank-you": return <ThankYouPage />;
    case "admin": return <AdminPreview />;
    default: notFound();
  }
}
