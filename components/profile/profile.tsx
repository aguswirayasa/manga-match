"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid, Heart } from "lucide-react";
import MangaPostCard from "@/components/manga-post-card";
import { MangaPost, User } from "@/app/types";
import Link from "next/link";
import EditProfileModal from "./edit-user-modal";

interface UserProfileProps {
  userPosts: MangaPost[];
  userFavorite: MangaPost[];
  user: User;
}

export default function UserProfile({
  userPosts,
  userFavorite,
  user,
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarImage
                src={user.avatar || "default-avatar.webp"}
                alt={user.username}
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-gray-400">
                {user.bio || "This user hasn't added a bio yet"}
              </p>
            </div>
          </div>
          <EditProfileModal user={user} />
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-10">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="posts"
              onClick={() => setActiveTab("posts")}
              className="data-[state=active]:bg-primary"
            >
              <Grid className="mr-2 h-4 w-4" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-primary"
              value="favorites"
              onClick={() => setActiveTab("favorites")}
            >
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="grid ">
              {userPosts.length === 0 ? (
                <div className="grid place-items-center p-4 ">
                  <p className="font-bold text-2xl">No posts available.</p>
                  <p className="mt-2 text-gray-500">
                    Go to the Discover section to find some interesting posts!
                  </p>
                  <Link href={"/discover"}>
                    <Button className="mt-4">Go to Discover</Button>
                  </Link>
                </div>
              ) : (
                userPosts.map((post) => (
                  <MangaPostCard manga={post} edit key={post.id} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="grid">
              {userFavorite.length === 0 ? (
                <div className="grid place-items-center p-4">
                  <p className="font-bold text-2xl">No favorites available.</p>
                  <p className="mt-2 text-gray-500">
                    Go to the Discover section to find your favorite posts!
                  </p>
                  <Link href={"/discover"}>
                    <Button className="mt-4">Go to Discover</Button>
                  </Link>
                </div>
              ) : (
                userFavorite.map((post) => (
                  <MangaPostCard manga={post} edit={false} key={post.id} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
