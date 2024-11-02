import { NextRequest, NextResponse } from "next/server";
import formidable, { File, Files, Fields } from "formidable";
import fs from "fs";
import path from "path";

// Disable Next.js body parsing (to handle file uploads)
export const config = {
  api: {
    bodyParser: false,
  },
};

// Define the types for the uploaded file
interface UploadedFile extends File {
  newFilename: string; // Include newFilename if you are generating it
}

// Handle POST requests to upload images
export async function POST(req: NextRequest) {
  const form = formidable({
    uploadDir: path.join(process.cwd(), "/public/uploads"),
    keepExtensions: true,
  });

  return new Promise<NextResponse>((resolve, reject) => {
    form.parse(
      req as any,
      async (err: Error | null, fields: Fields, files: Files) => {
        if (err) {
          return reject(
            new NextResponse("Error in file upload", { status: 500 })
          );
        }

        const uploadedFileArray = files.image as File[] | undefined;

        if (!uploadedFileArray || uploadedFileArray.length === 0) {
          return reject(new NextResponse("No file uploaded", { status: 400 }));
        }

        const uploadedFile = uploadedFileArray[0] as UploadedFile;

        const newFilePath = path.join(
          process.cwd(),
          "/public/uploads",
          uploadedFile.newFilename
        );

        fs.renameSync(uploadedFile.filepath, newFilePath);

        return resolve(
          NextResponse.json(
            { url: `/uploads/${uploadedFile.newFilename}` },
            { status: 201 }
          )
        );
      }
    );
  });
}
