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
      { property: "og:url", content: "https://btech-consulting.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://btech-consulting.com/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Btech Consulting",
          url: "https://btech-consulting.com/",
          logo: "https://btech-consulting.com/favicon.ico",
          description: "Paris-based IT audit, strategic consulting, and IT offshoring firm.",
          email: "contact@btech-consulting.com",
          telephone: "+33 6 50 31 27 50",
          address: {
            "@type": "PostalAddress",
            streetAddress: "8 T Place Henri d'Astier",
            addressLocality: "Charenton-le-Pont",
            postalCode: "94220",
            addressCountry: "FR",
          },
          sameAs: ["https://x.com/Btechconsult1"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Btech Consulting",
          url: "https://btech-consulting.com/",
        }),
      },
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
