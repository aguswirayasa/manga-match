// app/api/posts/[mangaId]/update/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { UploadedFile } from "@/app/types";
import { saveImage } from "@/lib/uploadfile";

export async function POST(
  req: NextRequest,
  { params }: { params: { mangaId: Promise<string> } }
) {
  // Retrieve the session to get the authenticated user
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Use formData to handle multipart form data
    const formData = await req.formData();

    // Extract fields from form data
    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;
    const type = formData.get("type") as string | null;
    const image = formData.get("image") as File | null;
    const { mangaId } = await params;
    // Build the update data object with only the fields provided by the user
    const updateData: { [key: string]: any } = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (type) updateData.type = type;

    // If an image file is provided, save and add it to the update data
    if (image) {
      const uploadedFile: UploadedFile = {
        name: image.name,
        data: Buffer.from(await image.arrayBuffer()),
      };
      const imageUrl = await saveImage(
        uploadedFile,
        session.user.name,
        new Date()
      );
      updateData.image = imageUrl;
    }

    // Update the post in the database only with the provided fields
    const updatedPost = await prisma.post.update({
      where: { id: Number(mangaId) },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "Post updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post, please try again" },
      { status: 500 }
    );
  }
}
