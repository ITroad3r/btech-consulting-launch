import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminLayout,
});
