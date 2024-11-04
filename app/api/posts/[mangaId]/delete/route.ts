import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { mangaId: Promise<string> } } // Update the type to indicate that mangaId is a Promise
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Await the params.mangaId to get the actual value
    const { mangaId } = await params; // Await params.mangaId

    // Check for likes and favorites before deleting
    await prisma.like.deleteMany({
      where: { postId: Number(mangaId) },
    });

    await prisma.favorite.deleteMany({
      where: { postId: Number(mangaId) },
    });

    // Now delete the post
    await prisma.post.delete({
      where: { id: Number(mangaId) },
    });

    return NextResponse.json(
      {
        message: "Post deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post, please try again" },
      { status: 500 }
    );
  }
}
