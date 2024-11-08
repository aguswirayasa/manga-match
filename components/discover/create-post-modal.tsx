"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  image: yup
    .mixed<FileList>()
    .required("Image is required")
    .test("fileSize", "File size is too large", (value) => {
      return value && value.length > 0 && value[0].size <= 2 * 1024 * 1024;
    }),
  type: yup.string().required("Type is required"),
});

type FormData = {
  title: string;
  content: string;
  image: FileList;
  type: string;
};

export default function CreatePostModal() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const objectUrl = URL.createObjectURL(imageFile[0]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image", data.image[0]);
    formData.append("type", data.type);

    try {
      const result = await axios.post("/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (result.status === 200) {
        toast.success("Post successfully created");
        reset(); // Reset form
        setPreview(null); // Clear image preview
        setModalOpen(false); // Close the modal
        router.refresh(); // Ensure fresh data is loaded
      } else {
        toast.error("Error creating post, please try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating post, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog modal open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setModalOpen(true)}>Create Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              type="text"
              {...register("title")}
              disabled={loading}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="type">Type</label>
            <Controller
              control={control}
              name="type"
              render={({ field: { onChange, value } }) => (
                <Select
                  onValueChange={onChange}
                  value={value}
                  disabled={loading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="manga">Manga</SelectItem>
                      <SelectItem value="manhwa">Manhwa</SelectItem>
                      <SelectItem value="manhua">Manhua</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="content">Content</label>
            <Textarea
              id="content"
              {...register("content")}
              disabled={loading}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="image">Image</label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register("image")}
              disabled={loading}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          {preview && (
            <Image
              src={preview}
              alt="Image preview"
              width={128}
              height={176}
              className="w-32 h-44 object-cover mt-2"
            />
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader className="mr-2 animate-spin" /> : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
