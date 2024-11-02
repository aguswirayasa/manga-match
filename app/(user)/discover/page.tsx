import CreatePostModal from "@/components/discover/create-post-modal";
import { LeftSidebar, RightSidebar } from "@/components/discover/sidebar";
import MangaPostCard from "@/components/manga-post-card";

import {
  Search,
  ChevronRight,
  ThumbsUp,
  Bookmark,
  MessageCircle,
  Plus,
} from "lucide-react";
import Image from "next/image";
const posts = [
  {
    id: 1,
    title: "My first post",
    description: "This is a description of my first post",
  },
  {
    id: 2,
    title: "Another post",
    description: "Here's another interesting post",
  },
  {
    id: 3,
    title: "Yet another post",
    description: "And here's one more for good measure",
  },
  {
    id: 1,
    title: "My first post",
    description: "This is a description of my first post",
  },
  {
    id: 2,
    title: "Another post",
    description: "Here's another interesting post",
  },
  {
    id: 3,
    title: "Yet another post",
    description: "And here's one more for good measure",
  },
];
const DiscoverPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen m-4 ">
      <div className="flex justify-between items-center w-full m-4 px-4">
        <h1 className="md:text-xl lg:text-2xl font-black">
          Discover Your Next Advanture
        </h1>
        <CreatePostModal />
      </div>
      <div className="flex  ">
        <LeftSidebar />
        <div className="w-full mx-10 space-y-5">
          {posts.map((post, index) => (
            <MangaPostCard key={index} />
          ))}
        </div>
        <RightSidebar recommendations={posts} />
      </div>
    </div>
  );
};

export default DiscoverPage;
