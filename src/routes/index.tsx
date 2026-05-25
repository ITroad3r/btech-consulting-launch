import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import {
  About,
  AuditConseil,
  Offshoring,
  WhyBtech,
  Industries,
  Testimonials,
  Contact,
  Footer,
} from "@/components/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Btech Consulting | IT Audit & Offshoring Experts in Paris" },
      {
        name: "description",
        content:
          "Btech Consulting is a Paris-based IT audit, consulting, and offshoring firm helping businesses transform their technology landscape with precision and expertise.",
      },
      { property: "og:title", content: "Btech Consulting | IT Audit & Offshoring — Paris" },
      {
        property: "og:description",
        content:
          "IT Audit, Strategic Consulting, and IT Offshoring — headquartered in Paris, serving Europe and beyond.",
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
      <Industries />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
