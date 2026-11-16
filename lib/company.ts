/**
 * Deep Auto Electricals Pvt. Ltd. — website content.
 * Source: "Deep_Auto Company Profile" and "DAEPL Website Details".
 * Items marked CONFIRM need sign-off from DAEPL before launch.
 */

export const company = {
  name: "Deep Auto Electricals Pvt. Ltd.",
  short: "DAEPL",
  tagline: "Trust On Quality",
  founded: "November 1998",
  since: 1998,
  certifications: "IATF 16949:2016 & ISO 9001:2015 certified",
  address: ["Khasra No. 23/8, 23/9, Samaypur Ext. Industrial Area,", "Badli Station Road, Opp. Yadav Nagar,", "Delhi – 110042, India"],
  addressLine: "Khasra No. 23/8, 23/9, Samaypur Ext. Industrial Area, Badli Station Road, Opp. Yadav Nagar, Delhi – 110042",
  landline: "011-2783 3871",
  landlineHref: "tel:+911127833871",
  phone: "+91 93124 30747",
  phoneHref: "tel:+919312430747",
  // CONFIRM: WhatsApp Business number (MD's mobile used until confirmed).
  whatsappHref: "https://wa.me/919312430747?text=Hello%20DAEPL%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products.",
  email: "md@deepautoelectricals.com",
  website: "www.deepautoelectricals.com",
  hours: "Monday – Saturday · 9:30 AM – 6:00 PM", // CONFIRM
  industries: ["Automobile", "General Engineering", "Electrical & Electronics"],
};

export const contacts = [
  { name: "Mr. Deepak Aggarwal", role: "Managing Director · Sales & Marketing", phone: "+91 93124 30747", phoneHref: "tel:+919312430747", alt: "+91 93101 92290", email: "md@deepautoelectricals.com", topic: "New business, quotations & partnerships" },
  { name: "Mr. Gulab Sharma", role: "MR & Quality Head", phone: "+91 79762 27566", phoneHref: "tel:+917976227566", email: "quality@deepautoelectricals.com", topic: "Quality, audits & certification" },
  { name: "Mr. Pradeep Bansal", role: "Production & Dispatch Head", phone: "+91 93101 92282", phoneHref: "tel:+919310192282", email: "production@deepautoelectricals.com", topic: "Production planning & dispatch" },
];

export const img = {
  heroHarness: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=2200&q=85",
  heroEngineering: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2200&q=85",
  heroFactory: "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=2200&q=85",
  heroQuality: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=2200&q=85",
  wireCutting: "/images/facility/wire-cutting.jpg",
  crimping: "/images/facility/crimping.jpg",
  powerPress: "/images/facility/power-press.jpg",
  welding: "/images/facility/welding.jpg",
  moulding: "/images/facility/moulding.jpg",
  toolRoom: "/images/facility/tool-room.jpg",
  office: "/images/facility/office.jpg",
  shopFloor: "/images/facility/shop-floor.jpg",
  storage: "/images/facility/storage.jpg",
  lab: "/images/facility/lab.jpg",
  labInstruments: "/images/facility/lab-instruments.jpg",
  labTesting: "/images/facility/lab-testing.jpg",
  women: "/images/csr/women-empowerment.jpg",
  certIatf: "/images/certificates/iatf.jpg",
  certIso: "/images/certificates/iso.jpg",
  certIqnet: "/images/certificates/iqnet.jpg",
};

export type Product = {
  slug: string;
  name: string;
  short: string;
  image: string;
  description: string;
  application: string;
  specs: [string, string][];
};

export type Category = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  summary: string;
  image: string;
  photo: string;
  plant: string;
  capabilities: string[];
  products: Product[];
};

const harnessSpecs = (application: string): [string, string][] => [
  ["Product type", "Assembly wire harness"],
  ["Application", application],
  ["Process", "Automatic cut, strip & crimp · semi-automatic crimping · heat sealing"],
  ["Quality checks", "Crimp cross-section, push-pull test, electrical testing on harness tester"],
  ["Manufactured at", "Samaypur & Bawana, Delhi"],
  ["Built to", "Customer drawing & specification"],
];

