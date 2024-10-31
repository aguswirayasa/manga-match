"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Grid, Image, Heart } from "lucide-react";
import { MangaPostCard } from "@/components/manga-post-card";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("posts");

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

  const favorites = [
    {
      id: 1,
      title: "Favorite post 1",
      description: "This is my favorite post",
    },
    {
      id: 2,
      title: "Favorite post 2",
      description: "Another post I really like",
    },
    {
      id: 1,
      title: "Favorite post 1",
      description: "This is my favorite post",
    },
    {
      id: 2,
      title: "Favorite post 2",
      description: "Another post I really like",
    },
    {
      id: 1,
      title: "Favorite post 1",
      description: "This is my favorite post",
    },
    {
      id: 2,
      title: "Favorite post 2",
      description: "Another post I really like",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarImage
                src="/placeholder.svg?height=96&width=96"
                alt="@username"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">@username</h1>
              <p className="text-gray-400">User Bio goes here</p>
            </div>
          </div>
          <Button variant="outline" className="hover:bg-primary/80">
            Update Profile
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {posts.map((post) => (
                <MangaPostCard />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {favorites.map((favorite) => (
                <Card key={favorite.id} className="bg-[#0F1021]">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {favorite.title}
                    </h3>
                    <p className="text-gray-400">{favorite.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-800 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <a href="#" className="text-gray-400 hover:text-white mr-4">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Support
          </a>
        </div>
      </footer>
    </div>
  );
}
