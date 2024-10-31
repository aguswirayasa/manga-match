import { LeftSidebar, RightSidebar } from "@/components/discover/sidebar";
import { MangaPostCard } from "@/components/manga-post-card";

import {
  Search,
  ChevronRight,
  ThumbsUp,
  Bookmark,
  MessageCircle,
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
    <div className="bg-background text-foreground min-h-screen px-4 py-8">
      <div className="flex  ">
        <LeftSidebar />
        <div className="w-full mx-10">
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
