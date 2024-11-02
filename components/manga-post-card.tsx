"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share,
  HeartIcon,
  HeartPulse,
  HeartOff,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function MangaPostCard() {
  const [isLiked, setIsLiked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setIsScrollable(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, []);

  return (
    <Card className="flex flex-col sm:flex-row  mx-auto bg-gray-800 text-white overflow-hidden">
      <div className="relative w-full sm:w-auto">
        <img
          src="/1.jpg"
          alt="Manga Cover"
          className="w-full h-[240px] sm:h-[320px] md:h-[420px] sm:w-[180px] md:w-[240px] lg:w-[420px] object-cover"
        />
      </div>
      <div className="flex flex-col p-4 w-full">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="@username"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <span className="ml-2 font-bold">@username</span>
          <p className="ml-auto text-gray-400">38 minutes ago</p>
        </div>

        <Separator className="mb-4" />
        <h2 className="text-xl font-bold mb-2">Manga Title Goes Here</h2>
        <ScrollArea className="flex-grow mb-4" style={{ maxHeight: "200px" }}>
          <div ref={contentRef}>
            <p className="text-gray-300">
              This is a description of the manga. It can be quite long and will
              scroll if it exceeds the maximum height. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum. veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
        </ScrollArea>
        {isScrollable && (
          <div className="text-xs text-gray-400 mb-2 italic">
            Scroll for more
          </div>
        )}

        <div className="flex items-center   mt-auto space-x-6">
          {/* Likes */}

          <Tooltip delayDuration={10}>
            <TooltipTrigger asChild>
              <Heart
                fill="#fafafa"
                className={`h-5 w-5 md:h-6 lg:w-6 cursor-pointer hover:text-primary ${
                  isLiked ? "text-primary" : "text-gray-400"
                }`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Like</p>
            </TooltipContent>
          </Tooltip>

          {/* Comments */}

          <Tooltip delayDuration={10}>
            <TooltipTrigger asChild>
              <MessageCircle className="h-5 w-5 md:h-6 lg:w-6 text-gray-400 hover:text-primary cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Comment</p>
            </TooltipContent>
          </Tooltip>

          {/* Share */}
          <Tooltip delayDuration={10}>
            <TooltipTrigger asChild>
              <Share className="h-5 w-5 md:h-6 lg:w-6 text-gray-400 hover:text-primary cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>

          {/* Bookmark */}
          <div className="flex justify-end w-full">
            <Tooltip delayDuration={10}>
              <TooltipTrigger asChild>
                <Bookmark className="h-5 w-5 md:h-6 lg:w-6 text-gray-400 hover:text-primary cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookmark</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="mt-2">
          <p className=" text-sm">3155 likes</p>
        </div>
      </div>
    </Card>
  );
}
