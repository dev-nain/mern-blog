import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import type { BlockNoteEditor } from "@blocknote/core";
import { useEffect } from "react";

export default function StoryEditor({
  onChange,
  initialContent,
}: {
  onChange: (document: BlockNoteEditor["document"]) => void;
  initialContent: BlockNoteEditor["document"] | null;
}) {
  const editor = useCreateBlockNote({
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
      className="max-w-3xl mx-auto"
      onChange={() => onChange(editor.document)}
    />
  );
}
