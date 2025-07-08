import StoryEditor from "@/components/story-editor";
import type { BlockNoteEditor } from "@blocknote/core";
import { useState } from "react";

const NewStoryPage = () => {
  const [content, setContent] = useState<BlockNoteEditor["document"] | null>(
    null
  );
  const [initilContent] = useState<BlockNoteEditor["document"] | null>(null);

  return <StoryEditor onChange={setContent} initialContent={initilContent} />;
};

export default NewStoryPage;
