"use client";
import z from "zod";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { blogFormSchema } from "@/app/(routes)/(admin)/admin/blogs/_form_schema";
import EditorMenu from "./editor-menu";
interface TiptapProps {
  value: z.infer<typeof blogFormSchema>;
  onChange: (content: Record<string, any>) => void;
}

const Tiptap: React.FC<TiptapProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      /*Stater kit */
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3 font-semibold",
          },
        },
      }),
      /*Align */
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      /*Color */
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    content: value.content?.type
      ? value.content
      : { type: "doc", content: value.content || [] },
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[300px] bg-zinc-50 border rounded-md px-3 py-2",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON(); // lấy JSON nội dung
      onChange(json);
    },
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
