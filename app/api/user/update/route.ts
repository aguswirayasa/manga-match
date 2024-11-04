// app/api/users/[userId]/update/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { UploadedFile } from "@/app/types";
import { saveImage } from "@/lib/uploadfile";

export async function POST(req: NextRequest) {
  // Retrieve the session to get the authenticated user
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Use formData to handle multipart form data
    const formData = await req.formData();

    // Extract fields from form data
    const username = formData.get("username") as string | null;
    const bio = formData.get("bio") as string | null;
    const avatar = formData.get("avatar") as File | null;
    const userId = session.user.id;

    // Ensure the authenticated user is updating their own profile
    if (session.user.id !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    // Build the update data object with only the fields provided by the user
    const updateData: { [key: string]: any } = {};
    if (username) updateData.username = username;
    if (bio) updateData.bio = bio;

    // If an avatar file is provided, save and add it to the update data
    if (avatar) {
      const uploadedFile: UploadedFile = {
        name: avatar.name,
        data: Buffer.from(await avatar.arrayBuffer()),
      };
      const avatarUrl = await saveImage(
        uploadedFile,
        session.user.name,
        new Date()
      );
      updateData.avatar = avatarUrl;
    }

    // Update the user in the database only with the provided fields
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "User profile updated successfully",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update user profile, please try again" },
      { status: 500 }
    );
  }
}
