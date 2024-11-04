"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MangaPost } from "@/app/types";

// Schema for validation
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),

  type: yup.string().required("Type is required"),
});

type FormData = {
  title: string;
  content: string;
  image?: FileList; // Change to just FileList (optional)
  type: string;
};

interface EditMangaModalProps {
  manga: MangaPost;
  mangaId: number;
  isOpen: boolean; // Prop to control modal visibility
  onClose: () => void; // Prop to handle close action
}

export default function EditMangaModal({
  mangaId,
  manga,
  isOpen,
  onClose,
}: EditMangaModalProps) {
  const { title, content, image, type } = manga;
  const [preview, setPreview] = useState<string | null>(image || null);
  const [loading, setLoading] = useState(false);
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
    defaultValues: {
      title,
      content,
      type,
    },
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const objectUrl = URL.createObjectURL(imageFile[0]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (image) {
      setPreview(image);
    } else {
      setPreview(null);
    }
  }, [imageFile, image]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("type", data.type);

    // Append image only if provided
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      const result = await axios.post(`api/posts/${mangaId}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.status === 200) {
        toast.success("Manga successfully updated");
        onClose();
        reset();
      } else {
        toast.error("Error updating manga, please try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating manga, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Manga</DialogTitle>
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
                  <SelectTrigger className="w-[180px]">
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
            {loading ? (
              <Loader className="mr-2 animate-spin" />
            ) : (
              "Update Manga"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
