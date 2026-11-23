"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Colour options shown to the client for approval. Visit any page with ?palette=<key>. */
export const palettes = [
  { key: "graphite", label: "3 · Graphite & Orange", colors: ["#1f2329", "#ff6a13", "#f2f3f4"] },
  { key: "electric", label: "5 · Electric Blue", colors: ["#0a4fc4", "#00d26a", "#ffffff"] },
  { key: "green", label: "8 · Navy & Green", colors: ["#0b2545", "#00b35a", "#f3f7f5"] },
  { key: "wirecode", label: "10 · Wire-Code Navy", colors: ["#0f1e33", "#e8742c", "#2f7de1"] },
  { key: "current", label: "Current", colors: ["#0b1f3a", "#f37a30", "#f5f7fa"] },
];

/** Runs before paint (inline in <head>) so the chosen palette never flashes the default colours. */
export const paletteBootScript = `(function(){try{var k=["graphite","electric","green","wirecode","current"];var p=new URLSearchParams(location.search).get("palette");if(p&&k.indexOf(p)>-1){sessionStorage.setItem("daepl-palette",p);}var s=sessionStorage.getItem("daepl-palette");if(s&&s!=="current"){document.documentElement.setAttribute("data-palette",s);}if(s){document.documentElement.setAttribute("data-palette-preview","");}}catch(e){}})();`;

export function PaletteBar() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    try { setActive(sessionStorage.getItem("daepl-palette")); } catch { setActive(null); }
  }, [pathname]);
  if (!active) return null;
  return (
    <nav className="palette-bar" aria-label="Colour options for approval">
      <span>Colour option</span>
      {palettes.map((p) => (
        // Full page load so the 3D scenes pick up the new colours too.
        <a key={p.key} href={`${pathname}?palette=${p.key}`} className={active === p.key ? "is-active" : ""} aria-current={active === p.key ? "true" : undefined}>
          <i aria-hidden="true">{p.colors.map((c) => <b key={c} style={{ background: c }} />)}</i>
          {p.label}
        </a>
      ))}
    </nav>
  );
}
