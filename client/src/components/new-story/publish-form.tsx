import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/class-name";
import { formVariants } from "./animation-variant";
import TagsInput from "./tag-input";
import { Button } from "../Common/Button";
import { XIcon } from "lucide-react";
import StoryTitleInput from "./story-title";
import StoryThumbnailPicker from "./story-thumbnal-picker";
import DescriptionInput from "../Common/description-input";
import { useState } from "react";
import { blogSchema } from "@/validations";
import toast from "react-hot-toast";
import { useAddBlog, useUploadImage } from "./hooks";
import type { PropsWithChildren } from "react";
import type { PropsWithClassname } from "@/types";
import type { StoryState } from "@/pages/new-story";
import type z from "zod";

type Props = {
  story: StoryState;
  onStoryChange: <K extends keyof StoryState>(
    key: K
  ) => (value: StoryState[K]) => void;
  onClose: () => void;
};

type FormErrors = z.inferFlattenedErrors<typeof blogSchema>["fieldErrors"];

const PublishForm = ({ story, onStoryChange, onClose }: Props) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const { mutate: addBlog, isPending } = useAddBlog();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const isCreating = isPending || isUploading;

  async function handleSubmit() {
    const validation = blogSchema.safeParse({
      ...story,
      content: JSON.stringify(story.content),
    });
    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    const formdata = new FormData();
    formdata.set("image", validation.data.thumbnail);
    const res = await uploadImage(formdata);
    if (!res?.filePath) {
      toast.error("Failed to create blog");
      return;
    }
    addBlog({ ...validation.data, thumbnail: res.filePath });
  }

  function getButtonLabel() {
    const isDraft = story.type === "draft";
    if (isCreating) {
      return "Submitting";
    }

    return isDraft ? "Save as Draft" : "Publish";
  }

  return (
    <FormWrapper className="relative lg:px-[15vw] md:px-[7vw] px-[5vw] grid grid-cols-1 gap-x-16 lg:grid-cols-2 space-y-6 pt-20">
      <Button
        variant="naked"
        size="sm"
        className="absolute top-4 right-1"
        onClick={onClose}
        aria-label="Close publish form"
      >
        <XIcon className="size-4 text-gray-500" />
      </Button>
      <div className="space-y-4">
        <p className="text-base font-semibold text-zinc-900 font-inter">
          Story Preview
        </p>
        <StoryThumbnailPicker
          onChange={onStoryChange("thumbnail")}
          value={story.thumbnail}
        />

        <StoryTitleInput
          onChange={onStoryChange("title")}
          value={story.title}
          error={errors.title?.join(", ")}
        />
      </div>
      <div className="space-y-4 pt-8">
        <DescriptionInput
          label="Description/Summary"
          value={story.summary}
          onChange={onStoryChange("summary")}
          id="summary"
          error={errors.summary?.join(", ")}
        />
        <p className="text-sm text-zinc-700">
          Add or change topics (up to 5) so readers know what your story is
          about
        </p>
        <TagsInput
          onTagsChange={onStoryChange("tags")}
          initialTags={story.tags}
        />
        <div className="space-x-2">
          <Button
            variant={"green"}
            disabled={!story.title}
            onClick={handleSubmit}
            loading={isCreating}
          >
            {getButtonLabel()}
          </Button>
          <Button onClick={onClose} variant={"secondary"}>
            Cancel
          </Button>
        </div>
      </div>
    </FormWrapper>
  );
};

export default PublishForm;

const FormWrapper = ({
  children,
  className,
}: PropsWithChildren & PropsWithClassname) => {
  return (
    <motion.section
      variants={formVariants}
      className={cn(className)}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.section>
  );
};
