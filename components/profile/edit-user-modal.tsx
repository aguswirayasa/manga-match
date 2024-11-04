import { useForm, SubmitHandler } from "react-hook-form";
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

// Schema for validation
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  bio: yup.string().optional(),
});

type FormData = {
  username: string;
  bio?: string;
  avatar?: FileList;
};

interface EditProfileModalProps {
  user: { username: string; bio?: string; avatar?: string | null };
}

export default function EditProfileModal({ user }: EditProfileModalProps) {
  const { username, bio, avatar } = user;
  const [preview, setPreview] = useState<string | null>(avatar || null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { username, bio },
  });

  const avatarFile = watch("avatar");

  useEffect(() => {
    if (avatarFile && avatarFile[0]) {
      const objectUrl = URL.createObjectURL(avatarFile[0]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (avatar) {
      setPreview(avatar);
    } else {
      setPreview(null);
    }
  }, [avatarFile, avatar]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("bio", data.bio || "");

    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const result = await axios.post("/api/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.status === 200) {
        toast.success("Profile updated successfully");
        router.refresh();
        reset();
        setIsOpen(false); // Close the modal
      } else {
        toast.error("Error updating profile, please try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              type="text"
              {...register("username")}
              disabled={loading}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="bio">Bio</label>
            <Textarea
              id="bio"
              {...register("bio")}
              disabled={loading}
              placeholder="Tell us about yourself"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="avatar">Avatar</label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              {...register("avatar")}
              disabled={loading}
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm">{errors.avatar.message}</p>
            )}
          </div>

          {preview && (
            <div className="flex justify-center mt-2">
              <Image
                src={preview}
                alt="Avatar preview"
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <Loader className="mr-2 animate-spin" />
            ) : (
              "Update Profile"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
