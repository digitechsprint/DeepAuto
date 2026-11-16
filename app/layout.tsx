import type { Metadata, Viewport } from "next";
import { FloatingActions, SiteFooter, SiteHeader } from "@/components/site";
import { ScrollEffects } from "@/components/scroll-effects";
import { company, plants } from "@/lib/company";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.deepautoelectricals.com"),
  title: {
    default: "Deep Auto Electricals (DAEPL) | Wire Harness, Terminal & Sheet Metal Manufacturer, Delhi",
    template: "%s | Deep Auto Electricals",
  },
  description:
    "Deep Auto Electricals Pvt. Ltd. (DAEPL) — IATF 16949:2016 & ISO 9001:2015 certified manufacturer of automotive wire harnesses, electrical terminals, sheet metal and plastic moulded parts in Delhi since 1998. Trust On Quality.",
  keywords: ["wire harness manufacturer Delhi", "automotive wire harness", "electrical terminals", "sheet metal components", "plastic moulding", "IATF 16949", "DAEPL", "Deep Auto Electricals"],
  openGraph: { siteName: "Deep Auto Electricals", locale: "en_IN", type: "website", images: ["/daepl-logo.svg"] },
};

export const viewport: Viewport = { themeColor: "#0b1f3a" };

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: "DAEPL",
  slogan: company.tagline,
  foundingDate: "1998-11",
  url: "https://www.deepautoelectricals.com",
  logo: "https://www.deepautoelectricals.com/daepl-logo.svg",
  email: company.email,
  telephone: "+91-11-27833871",
  address: { "@type": "PostalAddress", streetAddress: "Khasra No. 23/8, 23/9, Samaypur Ext. Industrial Area, Badli Station Road, Opp. Yadav Nagar", addressLocality: "Delhi", postalCode: "110042", addressCountry: "IN" },
  location: plants.filter((p) => p.operational).map((p) => ({ "@type": "Place", name: `${p.name} — ${p.city}`, address: p.address })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <SiteHeader />
        <ScrollEffects />
        <main>{children}</main>
        <SiteFooter />
        <FloatingActions />
      </body>
    </html>
  );
}
