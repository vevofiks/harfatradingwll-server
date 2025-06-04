import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.config";
import { v4 as uuidv4 } from "uuid";
export const uploadToS3 = async (buffer, originalName, folder = "products") => {
    try {
        const extension = originalName.split(".").pop();
        const fileName = `${folder}/${uuidv4()}.${extension}`;
        const contentType = `image/${extension === 'jpg' ? 'jpeg' : extension}`;
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: contentType,
        });
        await s3.send(command);
        return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }
    catch (error) {
        console.error("Error uploading file to S3:", error);
        throw new Error("Failed to upload file to S3");
    }
};
