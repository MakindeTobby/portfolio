// DRAFT copy. Anything marked TODO needs your real details.
export const site = {
  name: "Tobi Makinde",
  initials: "TM",
  role: "Software Engineer & Technical Partner",
  location: "Lagos, Nigeria",
  tz: "WAT, UTC+1",
  email: "hello@tobimakinde.com",
  portrait: "/portrait.jpg",
  heroImage: "", // TODO: a transparent PNG of your hero illustration, e.g. "/hero.png" (file in /public)
  status: "Available for projects", // TODO add a start month
  links: [
    { label: "X @Oluwatobistack", href: "https://x.com/Oluwatobistack" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/makinde-tobi/" },
    { label: "GitHub", href: "https://github.com/MakindeTobby" },
    { label: "WhatsApp", href: "https://wa.me/2348106067323" },
  ],
};

export const stops = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "packages", label: "Packages" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "play", label: "Detour" },
  { id: "about", label: "About" },
  { id: "contact", label: "Terminal" },
];

export const stack = [
  "Next.js 15",
  "TypeScript",
  "React Native",
  "Expo",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Paystack",
  "Stripe",
  "OpenRouter",
];

export const services = [
  {
    title: "Web software",
    note: "Web apps and backends built around how your business actually runs.",
  },
  {
    title: "Mobile",
    note: "iOS and Android apps your customers and team use every day.",
  },
  {
    title: "Automation & AI",
    note: "Cut repetitive work and add AI features that solve a real need.",
  },
  {
    title: "Integrations",
    note: "Connect your tools, services and data so your systems work together.",
  },
];

export const packages = [
  {
    name: "Web MVP",
    fare: "Fixed scope, quote in 48h",
    tone: "bg-surface",
    before: "An idea, or a design with no working product.",
    after: "A live web app with login, database and payments.",
    includes: [
      "Scoped plan in writing",
      "Next.js, Supabase, Paystack or Stripe",
      "Deployed, with docs",
    ],
  },
  {
    name: "Mobile app",
    fare: "Fixed scope, quote in 48h",
    tone: "bg-butter",
    before: "A web product and no app.",
    after: "An iOS and Android app, built once with Expo, on your backend.",
    includes: [
      "Expo and React Native",
      "Store build and submission help",
      "Push notifications",
    ],
  },
  {
    name: "Automation & AI",
    fare: "Fixed scope, quote in 48h",
    tone: "bg-mint",
    before: "Manual work and copy-pasting between tools.",
    after: "Workflows and AI features wired into your tools, with logs.",
    includes: [
      "Process mapped first",
      "Integrations and background jobs",
      "Monitoring and handover notes",
    ],
  },
];

export const projects = [
  {
    name: "Counselr",
    tagline: "AI contract analysis, built end to end.",
    role: "Full stack developer",
    stack: ["Next.js", "pgvector", "OpenRouter"],
    tone: "bg-butter",
    fit: "cover",
    points: [
      "Reads NDAs, service agreements and employment contracts",
      "Flags risky clauses and summarizes obligations",
      "Suggests rewrites before you sign",
    ],
    result: "",
    url: "",
    image: "/projects/counselr-homepage.png",
  },
  {
    name: "SwiftBite",
    tagline:
      "Food delivery for Ibadan, with a restaurant dashboard and a customer app.",
    role: "Web and mobile developer",
    stack: ["React Native", "Expo"],
    tone: "bg-lilac",
    fit: "contain",
    points: [
      "Restaurant dashboard for orders, menu and sales",
      "Customer app with menus, categories and prices in naira",
    ],
    result: "",
    url: "",
    image: "/projects/swiftbite.webp",
  },
  {
    name: "Maxi Care Plus",
    tagline: "A website for an NDIS care and support provider.",
    role: "Web developer",
    stack: ["Next.js"],
    tone: "bg-pink",
    fit: "cover",
    points: [
      "Website for a registered NDIS provider in Canberra",
      "Clear paths to refer someone, find support or get in touch",
    ],
    result: "",
    url: "",
    image: "/projects/maxicare.webp",
  },
  {
    name: "Shemewé Collective",
    tagline: "A website for a workplace wellbeing consultancy.",
    role: "Web developer",
    stack: ["Next.js"],
    tone: "bg-mint",
    fit: "cover",
    points: [
      "Modern alternatives to the traditional employee assistance program",
      "Wellness circles and group support, with a clear booking call to action",
    ],
    result: "",
    url: "",
    image: "/projects/shemewe.webp",
  },
]; // TODO: roles and points are drafts. Add a real result, a live url, and a Counselr screenshot (in /public/projects).

export const steps = [
  {
    title: "You send a brief",
    text: "Tell me what the product should do. A short call is optional.",
  },
  {
    title: "I quote a fixed price",
    text: "Scope, price and timeline in writing before any work starts.",
  },
  {
    title: "I build in milestones",
    text: "You see working builds along the way, so nothing is a surprise.",
  },
  {
    title: "I hand it over",
    text: "You get the code, the docs and a walkthrough.",
  },
];

export const checklist = [
  "Scope and price agreed in writing",
  "Tested on real devices and browsers",
  "Errors and edge cases handled",
  "Environment setup and docs handed over",
  "You own the source code on final payment",
];

export const intents = [
  { label: "I have an idea", pkg: 0 },
  { label: "I need an app", pkg: 1 },
  { label: "My work is too manual", pkg: 2 },
  { label: "Not sure yet", pkg: -1 },
];

export const testimonials = [
  {
    quote:
      "I have worked with Tobi since 2023. He built two websites for me and provided me with additional digital systems support. I have always found Tobi to be honest, courteous and attentive to his work and have continued to work with him because of his commitment to quality work. Tobi’s communication skills and capacity for cross cultural working relationships set him apart from many of his peers. He is a valued colleague in my network.",
    name: "Toni Hanna",
    initials: "TH",
    role: "Group Facilitator, Trainer, Practitioner & Consultant",
    relation: "Client",
    date: "October 2026",
  },
  {
    quote:
      "I highly recommend Tobi as a Frontend & Mobile Developer. With expertise in React.js, Next.js, and Expo React Native, Oluwatobi excels at building fast, scalable digital products for startups. His technical skill and product-driven mindset make him a great asset to any team.",
    name: "Taye Abolarin",
    initials: "TA",
    role: "Product Designer",
    relation: "Teammate",
    date: "May 2025",
  },
];
