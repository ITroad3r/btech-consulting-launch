import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Btech Consulting Paris" },
      { name: "description", content: "Contactez Btech Consulting à Paris 8ᵉ, La Défense et Boulogne-Billancourt." },
    ],
  }),
  component: () => (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 mx-auto max-w-4xl px-6">
        <h1 className="font-display text-5xl">Contact</h1>
        <p className="mt-6 text-muted-foreground">Page en construction.</p>
      </section>
    </main>
  ),
});
