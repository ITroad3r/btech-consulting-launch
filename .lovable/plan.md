## Goal

No back office exists yet. Build one so you can edit any page content and manage blog posts (with SEO + rich text) without code changes.

## 1. Backend (Lovable Cloud)

Enable Lovable Cloud and create:

- **Auth**: email/password login for admins only.
- **`user_roles` table** + `has_role()` security-definer function (admin role).
- **`site_content` table**: `key` (e.g. `home.hero.title`, `about.intro`), `value_en`, `value_fr`, `type` (text/richtext/image_url/list). Seeded from the current `translations.ts` so nothing is lost.
- **`blog_posts` table**: `id`, `slug`, `status` (draft/published), `published_at`,
  `title_en/fr`, `excerpt_en/fr`, `body_html_en/fr` (rich HTML),
  `cover_image_url`, `author`, `tags[]`,
  **SEO fields**: `meta_title_en/fr`, `meta_description_en/fr`, `canonical_url`, `og_image_url`, `keywords`, `noindex` (bool), `json_ld` (jsonb for structured data).
- **Storage bucket** `media` (public) for blog images and uploaded assets.
- **RLS**: public can read published posts + site_content; only admins can write.

## 2. Admin Back Office (`/admin`)

Protected under `_authenticated` + admin role check. Includes:

- **Dashboard** — quick links + recent posts.
- **Site Content editor** — grouped by page (Home, About, Services, Contact, Footer). Each field has EN/FR tabs. Text fields use a simple input; long-form fields use the rich editor.
- **Blog manager** — list, create, edit, publish/unpublish, delete.
- **Blog editor** with:
  - **Rich text editor** (Tiptap) for title + body with toolbar: bold, italic, underline, strike, headings H1–H4, font family, font size, text color, highlight, lists, quote, code, link, image upload, alignment, undo/redo.
  - **SEO panel**: meta title, meta description, slug, canonical, OG image upload, keywords, noindex toggle, JSON-LD preview (auto-generated Article schema, editable).
  - **Live preview** pane.
  - EN/FR side-by-side language tabs.
- **Media library** — upload/manage images in the `media` bucket.
- **Settings** — site name, default SEO, social links, contact email/phone/address (replaces hardcoded values).

## 3. Frontend wiring

- Replace hardcoded `translations.ts` reads with a `useSiteContent(key)` hook backed by a single server-loaded snapshot (cached, revalidated).
- `/blog` lists posts from DB; `/blog/$slug` renders post with full SEO `head()` (title, description, canonical, og:*, JSON-LD) driven by the post's SEO fields.
- Contact info (email, phone, address) + social links pulled from settings table.

## 4. Technical notes

- Editor: **Tiptap** (`@tiptap/react`, starter-kit, color, text-style, font-family, underline, link, image, text-align, highlight).
- Sanitize stored HTML on render with **DOMPurify**.
- Image uploads go to Supabase Storage, return public URL inserted into editor.
- First admin user: after signup, run a one-time SQL to grant admin role (I'll provide the snippet).
- Existing translations are migrated as seed data so the live site looks identical on day one.

## 5. Rollout order

1. Enable Cloud → create schema + seed.
2. Build auth + admin shell + role guard.
3. Site content editor + dynamic frontend wiring.
4. Blog: schema → list/editor with Tiptap + SEO panel → public `/blog` + `/blog/$slug` routes.
5. Media library + settings.

## Confirm before I start

- OK to enable **Lovable Cloud** (creates the backend automatically — no external accounts)?
- Admin login: **email + password** only, or also **Google sign-in**?
- For the first admin account: should I use **your email** (tell me which) so I can pre-grant admin, or will you sign up and I'll grant admin after?