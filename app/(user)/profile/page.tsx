import UserProfile from "@/components/profile/profile";
import authOptions from "@/lib/auth";
import {
  getUserFavoritedPosts,
  getUserPost,
  getUserProfile,
} from "@/lib/server-utils";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  const username = session?.user.name;
  const user = await getUserProfile(username);
  const userPosts = await getUserPost(username);
  const userFavorite = await getUserFavoritedPosts(username);

  return (
    <div>
      <UserProfile
        userPosts={userPosts!!}
        userFavorite={userFavorite!!}
        user={user}
      />
    </div>
  );
}
