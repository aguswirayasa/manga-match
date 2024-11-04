"use client";

import { useState } from "react"; // Adjusted imports
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share,
  MoreVertical,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { MangaPost } from "@/app/types";
import Image from "next/image";
import { Badge } from "./ui/badge";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import EditMangaModal from "./profile/edit-manga-modal";
import DeletePostModal from "./profile/delete-manga-modal";

interface MangaPostCardProps {
  manga: MangaPost;
  edit: boolean;
}

export default function MangaPostCard({ manga, edit }: MangaPostCardProps) {
  const {
    id,
    title,
    content,
    image,
    type,
    createdAt,
    isFavorited,
    author,
    isLiked,
    likes,
  } = manga;

  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const router = useRouter();
  const [liked, setLiked] = useState(isLiked);
  const [favorited, setFavorited] = useState(isFavorited);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // New state for delete modal

  const handleFavorite = async (postId: number) => {
    try {
      const response = await axios.post("/api/posts/favorite", { postId });
      setFavorited((prev) => !prev);
      toast.success(response.data.message || "Post favorited successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, Please try again");
    }
  };

  const handleLike = async (postId: number) => {
    try {
      const response = await axios.post("/api/posts/like", { postId });
      setLiked((prev) => !prev);
      toast.success(response.data.message || "Post liked successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong, Please try again");
    }
  };

  return (
    <Card className="flex flex-col sm:flex-row w-full mx-auto bg-gray-800 text-white overflow-hidden">
      <div className="relative w-full sm:w-auto">
        <div className="w-full h-[420px] sm:h-[320px] md:h-[420px] sm:w-[260px] md:w-[280px] lg:w-[320px]">
          <Image fill src={image} alt="Manga Cover" className="object-fill" />
        </div>
      </div>
      <div className="flex flex-col p-4 w-full">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={author?.avatar || "default-avatar.webp"}
              alt={author.username}
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <span className="ml-2 font-bold">{author.username}</span>
          <p className="ml-auto text-gray-400 capitalize">{formattedDate}</p>
          {edit && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the dropdown from closing
                      setEditModalOpen(true); // Open the edit modal
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the dropdown from closing
                      setDeleteModalOpen(true); // Open the delete modal
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeletePostModal
                isOpen={isDeleteModalOpen} // Use delete modal state
                mangaId={manga.id}
                onClose={() => {
                  setDeleteModalOpen(false); // Close the delete modal
                  router.refresh(); // Refresh the router if needed
                }}
              />
              <EditMangaModal
                manga={manga}
                mangaId={manga.id}
                isOpen={isEditModalOpen}
                onClose={() => {
                  setEditModalOpen(false);
                  router.refresh();
                }}
              />
            </>
          )}
        </div>

        <Separator className="mb-4" />
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <span>
          <Badge className="uppercase">{type}</Badge>
        </span>
        <ScrollArea
          className="flex-grow mb-4 overflow-y-auto"
          style={{ maxHeight: "200px" }}
        >
          <div>
            <p className="text-gray-300">{content}</p>
          </div>
        </ScrollArea>

        <div className="flex items-center mt-auto space-x-6">
          <Tooltip delayDuration={10}>
            <TooltipTrigger asChild>
              <Heart
                fill={liked ? "#fafafa" : "none"}
                onClick={() => handleLike(id)}
                className={`h-5 w-5 md:h-6 lg:w-6 cursor-pointer ${
                  liked ? "fill-primary text-primary" : "text-gray-400"
                }`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Like</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={10}>
            <TooltipTrigger asChild>
              <MessageCircle className="h-5 w-5 md:h-6 lg:w-6 text-gray-400 hover:text-primary cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Comment</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip delayDuration={10}>
            <TooltipTrigger asChild>
              <Share className="h-5 w-5 md:h-6 lg:w-6 text-gray-400 hover:text-primary cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
          <div className="flex justify-end w-full">
            <Tooltip delayDuration={10}>
              <TooltipTrigger asChild>
                <Bookmark
                  onClick={() => handleFavorite(id)}
                  className={`h-5 w-5 md:h-6 lg:w-6 cursor-pointer ${
                    favorited ? "fill-primary text-primary" : "text-gray-400"
                  }`}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookmark</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="mt-2">
          <p className=" text-sm">{likes?.length} likes</p>
        </div>
      </div>
    </Card>
  );
}
