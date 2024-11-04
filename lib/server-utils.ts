"use server";

import prisma from "./prisma";

export async function getAllPost(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    const userId = user?.id;
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: { select: { username: true, avatar: true } },
        likes: { select: { userId: true } },
        favorites: { select: { userId: true } },
      },
    });

    // If userId is provided, calculate isLiked and isFavorited
    const formattedPosts = userId
      ? posts.map((post) => ({
          ...post,
          isLiked: post.likes.some((like) => like.userId === userId),
          isFavorited: post.favorites.some(
            (favorite) => favorite.userId === userId
          ),
        }))
      : posts.map((post) => ({
          ...post,
          isLiked: false,
          isFavorited: false,
        }));

    return formattedPosts;
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
}
export async function getUserPost(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    const userId = user?.id;
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: { select: { username: true, avatar: true } },
        likes: { select: { userId: true } },
        favorites: { select: { userId: true } },
      },
      where: { authorId: userId },
    });

    // If userId is provided, calculate isLiked and isFavorited
    const formattedPosts = userId
      ? posts.map((post) => ({
          ...post,
          isLiked: post.likes.some((like) => like.userId === userId),
          isFavorited: post.favorites.some(
            (favorite) => favorite.userId === userId
          ),
        }))
      : posts.map((post) => ({
          ...post,
          isLiked: false,
          isFavorited: false,
        }));

    return formattedPosts;
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
}
export async function getUserFavoritedPosts(username: string) {
  try {
    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    const userId = user?.id;

    if (!userId) {
      return []; // Return an empty array if the user does not exist
    }

    // Fetch posts that are favorited by the current user
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: { select: { username: true, avatar: true } },
        likes: { select: { userId: true } },
        favorites: { select: { userId: true } },
      },
      where: {
        favorites: {
          some: { userId: userId }, // Filter posts favorited by the current user
        },
      },
    });

    // Format the posts to include isLiked and isFavorited flags
    const formattedPosts = posts.map((post) => ({
      ...post,
      isLiked: post.likes.some((like) => like.userId === userId),
      isFavorited: true, // Since we're only fetching favorited posts, this is always true
    }));

    return formattedPosts;
  } catch (error) {
    console.log(error);
    return []; // Return an empty array in case of an error
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is disconnected
  }
}
export async function getUserProfile(username: string) {
  try {
    // Find the user by username
    const user = await prisma.user.findUnique({
      where: { username: username },
      select: { id: true, username: true, bio: true, avatar: true },
    });
    if (!user) {
      return { id: "", username: "", avatar: "", bio: "" };
    }
    return {
      id: user.id || "",
      username: user.username,
      avatar: user.avatar || "",
      bio: user.bio || "",
    };
  } catch (error) {
    return { id: "", username: "", avatar: "", bio: "" };
  } finally {
    await prisma.$disconnect(); // Ensure the Prisma client is disconnected
  }
}
