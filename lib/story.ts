/** "How Deep Auto works" — six chapters, one per 3D scene in /models/daepl-story.glb. */
export type StoryChapter = {
  key: "strip" | "crimp" | "mould" | "harness" | "test" | "lamp";
  step: string;
  title: string;
  lead: string;
  body: string;
  facts: { value: string; label: string }[];
  link: { href: string; label: string };
  poster: string;
};

export const storyChapters: StoryChapter[] = [
  {
    key: "strip",
    step: "Tool room & press shop",
    title: "It starts as a coil of brass.",
    lead: "Every terminal we make begins on a progressive die designed in our own tool room.",
    body: "We have built progressive tools from internal CAD drawings since 2003. Brass strip feeds through auto and semi-auto power presses that pierce, cut and form a row of terminals with every stroke — supplied in chain or loose.",
    facts: [{ value: "15", label: "power presses, 5–30 ton" }, { value: "5", label: "tool room machines incl. EDM" }, { value: "2003", label: "progressive tooling in-house" }],
    link: { href: "/products/terminals", label: "Electrical terminals" },
    poster: "/images/story/strip.webp",
  },
  {
    key: "crimp",
    step: "Cutting, stripping & crimping",
    title: "Every wire, cut and crimped to spec.",
    lead: "Wire is cut to length, stripped, and a terminal is crimped on to every end.",
    body: "Automatic machines cut and strip each wire. The terminal's wings are then folded around the copper and insulation. Crimp height, pull force and cross-section are verified in our internal laboratory.",
    facts: [{ value: "10", label: "cutting & stripping machines" }, { value: "44", label: "terminal crimping machines" }, { value: "3", label: "crimp checks: height, pull, section" }],
    link: { href: "/infrastructure", label: "Machine list" },
    poster: "/images/story/crimp.webp",
  },
  {
    key: "mould",
    step: "Plastic injection moulding",
    title: "Connector housings, moulded in-house.",
    lead: "The mould opens, and a new housing is ready for its terminals.",
    body: "Our injection moulding machines produce connector housings and plastic parts under our own roof. Crimped terminals are pushed into each cavity until they lock — so every circuit lands in the right position.",
    facts: [{ value: "6", label: "injection moulding machines" }, { value: "35–180", label: "ton clamping range" }, { value: "1", label: "roof: tooling to finished part" }],
    link: { href: "/products/plastic-moulding", label: "Plastic moulded parts" },
    poster: "/images/story/mould.webp",
  },
  {
    key: "harness",
    step: "Harness assembly",
    title: "Routed, taped and clipped — branch by branch.",
    lead: "Circuits come together on full-scale layout boards, exactly to the customer's drawing.",
    body: "Operators route each wire along the board, form the branches, then tape, clip and grommet the bundle. Head-lamp, tail-lamp, winker, meter and ADAS harnesses are all built this way. Drag the model to look around.",
    facts: [{ value: "5", label: "harness families" }, { value: "19", label: "heat sealing machines" }, { value: "2023", label: "dedicated harness plant" }],
    link: { href: "/products/wire-harnesses", label: "Wire harnesses" },
    poster: "/images/story/harness.webp",
  },
  {
    key: "test",
    step: "Electrical testing",
    title: "Every circuit, checked before it ships.",
    lead: "Finished harnesses are plugged into a dedicated electrical test board.",
    body: "The tester checks each circuit for continuity and correct connection, and only a harness that passes moves on. Our lab adds a profile projector, push-pull tester, plating thickness tester and salt spray chamber.",
    facts: [{ value: "IATF", label: "16949:2016 certified" }, { value: "ISO", label: "9001:2015 certified" }, { value: "9", label: "types of lab equipment" }],
    link: { href: "/quality", label: "Quality & certifications" },
    poster: "/images/story/test.webp",
  },
  {
    key: "lamp",
    step: "On the road",
    title: "And then, a headlamp switches on.",
    lead: "Our harnesses and parts go to lighting and component makers, and on into India's vehicles.",
    body: "Direct customers including FIEM, Napino and Neolite build our components into assemblies for Honda, Hero, Suzuki, TVS, Royal Enfield, Mahindra, Tata and other OEMs. That is the journey — from a coil of brass to a light on the road.",
    facts: [{ value: "1998", label: "trusted since" }, { value: "15+", label: "OEM brands reached" }, { value: "3", label: "plants incl. upcoming IMT Manesar" }],
    link: { href: "/customers", label: "Our customers" },
    poster: "/images/story/lamp.webp",
  },
];

/** Hotspots shown on the interactive harness (Blender node name → label). */
export const harnessHotspots: { node: string; title: string; text: string; pos: [number, number, number] }[] = [
  { node: "conn_main", title: "Main connector", text: "A 4-way housing moulded in-house. Terminals are crimped, checked and locked into each cavity.", pos: [-1.68, 0.24, 0.18] },
  { node: "conn_lamp", title: "Head-lamp branch", text: "Branches are formed on the layout board so every circuit reaches its exact point in the vehicle.", pos: [-0.75, 1.3, 0.16] },
  { node: "tape", title: "Taping, clips & grommet", text: "The bundle is taped, clipped and grommeted to drawing — so it routes and mounts correctly.", pos: [0.28, 0.12, 0.12] },
  { node: "conn_winker", title: "Winker branch", text: "Crimp height and pull force are verified before the terminal goes into its housing.", pos: [0.95, -1.26, 0.16] },
  { node: "conn_meter", title: "Meter connector", text: "Every finished harness is plugged into an electrical test board before it ships.", pos: [1.68, 0.22, 0.16] },
];
