import { UploadedFile } from "@/app/types";
import fs from "fs";
import path from "path";

export function saveImage(
  file: UploadedFile,
  username: string,
  timestamp: Date
): Promise<string> {
  return new Promise((resolve, reject) => {
    const publicDir = path.join(process.cwd(), "public", "uploads"); // Define your uploads directory

    // Generate a unique filename using username, postId, and timestamp
    const formattedTimestamp = timestamp.toISOString().replace(/[:.]/g, "-");
    const uniqueFilename = `${username}-${formattedTimestamp}-${file.name}`;
    const filePath = path.join(publicDir, uniqueFilename);

    // Ensure the directory exists
    fs.mkdir(publicDir, { recursive: true }, (err) => {
      if (err) return reject(err);

      // Write the file to the uploads directory
      const writeStream = fs.createWriteStream(filePath);
      writeStream.on("error", reject);
      writeStream.on("finish", () => {
        // Construct the URL
        const imageUrl = `/uploads/${uniqueFilename}`;
        resolve(imageUrl); // Return the URL of the saved image
      });

      // Pipe the file stream to the write stream
      writeStream.write(file.data);
      writeStream.end();
    });
  });
}
