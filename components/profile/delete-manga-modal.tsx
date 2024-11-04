"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

interface DeletePostModalProps {
  mangaId: number; // ID of the post to delete
  isOpen: boolean; // Prop to control modal visibility
  onClose: () => void; // Prop to handle close action
}

export default function DeletePostModal({
  mangaId,
  isOpen,
  onClose,
}: DeletePostModalProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await axios.delete(`/api/posts/${mangaId}/delete`);
      if (response.status === 200) {
        toast.success("Post successfully deleted");
        onClose(); // Close the modal after deletion
      } else {
        toast.error("Error deleting post, please try again");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting post, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog modal open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
        </DialogHeader>
        <div className="text-center">
          <p>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 text-white"
          >
            {loading ? <Loader className="mr-2 animate-spin" /> : "Delete Post"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
