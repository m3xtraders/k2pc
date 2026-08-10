"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Minus,
} from "lucide-react";
import { sanitizeHtml } from "@/lib/sanitizer";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write content here...",
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#BE2320] underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg my-4 max-w-full h-auto",
        },
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-stone max-w-none min-h-[220px] p-4 text-stone-900 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const rawHtml = editor.getHTML();
      const cleanHtml = sanitizeHtml(rawHtml);
      onChange(cleanHtml);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="w-full h-56 bg-stone-50 border border-stone-300 rounded-lg animate-pulse" />
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-stone-300 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#BE2320]/20 focus-within:border-[#BE2320] transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-stone-50 border-b border-stone-200 text-stone-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded hover:bg-stone-200 transition-colors ${
            editor.isActive("bold") ? "bg-stone-200 text-[#BE2320] font-bold" : ""
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded hover:bg-stone-200 transition-colors ${
            editor.isActive("italic") ? "bg-stone-200 text-[#BE2320]" : ""
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded hover:bg-stone-200 transition-colors ${
            editor.isActive("strike") ? "bg-stone-200 text-[#BE2320]" : ""
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-stone-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded hover:bg-stone-200 transition-colors ${
            editor.isActive("heading", { level: 2 }) ? "bg-stone-200 text-[#BE2320] font-bold" : ""
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded hover:bg-stone-200 transition-colors ${
            editor.isActive("heading", { level: 3 }) ? "bg-stone-200 text-[#BE2320] font-bold" : ""
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-stone-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded hover:bg-stone-200 transition-colors ${
            editor.isActive("bulletList") ? "bg-stone-200 text-[#BE2320]" : ""
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded hover:bg-stone-200 transition-colors ${
            editor.isActive("orderedList") ? "bg-stone-200 text-[#BE2320]" : ""
          }`}
          title="Ordered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded hover:bg-stone-200 transition-colors ${
            editor.isActive("blockquote") ? "bg-stone-200 text-[#BE2320]" : ""
          }`}
          title="Blockquote"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-stone-300 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-1.5 rounded hover:bg-stone-200 transition-colors ${
            editor.isActive("link") ? "bg-stone-200 text-[#BE2320]" : ""
          }`}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded hover:bg-stone-200 transition-colors"
          title="Horizontal Line"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-stone-300 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1.5 rounded hover:bg-stone-200 transition-colors"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1.5 rounded hover:bg-stone-200 transition-colors"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Canvas */}
      <EditorContent editor={editor} />
    </div>
  );
};