export const categories: Category[] = [
  {
    slug: "wire-harnesses",
    number: "01",
    name: "Wire Harnesses",
    tagline: "Lighting, instrumentation & ADAS",
    summary: "Assembly wire harnesses for head lamps, tail lamps, winkers, meters and ADAS modules — cut, crimped, sealed and tested in-house.",
    image: "/images/products/headlamp-harness.jpg",
    photo: img.crimping,
    plant: "Samaypur & Bawana, Delhi",
    capabilities: ["10 wire cutting & stripping machines", "44 semi-automatic crimping machines", "19 heat sealing machines", "Electrical testing on harness tester"],
    products: [
      { slug: "head-lamp-harness", name: "Head Lamp Assembly Wire Harness", short: "Head lamp assembly", image: "/images/products/headlamp-harness.jpg", description: "A wire harness that connects the head lamp assembly to the vehicle's electrical system, built for a secure fit and dependable performance on the road.", application: "Vehicle head lamp assemblies", specs: harnessSpecs("Head lamp assemblies") },
      { slug: "tail-lamp-harness", name: "Tail Lamp Assembly Wire Harness", short: "Tail lamp assembly", image: "/images/products/taillamp-harness.jpg", description: "Harness assemblies for rear combination and tail lamps, with bulb-holder connections manufactured to customer drawing.", application: "Tail lamp & rear combination lamp assemblies", specs: harnessSpecs("Tail lamp assemblies") },
      { slug: "winker-harness", name: "Winker Assembly Wire Harness", short: "Winker assembly", image: "/images/products/winker-harness.jpg", description: "Compact harnesses for winker (turn-signal) assemblies, combining crimped terminals, bulb holders and connectors.", application: "Winker / turn-signal lamp assemblies", specs: harnessSpecs("Winker assemblies") },
      { slug: "meter-harness", name: "Meter Assembly Wire Harness", short: "Meter assembly", image: "/images/products/meter-harness.jpg", description: "Multi-circuit harnesses for instrument clusters and meter assemblies, with colour-coded wiring for easy, error-free installation.", application: "Instrument cluster & meter assemblies", specs: harnessSpecs("Meter / instrument cluster assemblies") },
      { slug: "adas-harness", name: "ADAS Assembly Wire Harness", short: "ADAS assembly", image: "/images/products/adas-harness.jpg", description: "Harnesses for advanced driver-assistance system modules — a growing business area for DAEPL since 2021.", application: "ADAS sensor & camera modules", specs: harnessSpecs("ADAS modules") },
    ],
  },
  {
    slug: "terminals",
    number: "02",
    name: "Electrical Terminals",
    tagline: "In chain & loose",
    summary: "Female, flag, male and female electrical terminals produced on progressive tools designed in our own tool room — where DAEPL began in 1998.",
    image: "/images/products/male-female-terminals.jpg",
    photo: img.powerPress,
    plant: "Samaypur, Delhi",
    capabilities: ["Progressive tools from in-house CAD drawings", "15 auto & semi-auto power presses (5–30 ton)", "Supplied in chain (reel) and loose", "Plating thickness & hardness testing"],
    products: [
      { slug: "female-flag-terminals", name: "Female & Flag Terminals", short: "Female & flag", image: "/images/products/female-flag-terminals.jpg", description: "Female and flag-type terminals stamped on progressive tools, supplied in chain for automatic crimping or loose for manual assembly.", application: "Wire harness & lighting connections", specs: [["Product type", "Female & flag electrical terminals"], ["Supply format", "Chain (reel) & loose"], ["Process", "Progressive-tool stamping on power presses"], ["Tooling", "Designed & built in our in-house tool room"], ["Quality checks", "Profile projector, plating thickness, hardness"], ["Built to", "Customer drawing & specification"]] },
      { slug: "male-female-terminals", name: "Male & Female Terminals", short: "Male & female", image: "/images/products/male-female-terminals.jpg", description: "Matched male and female terminal pairs for secure, repeatable electrical connections in automotive and electrical applications.", application: "Connector systems & wire harnesses", specs: [["Product type", "Male & female electrical terminals"], ["Supply format", "Chain (reel) & loose"], ["Process", "Progressive-tool stamping on power presses"], ["Tooling", "Designed & built in our in-house tool room"], ["Quality checks", "Profile projector, plating thickness, hardness"], ["Built to", "Customer drawing & specification"]] },
    ],
  },
  {
    slug: "sheet-metal",
    number: "03",
    name: "Sheet Metal Components",
    tagline: "Pressed, formed & welded",
    summary: "CRCA, chamber and compounding sheet metal parts — pressed, formed and spot or projection welded with tooling maintained in-house.",
    image: "/images/products/crca-sheet-metal.jpg",
    photo: img.welding,
    plant: "Samaypur, Delhi",
    capabilities: ["Power presses from 5 to 30 ton", "3 spot & 1 projection welding machine", "In-house dies with EDM, milling & surface grinding", "Salt spray testing for corrosion resistance"],
    products: [
      { slug: "crca-chamber-parts", name: "CRCA & Chamber Sheet Metal Parts", short: "CRCA & chamber", image: "/images/products/crca-sheet-metal.jpg", description: "Cold-rolled (CRCA) and chamber sheet metal parts, pressed and welded into ready-to-assemble components.", application: "Lamp, bracket & body assemblies", specs: [["Product type", "CRCA & chamber sheet metal parts"], ["Process", "Blanking, piercing, forming, spot & projection welding"], ["Tooling", "In-house die making with EDM, milling & surface grinding"], ["Quality checks", "Profile projector, hardness, salt spray testing"], ["Manufactured at", "Samaypur, Delhi"], ["Built to", "Customer drawing & specification"]] },
      { slug: "compounding-parts", name: "Compounding Sheet Metal Parts", short: "Compounding parts", image: "/images/products/compounding-sheet-metal.jpg", description: "Precision compounding sheet metal parts — clips, contacts and formed brackets produced with compound and progressive tools.", application: "Electrical & automotive sub-assemblies", specs: [["Product type", "Compounding sheet metal parts"], ["Process", "Compound & progressive tool pressing"], ["Tooling", "In-house die making with EDM, milling & surface grinding"], ["Quality checks", "Profile projector, hardness, plating thickness"], ["Manufactured at", "Samaypur, Delhi"], ["Built to", "Customer drawing & specification"]] },
    ],
  },
  {
    slug: "plastic-moulding",
    number: "04",
    name: "Plastic Moulded Parts",
    tagline: "35 – 180 ton injection moulding",
    summary: "Injection-moulded housings, holders and components on machines from 35 to 180 tonnes, with moulds made and maintained in our tool room.",
    image: "/images/products/moulded-parts.jpg",
    photo: img.moulding,
    plant: "Bawana, Delhi (Vinayak Industries)",
    capabilities: ["6 injection moulding machines (35–180 ton)", "Moulds designed & maintained in-house", "Integrated with harness assembly lines", "Dimensional checks on profile projector"],
    products: [
      { slug: "moulded-parts", name: "Plastic Moulded Parts", short: "Moulded parts", image: "/images/products/moulded-parts.jpg", description: "Injection-moulded bulb holders, housings, rings and covers — often moulded and assembled with our own wire harnesses.", application: "Lamp holders, housings & connector bodies", specs: [["Product type", "Injection-moulded plastic parts"], ["Machines", "35, 50, 90, 150 & 180 ton"], ["Tooling", "Moulds designed & maintained in-house"], ["Quality checks", "Dimensional inspection on profile projector"], ["Manufactured at", "Bawana, Delhi"], ["Built to", "Customer drawing & specification"]] },
    ],
  },
];

