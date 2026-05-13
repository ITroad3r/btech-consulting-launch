import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import {
  About,
  AuditConseil,
  Offshoring,
  WhyBtech,
  Contact,
  Footer,
} from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Btech Consulting — Audit IT, Conseil & Offshoring à Paris" },
      {
        name: "description",
        content:
          "Btech Consulting : cabinet boutique d'Audit IT, Conseil Risques Informatiques et Offshoring à Paris (8ᵉ, La Défense, Boulogne-Billancourt). GRC, ISO 27001, RGPD, Cloud.",
      },
      { property: "og:title", content: "Btech Consulting — Audit IT & Offshoring Paris" },
      {
        property: "og:description",
        content:
          "Partenaire stratégique pour la transformation digitale, la conformité GRC et l'infogérance sur mesure à Paris.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <AuditConseil />
      <Offshoring />
      <WhyBtech />
      <Contact />
      <Footer />
    </main>
  );
}
