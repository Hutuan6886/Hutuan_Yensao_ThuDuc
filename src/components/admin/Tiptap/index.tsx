"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import EditorMenu from "./editor-menu";
import { TextStyle } from "@tiptap/extension-text-style";

const Tiptap = () => {
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
            class: "list-decimal ml-3",
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
    content: "",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[300px] bg-zinc-50 border rounded-md px-3 py-2",
      },
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