export const allProducts = categories.flatMap((c) => c.products.map((p) => ({ ...p, category: c })));

export const stats = [
  { value: 1998, label: "Established", suffix: "", plain: true },
  { value: 100, label: "Machines across processes", suffix: "+" },
  { value: 44, label: "Semi-automatic crimping machines", suffix: "" },
  { value: 15, label: "OEM brands our parts reach", suffix: "+" },
];

export const machineGroups = [
  { title: "Wire cutting, stripping & terminal crimping", image: img.wireCutting, total: 10, rows: [["Wire cutting & stripping", "06", "Machine Maker"], ["Wire cutting, stripping & terminal crimping", "04", "Sai Paradise"]] },
  { title: "Terminal & joint crimping", image: img.crimping, total: 44, rows: [["Semi-automatic crimping", "32", "Regenato"], ["Semi-automatic crimping", "12", "Sai Paradise"]] },
  { title: "Auto & semi-auto power presses", image: img.powerPress, total: 15, rows: [["Power press 25 / 30 ton", "02 / 02", "Devson / Micron"], ["Power press 5 / 10 ton", "03 / 08", "Dadiala / Devson"]] },
  { title: "Spot, projection welding & heat sealing", image: img.welding, total: 23, rows: [["Spot / projection welding", "03 / 01", "Amit Co."], ["Heat sealing", "19", "Sai Paradise"]] },
  { title: "Plastic injection moulding", image: img.moulding, total: 6, rows: [["Moulding machine 90 / 150 / 180 ton", "01 / 01 / 01", "Nippo, SH, L&T"], ["Moulding machine 35 / 50 ton", "02 / 01", "Romax, Nippo"]] },
  { title: "In-house tool room", image: img.toolRoom, total: 5, rows: [["Electrical discharge machine (EDM)", "01", "Press Match"], ["Milling / surface grinder", "01 / 03", "PMT / Guru Arjun"]] },
];

