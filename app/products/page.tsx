import type { Metadata } from "next";
import { ProductOverview } from "@/components/pages";

export const metadata: Metadata = {
  title: "Products — Wire Harnesses, Terminals, Sheet Metal & Moulded Parts",
  description: "Head lamp, tail lamp, winker, meter and ADAS wire harnesses; female, flag, male and female terminals; CRCA and compounding sheet metal parts; plastic moulded parts — manufactured by DAEPL, Delhi.",
};

export default function Products() {
  return <ProductOverview />;
}
