import TransitRail from "@/components/TransitRail";
import CityRoad from "@/components/CityRoad";
import { site } from "@/lib/site";
import { Header, Hero, Ticker, Services, Packages, Work, Testimonials, Process, Play, About, Contact, Footer } from "@/components/sections";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const ld = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  url: base,
  image: `${base}${site.portrait}`,
  email: site.email,
  address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
  sameAs: site.links.map((l) => l.href).filter((h) => !h.includes("wa.me")),
  knowsAbout: ["Web development", "Mobile app development", "Automation", "AI integration"],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <Header />
      <main>
        <Hero />
        <CityRoad />
        <Ticker />
        <Services />
        <Packages />
        <Work />
        <Testimonials />
        <Process />
        <Play />
        <About />
        <Contact />
      </main>
      <Footer />
      <TransitRail />
    </>
  );
}
