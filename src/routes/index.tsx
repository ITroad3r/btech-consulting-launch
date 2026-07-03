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
  Faq,
  Contact,
  Footer,
} from "@/components/Sections";
import { translations } from "@/i18n/translations";

const SITE_URL = "https://btech-consulting.com";

export const Route = createFileRoute("/")({
  head: () => {
    const faqItems = translations.en.faq.items;
    return {
      meta: [
        { title: "Btech Consulting | IT Audit, Consulting & Offshoring in Paris" },
        {
          name: "description",
          content:
            "Btech Consulting — Paris-based IT audit, strategic consulting, and managed IT offshoring for European and international businesses. DORA, NIS2, ISO 27001, cloud, ERP and dedicated engineering teams.",
        },
        {
          name: "keywords",
          content:
            "IT audit Paris, IT consulting France, IT offshoring, nearshoring, DORA compliance, NIS2, ISO 27001, cybersecurity audit, cloud strategy, ERP advisory, managed IT services, Btech Consulting",
        },
        { property: "og:title", content: "Btech Consulting | IT Audit & Offshoring — Paris" },
        {
          property: "og:description",
          content:
            "IT Audit, Strategic Consulting, and IT Offshoring — headquartered in Paris, serving Europe and beyond.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE_URL}/` },
        { property: "og:locale", content: "en_US" },
        { property: "og:locale:alternate", content: "fr_FR" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Btech Consulting | IT Audit & Offshoring — Paris" },
        { name: "twitter:description", content: "IT Audit, Strategic Consulting, and IT Offshoring — headquartered in Paris, serving Europe and beyond." },
      ],
      links: [
        { rel: "canonical", href: `${SITE_URL}/` },
        { rel: "alternate", hrefLang: "en", href: `${SITE_URL}/` },
        { rel: "alternate", hrefLang: "fr", href: `${SITE_URL}/` },
        { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}/` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "ProfessionalService", "ConsultingService"],
            "@id": `${SITE_URL}/#organization`,
            name: "Btech Consulting",
            alternateName: "Btech",
            url: `${SITE_URL}/`,
            logo: `${SITE_URL}/favicon.ico`,
            image: `${SITE_URL}/favicon.ico`,
            description:
              "Paris-based IT audit, strategic consulting, and IT offshoring firm serving European and international clients.",
            email: "contact@btech-consulting.com",
            telephone: "+33 6 50 31 27 50",
            priceRange: "€€",
            foundingLocation: "Paris, France",
            address: {
              "@type": "PostalAddress",
              streetAddress: "8 T Place Henri d'Astier",
              addressLocality: "Charenton-le-Pont",
              postalCode: "94220",
              addressRegion: "Île-de-France",
              addressCountry: "FR",
            },
            areaServed: [
              { "@type": "Country", name: "France" },
              { "@type": "Place", name: "European Union" },
              { "@type": "Place", name: "United Kingdom" },
              { "@type": "Place", name: "Switzerland" },
              { "@type": "Place", name: "North America" },
              { "@type": "Place", name: "Middle East" },
            ],
            knowsAbout: [
              "IT Audit",
              "IT Governance",
              "Cybersecurity",
              "DORA compliance",
              "NIS2 directive",
              "ISO 27001",
              "GDPR",
              "Cloud strategy",
              "Digital transformation",
              "ERP advisory",
              "M&A IT due diligence",
              "IT offshoring",
              "Nearshoring",
              "Managed IT services",
              "DevOps",
              "Application maintenance",
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Btech Consulting Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Audit & Governance", url: `${SITE_URL}/services` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cybersecurity Assessment", url: `${SITE_URL}/services` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "DORA & NIS2 Compliance", url: `${SITE_URL}/services` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cloud Strategy & Migration", url: `${SITE_URL}/services` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Transformation", url: `${SITE_URL}/services` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "ERP Advisory", url: `${SITE_URL}/services` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "M&A IT Due Diligence", url: `${SITE_URL}/services` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "IT Offshoring & Nearshoring", url: `${SITE_URL}/services` } },
                { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed IT Support 24/7", url: `${SITE_URL}/services` } },
              ],
            },
            sameAs: [
              "https://x.com/Btechconsult1",
              "https://www.linkedin.com/company/btech-consulting",
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: "Btech Consulting",
            url: `${SITE_URL}/`,
            inLanguage: ["en", "fr"],
            publisher: { "@id": `${SITE_URL}/#organization` },
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/blog?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${SITE_URL}/#webpage`,
            url: `${SITE_URL}/`,
            name: "Btech Consulting — IT Audit, Consulting & Offshoring",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: ["h1", "h2", "[itemprop='name']", "[itemprop='text']"],
            },
          }),
        },
      ],
    };
  },
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
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
