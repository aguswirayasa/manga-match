import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Adjust the import according to your prisma setup
import { getServerSession } from "next-auth"; // Adjust according to your auth setup

export async function POST(req: NextRequest) {
  const session = await getServerSession(); // Retrieve the session

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); // User not logged in
  }

  const username = session.user.name; // Extract user ID from the session
  const { postId } = await req.json(); // Get postId from the request body

  if (!postId) {
    return NextResponse.json(
      { message: "Post ID is required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    const userId = user?.id!!;
    // Check if a like already exists for this user and post
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingLike) {
      // Unlike the post if it is already liked
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json(
        { message: "Post unliked successfully" },
        { status: 200 }
      );
    } else {
      // Like the post if it is not already liked
      const like = await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      return NextResponse.json(
        { message: "Post liked successfully", like },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error toggling like status:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
