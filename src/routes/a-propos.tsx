import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À Propos — Btech Consulting Paris" },
      { name: "description", content: "Notre vision boutique : expertise technique de haut niveau et réactivité immédiate. Excellence, innovation pragmatique et engagement long terme." },
    ],
  }),
  component: () => (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 mx-auto max-w-4xl px-6">
        <h1 className="font-display text-5xl">À Propos</h1>
        <p className="mt-6 text-muted-foreground">Page en construction.</p>
      </section>
    </main>
  ),
});
