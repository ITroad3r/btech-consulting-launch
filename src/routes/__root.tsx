import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LanguageProvider, useLang } from "@/i18n/LanguageProvider";
import { BTechChatbot } from "@/components/BTechChatbot";
import { BtechWhatsAppButton } from "@/components/site/BtechWhatsAppButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-primary">Error 404</p>
        <h1 className="mt-3 text-6xl md:text-7xl font-bold text-foreground">Page not found</h1>
        <p className="mt-4 text-base text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. Explore our services or get in touch — we'd love to help.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Return home
          </Link>
          <Link to="/services" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
            Our services
          </Link>
          <Link to="/blog" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
            Read the blog
          </Link>
          <Link to="/contact" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Btech Consulting | IT Audit, Consulting & Offshoring — Paris" },
      { name: "description", content: "Btech Consulting — Paris-based IT audit, strategic consulting, and IT offshoring firm serving European and international clients." },
      { name: "author", content: "Btech Consulting" },
      { property: "og:site_name", content: "Btech Consulting" },
      { property: "og:title", content: "Btech Consulting | IT Audit, Consulting & Offshoring — Paris" },
      { property: "og:description", content: "Paris-based IT audit, strategic consulting, and IT offshoring firm." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Btechconsult1" },
      { name: "twitter:title", content: "Btech Consulting | IT Audit, Consulting & Offshoring — Paris" },
      { name: "twitter:description", content: "Paris-based IT audit, strategic consulting, and IT offshoring firm." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Outlet />
        <ChatbotMount />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

function ChatbotMount() {
  const router = useRouter();
  const path = router.state.location.pathname;
  if (path.startsWith("/admin") || path.startsWith("/login")) return null;
  return <BTechChatbot />;
}

