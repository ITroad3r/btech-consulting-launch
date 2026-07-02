import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { Highlight } from "@tiptap/extension-highlight";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  Bold, Italic, Underline as UIcon, Strikethrough, Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Code, Link as LinkIcon, Image as ImgIcon,
  AlignLeft, AlignCenter, AlignRight, Undo, Redo, Highlighter,
} from "lucide-react";
import { useRef } from "react";

const FONTS = ["Inter", "Georgia", "Times New Roman", "Arial", "Courier New", "Verdana"];
const SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px", "48px"];

function ToolbarBtn({ active, onClick, children, title }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-muted ${active ? "bg-muted text-primary" : ""}`}
    >
      {children}
    </button>
  );
}

export function RichEditor({
  value, onChange, placeholder,
}: { value: string; onChange: (html: string) => void; placeholder?: string }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      FontFamily.configure({ types: ["textStyle"] }),
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "underline text-primary" } }),
      Image,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: placeholder ?? "Write your content..." }),
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[300px] p-4 focus:outline-none [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_a]:text-primary",
      },
    },
  });

  if (!editor) return null;

  const uploadImage = async (file: File) => {
    const path = `blog/${Date.now()}-${file.name.replace(/[^a-z0-9.\\-_]/gi, "_")}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) return alert(error.message);
    const { data } = supabase.storage.from("media").getPublicUrl(path);
    editor.chain().focus().setImage({ src: data.publicUrl }).run();
  };

  return (
    <div className="border rounded-md bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b p-2 sticky top-0 bg-background z-10">
        <ToolbarBtn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></ToolbarBtn>
        <ToolbarBtn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></ToolbarBtn>
        <ToolbarBtn title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UIcon size={16} /></ToolbarBtn>
        <ToolbarBtn title="Strike" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={16} /></ToolbarBtn>
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarBtn title="H1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}><Heading1 size={16} /></ToolbarBtn>
        <ToolbarBtn title="H2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></ToolbarBtn>
        <ToolbarBtn title="H3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></ToolbarBtn>
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarBtn title="Bulleted" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></ToolbarBtn>
        <ToolbarBtn title="Numbered" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></ToolbarBtn>
        <ToolbarBtn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></ToolbarBtn>
        <ToolbarBtn title="Code" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code size={16} /></ToolbarBtn>
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarBtn title="Align left" onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={16} /></ToolbarBtn>
        <ToolbarBtn title="Align center" onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={16} /></ToolbarBtn>
        <ToolbarBtn title="Align right" onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={16} /></ToolbarBtn>
        <div className="w-px h-6 bg-border mx-1" />
        <select
          className="text-xs bg-background border rounded px-1 py-1"
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          defaultValue=""
          title="Font family"
        >
          <option value="">Font</option>
          {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
        <select
          className="text-xs bg-background border rounded px-1 py-1"
          onChange={(e) => {
            const size = e.target.value;
            if (size) editor.chain().focus().setMark("textStyle", { style: `font-size:${size}` } as any).run();
          }}
          defaultValue=""
          title="Font size"
        >
          <option value="">Size</option>
          {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input
          type="color"
          className="w-7 h-7 rounded border cursor-pointer"
          title="Text color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        />
        <ToolbarBtn title="Highlight" active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}><Highlighter size={16} /></ToolbarBtn>
        <div className="w-px h-6 bg-border mx-1" />
        <ToolbarBtn title="Link" onClick={() => {
          const url = prompt("URL");
          if (url) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}><LinkIcon size={16} /></ToolbarBtn>
        <ToolbarBtn title="Insert image" onClick={() => fileRef.current?.click()}><ImgIcon size={16} /></ToolbarBtn>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
          const f = e.target.files?.[0]; if (f) uploadImage(f);
          e.target.value = "";
        }} />
        <div className="ml-auto flex gap-1">
          <ToolbarBtn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo size={16} /></ToolbarBtn>
          <ToolbarBtn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo size={16} /></ToolbarBtn>
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

import DOMPurify from "isomorphic-dompurify";

export function SafeHtml({ html, className }: { html: string; className?: string }) {
  const clean = DOMPurify.sanitize(html, { ADD_ATTR: ["target", "style"] });
  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}