export const labEquipment = [
  { name: "Profile projector", use: "Dimensional inspection of terminals, parts & dies" },
  { name: "Crimp cross-section analysis", use: "Crimp height & cross-section ratio verification" },
  { name: "Push-pull tester", use: "Crimp pull-force testing (portable)" },
  { name: "Harness tester", use: "Electrical testing of wire harnesses" },
  { name: "Coating / plating thickness tester", use: "Plating thickness on terminals" },
  { name: "Rockwell hardness tester", use: "Hardness of raw material & die plates" },
  { name: "Salt spray chamber", use: "Corrosion resistance testing" },
  { name: "Lux meter", use: "Illumination checks for lighting assemblies" },
  { name: "Magnification inspection", use: "Visual inspection of crimps & finish" },
];

export const milestones = [
  { year: "1998", title: "Founded", text: "Deep Auto Electricals is established in November 1998 with the scope of terminal manufacturing." },
  { year: "2003", title: "Progressive tooling", text: "Terminal progressive tools introduced, designed from internal CAD drawings." },
  { year: "2008", title: "Wire harness & sheet metal", text: "Manufacturing scope grows to wire harnesses and sheet metal for existing and new customers." },
  { year: "2012", title: "New customers", text: "New customer relationships built on our existing manufacturing scope." },
  { year: "2016", title: "Automation & laboratory", text: "Automation introduced in wire harness and terminal manufacturing; internal laboratory established. ISO 9001 first certified." },
  { year: "2019", title: "Certified growth", text: "Re-certification for ISO 9001 & IATF 16949 and a period of significant business growth." },
  { year: "2021", title: "ADAS & two-wheeler", text: "New customers approached for ADAS and two-wheeler wire harness business." },
  { year: "2023", title: "New harness plant", text: "A new plant dedicated to the wire harness business." },
  { year: "2024", title: "Certificates renewed", text: "IATF 16949:2016 and ISO 9001:2015 certificates renewed by Quality Austria, valid to 2027." },
];

export const roadmap = [
  { year: "2022–23", title: "ERP data system", text: "Service-based data system (ERP) across operations." },
  { year: "2023–24", title: "New unit & EMS", text: "Adding a new unit and an environmental management system." },
  { year: "2024–25", title: "Lean & safe", text: "Reducing inventory and improving 5S and safety." },
  { year: "2025–26", title: "New resources", text: "Adding new resources for our plants." },
  { year: "2026–27", title: "Plant expansion", text: "Expansion of existing plant capacity." },
  { year: "2027–28", title: "Domestic & export", text: "Adding new customers in India and export markets." },
];

