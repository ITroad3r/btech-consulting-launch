import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/$slug")({
  beforeLoad: ({ params }) => {
    let lang: "en" | "fr" = "en";
    try {
      if (typeof window !== "undefined") {
        const stored = window.localStorage.getItem("btech-lang");
        if (stored === "fr") lang = "fr";
      }
    } catch {}
    throw redirect({ to: "/blog/$lang/$slug", params: { lang, slug: params.slug }, replace: true });
  },
});
