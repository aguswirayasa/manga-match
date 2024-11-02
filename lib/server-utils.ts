import { UploadedFile } from "@/app/types";
import fs from "fs";
import path from "path";

export const saveImage = (file: UploadedFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const publicDir = path.join(process.cwd(), "public", "uploads"); // Define your uploads directory
    const filePath = path.join(publicDir, file.name);

    // Ensure the directory exists
    fs.mkdir(publicDir, { recursive: true }, (err) => {
      if (err) return reject(err);

      // Write the file to the uploads directory
      const writeStream = fs.createWriteStream(filePath);
      writeStream.on("error", reject);
      writeStream.on("finish", () => {
        // Construct the URL
        const imageUrl = `/uploads/${file.name}`;
        resolve(imageUrl); // Return the URL of the saved image
      });

      // Pipe the file stream to the write stream
      writeStream.write(file.data);
      writeStream.end();
    });
  });
};