export const vision = [
  { title: "Globally recognised", text: "To become one of the leading, globally recognised organisations in the automotive sector through effective leadership, continuous technical upgradation and synchronisation with customer requirements in wiring harness and sheet metal products." },
  { title: "First choice", text: "To be the first choice of our customers, consistently, by establishing a robust quality system — bringing pride to our employees and suppliers." },
  { title: "Responsible", text: "To fulfil our social and civil responsibilities and create a safe and healthy working environment." },
];

export const qualityPolicy = {
  statement: "Deep Auto Electricals is committed to enhance customer satisfaction through continual improvement in all its products and services.",
  pillars: [
    { title: "Adaptability", text: "A positive attitude to adopt new concepts." },
    { title: "Dojo", text: "Training that improves skills and communication across the organisation." },
    { title: "Motivation", text: "Enhancing the skill set of our workers and motivating them towards quality." },
  ],
};

export const qualityAspects = [
  { number: "01", title: "Product launch", points: ["Standards, specifications & standard operating procedures", "Process FMEA (PFMEA) for every product"] },
  { number: "02", title: "Quality assets", points: ["Process control, inspection & testing methods", "Standardisation & horizontal deployment"] },
  { number: "03", title: "Part inspection", points: ["Eye-sequence inspection", "Visualisation & clear communication on the shop floor"] },
];

export const certificates = [
  { code: "IATF 16949:2016", title: "Automotive Quality Management System", image: img.certIatf, details: [["Registration no.", "T-08040/0"], ["IATF registration no.", "0543561"], ["Issued", "09 September 2024"], ["Valid until", "08 September 2027"]] },
  { code: "ISO 9001:2015", title: "Quality Management System", image: img.certIso, details: [["Registration no.", "Q-20826/0"], ["First issued", "29 June 2016"], ["Issued", "09 September 2024"], ["Valid until", "08 September 2027"]] },
];
export const certScope = "Manufacture of wire harness and sheet metal components";
export const certBody = "Quality Austria (IQNET member, IAF accredited)";

export const strengths = [
  { title: "Everything in-house", text: "Terminals, stamping, moulding and harness assembly under one roof." },
  { title: "In-house tool room", text: "Mould and die making with our own design capability." },
  { title: "Fast development", text: "Quick new-product development from drawing to sample." },
  { title: "Flexible to you", text: "Very flexible to customer requirements and schedule changes." },
  { title: "Poka-yoke", text: "Error-proofing built into our manufacturing processes." },
  { title: "Immediate response", text: "Quick, direct communication with decision makers." },
  { title: "Committed delivery", text: "Strong adherence to our commitments on quality, cost & delivery." },
  { title: "Skilled team", text: "Experienced, skilled team members trained through Dojo." },
  { title: "Young, innovative team", text: "A young team that brings fresh ideas to every project." },
  { title: "Reasonable cost", text: "Competitive pricing without compromising on quality." },
];

export const leadership = [
  { name: "Mr. B K Aggarwal", role: "Chairman & Finance Head", level: 1 },
  { name: "Mr. Deepak Aggarwal", role: "Managing Director & Marketing Head", level: 2 },
  { name: "Mr. Gulab Sharma", role: "MR & Quality Head", level: 3 },
  { name: "Mr. Pradeep Bansal", role: "Production & Dispatch Head", level: 3 },
  { name: "Mr. Upendra Singh", role: "NPD Head", level: 3 },
  { name: "Mr. Vijay Chauhan", role: "Tool Room Head", level: 3 },
  { name: "Mr. D K Aggarwal", role: "HR Head", level: 3 },
  { name: "Mr. Akash Shrivastav", role: "IT Head", level: 3 },
  { name: "Mr. Sunil Negi", role: "Accounts Head", level: 3 },
];

// CONFIRM: display permission for customer names / logos.
export const directCustomers = ["FIEM", "THRSL", "NAPINO", "NEOLITE", "JNS", "JAY", "NEOKRAFT GLOBAL", "KK", "INDIGRID TECHNOLOGY"];
export const oemBrands = ["Suzuki", "Honda", "Hero", "TVS", "Royal Enfield", "Mahindra", "Tata", "Eicher", "JCB", "Nissan", "Mercedes-Benz", "Volvo", "MAN", "Piaggio", "General Motors"];

