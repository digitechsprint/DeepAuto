import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "@/components/site";
import { ScrollEffects } from "@/components/scroll-effects";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Deep Auto Electricals | Precision that moves you",
    template: "%s | Deep Auto Electricals",
  },
  description:
    "Automotive wire harnesses, cables, terminals and precision components. Built on quality, trusted since 1998.",
  metadataBase: new URL("https://deepautoelectricals.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        <ScrollEffects />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
