import StoryEditor from "@/components/story-editor";
import type { BlockNoteEditor } from "@blocknote/core";
import { useState } from "react";

const NewStoryPage = () => {
  const [content, setContent] = useState<BlockNoteEditor["document"] | null>(
    null
  );
  return (
    <div>
      <StoryEditor onChange={setContent} initialContent={content} />
    </div>
  );
};

export default NewStoryPage;
