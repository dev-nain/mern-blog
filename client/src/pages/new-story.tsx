import { withAuth } from "@/components/Layout/protected-route";
import PublishForm from "@/components/new-story/publish-form";
import StoryEditor from "@/components/new-story/story-editor";
import StoryThumbnailPicker from "@/components/new-story/story-thumbnal-picker";
import StoryTitleInput from "@/components/new-story/story-title";
import Topbar from "@/components/new-story/topbar";
import type { BlockNoteEditor } from "@blocknote/core";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

export type StoryType = "publish" | "draft";

export type StoryState = {
  content: BlockNoteEditor["document"] | null;
  title: string;
  thumbnail: File | null;
  tags: string[];
  summary: string;
  type: StoryType | null;
};

const initialState: StoryState = {
  content: null,
  title: "",
  thumbnail: null,
  tags: [],
  summary: "",
  type: null,
};

const Page = () => {
  const [story, setStory] = useState<StoryState>(initialState);

  const handleFormChange =
    <K extends keyof StoryState>(key: K) =>
    (value: StoryState[K]) => {
      setStory((story) => ({ ...story, [key]: value }));
    };

  return (
    <main className="font-gelasio">
      {!story.type && (
        <>
          <Topbar
            onPublish={() => handleFormChange("type")("publish")}
            onDraft={() => handleFormChange("type")("draft")}
            isActionDisabled={!story.title}
          />

          <section className="max-w-3xl mx-auto py-8 px-10 space-y-8">
            <StoryThumbnailPicker
              onChange={handleFormChange("thumbnail")}
              value={story.thumbnail}
            />
            <StoryTitleInput
              onChange={handleFormChange("title")}
              value={story.title}
            />
            <StoryEditor
              className="transform -translate-x-12 pt-4"
              onChange={handleFormChange("content")}
              initialContent={story.content}
            />
          </section>
        </>
      )}

      {story.type && (
        <AnimatePresence>
          <PublishForm
            story={story}
            onStoryChange={handleFormChange}
            onClose={() => handleFormChange("type")(null)}
          />
        </AnimatePresence>
      )}
    </main>
  );
};

const NewStoryPage = withAuth(Page);

export default NewStoryPage;
