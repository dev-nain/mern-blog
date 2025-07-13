import { createBlog, uploadImage } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useAddBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    retry: 2,
    mutationKey: ["blogs", "create", "new"],
    mutationFn: createBlog,
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["blogs", "list"] });
      toast.success(
        `Story ${data.data.type === "draft" ? "Created" : "Published"}`
      );
      navigate("/");
    },
    onError() {
      toast.error("Failed to create new story, please try again");
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    retry: 2,
    mutationKey: ["blogs", "create", "new", "image"],
    mutationFn: uploadImage,
    onError() {
      toast.error("Failed to upload image, please try again");
    },
  });
};