export const plants = [
  { slug: "samaypur", number: "01", name: "Deep Auto Electricals", city: "Samaypur", state: "Delhi", status: "Head office & plant", operational: true, scope: "Wire harness & sheet metal components", address: company.addressLine, query: "Samaypur Ext Industrial Area Badli Station Road Delhi 110042" },
  { slug: "bawana", number: "02", name: "Vinayak Industries", city: "Bawana", state: "Delhi", status: "Manufacturing plant", operational: true, scope: "Wire harness & plastic moulding parts", address: "Bawana Industrial Area, New Delhi", query: "Bawana Industrial Area New Delhi" },
  { slug: "manesar", number: "03", name: "Deep Auto Electricals (Unit-2)", city: "IMT Manesar", state: "Haryana", status: "Upcoming", operational: false, scope: "Wire harness & sheet metal components", address: "IMT Manesar, Haryana", query: "IMT Manesar Haryana" },
];

export const facilities = [
  { title: "Shop floor", image: img.shopFloor, points: ["Good 5S & clean shop floor", "Work instructions & SOPs displayed in the local language", "Material flow with identification & job cards"] },
  { title: "Material storage", image: img.storage, points: ["FIFO for identification & traceability", "Colour-coded material identification", "Material handling SOPs"] },
  { title: "Office", image: img.office, points: ["Good 5S & clean office area", "Experienced staff focused on customer satisfaction", "A flexible team for customer requirements"] },
];

export type Job = {
  slug: string;
  title: string;
  department: string;
  plant: string;
  type: string;
  experience: string;
  qualification: string;
  openings: number;
  lastDate: string;
  summary: string;
  responsibilities: string[];
};

// CONFIRM: sample vacancies — replace with HR-approved openings (managed from the admin panel).
export const jobs: Job[] = [
  { slug: "crimping-machine-operator", title: "Crimping Machine Operator", department: "Production", plant: "Samaypur", type: "Full time", experience: "0 – 3 years", qualification: "ITI / 10th / 12th", openings: 6, lastDate: "2026-12-31", summary: "Operate semi-automatic crimping machines on our wire harness lines, following work instructions and quality checks.", responsibilities: ["Set up and operate semi-automatic crimping machines", "Check crimp quality as per work instruction", "Maintain 5S at the workstation", "Record production and report deviations"] },
  { slug: "quality-inspector", title: "Quality Inspector", department: "Quality", plant: "Samaypur", type: "Full time", experience: "2 – 4 years", qualification: "Diploma (Electrical / Mechanical)", openings: 2, lastDate: "2026-12-31", summary: "Carry out incoming, in-process and final inspection and support IATF 16949 documentation and customer audits.", responsibilities: ["Perform incoming, in-process & final inspection", "Use profile projector, push-pull and crimp cross-section equipment", "Maintain IATF 16949 quality records", "Support customer audits & corrective actions"] },
  { slug: "tool-room-engineer", title: "Tool Room Engineer", department: "Tool Room", plant: "Samaypur", type: "Full time", experience: "3 – 6 years", qualification: "Diploma / B.Tech (Mechanical / Tool & Die)", openings: 1, lastDate: "2026-12-31", summary: "Design, build and maintain progressive tools, dies and moulds using EDM, milling and surface grinding.", responsibilities: ["Design progressive tools & moulds from CAD drawings", "Build and maintain dies with EDM, milling & grinding", "Improve tool life and changeover time", "Support new product development (NPD)"] },
  { slug: "moulding-machine-operator", title: "Moulding Machine Operator", department: "Production", plant: "Bawana", type: "Full time", experience: "1 – 3 years", qualification: "ITI / 12th", openings: 3, lastDate: "2026-12-31", summary: "Operate injection moulding machines (35–180 ton) and ensure parts meet dimensional and visual standards.", responsibilities: ["Operate injection moulding machines", "Check parts against standards", "Handle material as per FIFO", "Maintain machine & area 5S"] },
];
