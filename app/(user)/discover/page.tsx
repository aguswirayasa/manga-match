import { MangaPost } from "@/app/types";
import CreatePostModal from "@/components/discover/create-post-modal";
import { LeftSidebar, RightSidebar } from "@/components/discover/sidebar";
import MangaPostCard from "@/components/manga-post-card";
import { getAllPost } from "@/lib/server-utils";
import { getServerSession } from "next-auth";

import Image from "next/image";

export default async function DiscoverPage() {
  const session = await getServerSession();
  const username = session?.user.name;
  const posts = (await getAllPost(username)) ?? []; // Set a default empty array if posts is undefined

  return (
    <div className="bg-background text-foreground min-h-screen m-4">
      <div className="flex justify-between items-center  m-4 px-4">
        <h1 className="md:text-xl lg:text-2xl font-black">
          Discover Your Next Adventure
        </h1>
        <CreatePostModal />
      </div>
      <div className="flex">
        <LeftSidebar />
        <div className="w-full mx-10 grid place-items-center space-y-5">
          {posts.length === 0 ? ( // Check if there are no posts
            <div className="text-center my-10 grid place-items-center space-y-2">
              <h2 className="text-lg lg:text-2xl font-bold">No Posts Yet!</h2>
              <p className="mt-2  max-w-md font-light">
                Be the first to share your favorite manga, manhwa, or manhua.
                Click the button above to create your first post and join the
                community!
              </p>
            </div>
          ) : (
            posts.map((post, index) => (
              <MangaPostCard key={index} edit={false} manga={post} />
            ))
          )}
        </div>
        <RightSidebar recommendations={posts} />
      </div>
    </div>
  );
}
