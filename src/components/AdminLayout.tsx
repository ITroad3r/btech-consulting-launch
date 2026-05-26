import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useAuth, useIsAdmin } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Settings, FileEdit, LogOut, ExternalLink } from "lucide-react";

export function AdminLayout() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin(user);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || (user && roleLoading)) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass rounded-2xl p-8 max-w-md text-center">
          <h1 className="text-xl font-semibold">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account ({user.email}) does not have admin access.
            Ask the site owner to grant your account the admin role.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">Your user ID:</p>
          <code className="block text-xs bg-muted px-2 py-1 rounded mt-1 break-all">{user.id}</code>
          <Button
            variant="outline"
            className="mt-6"
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}
          >Sign out</Button>
        </div>
      </div>
    );
  }

  const links = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/blog", label: "Blog", icon: FileText },
    { to: "/admin/content", label: "Site Content", icon: FileEdit },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="w-60 border-r p-4 flex flex-col gap-1 sticky top-0 h-screen">
        <div className="px-2 py-3">
          <div className="font-display text-lg font-semibold">Back Office</div>
          <div className="text-xs text-muted-foreground truncate">{user.email}</div>
        </div>
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            activeOptions={{ exact: l.to === "/admin" }}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted [&.active]:bg-muted [&.active]:text-primary"
          >
            <l.icon size={16} /> {l.label}
          </Link>
        ))}
        <div className="mt-auto flex flex-col gap-1">
          <a href="/" target="_blank" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted">
            <ExternalLink size={16} /> View site
          </a>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted text-left"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-x-hidden"><Outlet /></main>
    </div>
  );
}
