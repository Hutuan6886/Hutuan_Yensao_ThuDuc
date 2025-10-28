"use client";

import { useEffect, useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

type Props = {
  editor: Editor | null;
};

export default function EditorMenu({ editor }: Props) {
  const [, setRender] = useState(0);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    if (!editor) return;
    const update = () => {
      setRender((r) => r + 1);
      // 🔹 Lấy màu text hiện tại từ marks của editor
      const currentColor = editor.getAttributes("textStyle")?.color;
      if (currentColor) {
        setColor(currentColor);
      } else {
        setColor("#000000"); // Mặc định
      }
    };

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  if (!editor) return null;

  const toolbarGroups = [
    {
      type: "single" as const,
      options: [
        {
          value: "h1",
          icon: <Heading1 />,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => editor.isActive("heading", { level: 1 }),
        },
        {
          value: "h2",
          icon: <Heading2 />,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => editor.isActive("heading", { level: 2 }),
        },
        {
          value: "h3",
          icon: <Heading3 />,
          onClick: () =>
            editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: () => editor.isActive("heading", { level: 3 }),
        },
      ],
    },
    {
      type: "multiple" as const,
      options: [
        {
          value: "bold",
          icon: <Bold />,
          onClick: () => editor.chain().focus().toggleBold().run(),
          isActive: () => editor.isActive("bold"),
        },
        {
          value: "italic",
          icon: <Italic />,
          onClick: () => editor.chain().focus().toggleItalic().run(),
          isActive: () => editor.isActive("italic"),
        },
        {
          value: "underline",
          icon: <Underline />,
          onClick: () => editor.chain().focus().toggleUnderline().run(),
          isActive: () => editor.isActive("underline"),
        },
      ],
    },
    {
      type: "single" as const,
      options: [
        {
          value: "align-left",
          icon: <AlignLeft />,
          onClick: () => editor.chain().focus().setTextAlign("left").run(),
          isActive: () => editor.isActive({ textAlign: "left" }),
        },
        {
          value: "align-center",
          icon: <AlignCenter />,
          onClick: () => editor.chain().focus().setTextAlign("center").run(),
          isActive: () => editor.isActive({ textAlign: "center" }),
        },
        {
          value: "align-right",
          icon: <AlignRight />,
          onClick: () => editor.chain().focus().setTextAlign("right").run(),
          isActive: () => editor.isActive({ textAlign: "right" }),
        },
      ],
    },
    {
      type: "single" as const,
      options: [
        {
          value: "bullet-list",
          icon: <List />,
          onClick: () => editor.chain().focus().toggleBulletList().run(),
          isActive: () => editor.isActive("bulletList"),
        },
        {
          value: "ordered-list",
          icon: <ListOrdered />,
          onClick: () => editor.chain().focus().toggleOrderedList().run(),
          isActive: () => editor.isActive("orderedList"),
        },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border bg-background p-2">
      {/* Undo / Redo */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo className="w-4 h-4" />
      </Button>

      <Separator orientation="vertical" className="h-5" />

      {/* Render từng group riêng biệt */}
      {toolbarGroups.map((group, i) => {
        const activeValues = group.options
          .filter((opt) => opt.isActive())
          .map((opt) => opt.value);

        // 🔹 Dùng phân nhánh rõ ràng thay vì truyền type động
        if (group.type === "single") {
          return (
            <ToggleGroup
              key={i}
              type="single"
              value={activeValues[0] ?? ""}
              onValueChange={() => {}}
            >
              {group.options.map((item) => (
                <ToggleGroupItem
                  key={item.value}
                  value={item.value}
                  onClick={item.onClick}
                  aria-label={item.value}
                >
                  {item.icon}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          );
        } else {
          return (
            <ToggleGroup
              key={i}
              type="multiple"
              value={activeValues}
              onValueChange={() => {}}
            >
              {group.options.map((item) => (
                <ToggleGroupItem
                  key={item.value}
                  value={item.value}
                  onClick={item.onClick}
                  aria-label={item.value}
                >
                  {item.icon}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          );
        }
      })}
      <Separator orientation="vertical" className="h-5" />
      {/* Extra buttons: Link, Image */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          const url = prompt("Enter image URL");
          // if (url) editor.chain().focus().setImage({ src: url }).run();
        }}
      >
        <ImageIcon className="w-4 h-4" />
      </Button>
      <Separator orientation="vertical" className="h-5" />
      {/* 🎨 Text color */}
      <Input
        type="color"
        value={color}
        onChange={(e) => {
          const newColor = e.target.value;
          setColor(newColor);
          editor.chain().focus().setColor(newColor).run();
        }}
        className="h-8 w-8 cursor-pointer rounded border p-1"
        title="Chọn màu chữ"
      />

      {/* 🧹 Reset màu */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => {
          setColor("#000000");
          editor.chain().focus().unsetColor().run();
        }}
      >
        🧽
      </Button>
    </div>
  );
}
