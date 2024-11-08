import { UploadedFile } from "@/app/types";
import prisma from "@/lib/prisma";
import { saveImage } from "@/lib/uploadfile";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

// Handle POST requests to create a new post
export async function POST(req: NextRequest) {
  // Retrieve the session to get the authenticated user
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id; // Get the user ID from the session

  // Parse form data
  const formData = await req.formData();

  // Extract and convert form data to strings or File
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();
  const image = formData.get("image") as File;
  const type = formData.get("type")?.toString();

  let imageUrl: string | undefined; // Declare imageUrl

  // Check if image is provided and save it
  if (image) {
    const uploadedFile: UploadedFile = {
      name: image.name,
      data: Buffer.from(await image.arrayBuffer()),
    };

    try {
      imageUrl = await saveImage(uploadedFile, session.user.name, new Date());
      console.log("Image saved at:", imageUrl);
    } catch (error) {
      console.error("Error saving image:", error);
      return NextResponse.json(
        { message: "Error saving image" },
        { status: 500 }
      ); // Respond with an error if image saving fails
    }
  } else {
    console.error("Image is not provided in the form data");
    return NextResponse.json({ message: "Image is required" }, { status: 400 }); // Respond if the image is missing
  }

  // Validate required fields
  if (!title || !content || !type) {
    return NextResponse.json(
      { message: "Title, content, and type are required" },
      { status: 400 }
    );
  }

  // Attempt to create the post in the database
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image: imageUrl,
        type,
        author: { connect: { id: userId } }, // Connect the post to the user
      },
    });

    if (post) {
      return NextResponse.json({ message: "Create success" }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Error saving to database" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
