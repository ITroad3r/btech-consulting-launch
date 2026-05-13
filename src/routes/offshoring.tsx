import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/offshoring")({
  head: () => ({
    meta: [
      { title: "Offshoring IT & Managed Services — Btech Consulting" },
      { name: "description", content: "Infogérance 24/7, support N1/N2/N3, centres de services globaux, développeurs Full-stack et experts Data." },
    ],
  }),
  component: () => (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 mx-auto max-w-4xl px-6">
        <h1 className="font-display text-5xl">Offshoring & Managed Services</h1>
        <p className="mt-6 text-muted-foreground">Page en construction.</p>
      </section>
    </main>
  ),
});
