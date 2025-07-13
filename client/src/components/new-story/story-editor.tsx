import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import type { BlockNoteEditor } from "@blocknote/core";
import { useEffect } from "react";
import { codeBlock } from "@blocknote/code-block";
import { cn } from "@/lib/class-name";
import { en } from "@blocknote/core/locales";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

export default function StoryEditor({
  onChange,
  initialContent,
  className,
}: {
  onChange: (document: BlockNoteEditor["document"]) => void;
  initialContent: BlockNoteEditor["document"] | null;
  className?: string;
}) {
  const locale = en;
  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        default: "Tell you story...",
      },
    },
    codeBlock,
    ...(initialContent ? { initialContent } : {}),
  });

  useEffect(() => {
    if (editor) {
      editor.focus();
    }
  }, [editor]);

  return (
    <BlockNoteView
      editor={editor}
      className={cn("font-gelasio text-zinc-800", className)}
      onChange={() => onChange(editor.document)}
    />
  );
}
