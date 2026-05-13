import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/audit-conseil")({
  head: () => ({
    meta: [
      { title: "Audit IT & Conseil — Btech Consulting Paris" },
      { name: "description", content: "Audit de sécurité, GRC, ISO 27001, RGPD, migration Cloud AWS/Azure. Conseil Risques Informatiques à Paris." },
    ],
  }),
  component: () => (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-20 mx-auto max-w-4xl px-6">
        <h1 className="font-display text-5xl">Audit & Conseil</h1>
        <p className="mt-6 text-muted-foreground">Page en construction.</p>
      </section>
    </main>
  ),
});
