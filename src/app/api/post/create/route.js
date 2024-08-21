import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnection from "@/lib/dbConnection.js";
import User from "@/models/User.model.js";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import Channel from "@/models/Channel.model.js";
import Post from "@/models/Post.model.js";
export async function POST(req) {
  try {
    dbConnection();

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const video = formData.get("video");
    const thumbnail = formData.get("thumbnail");
    const token = req.headers.get("x-access-token");
    const decodedToken = jwt.decode(token);
    const user = await User.findOne({ _id: decodedToken.userId });

    const userChannel = await Channel.findOne({ _id: user.channel });

    if (!userChannel) {
      return NextResponse.json(
        {
          success: true,
          message: "Channel not found.",
       
        },
        { status: 409 }
      );
    }

    let videoPath = null;
    if (video) {
      const buffer = Buffer.from(await video.arrayBuffer());
      const videoUploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "video"
      );
      const videoFileName = `${Date.now()}-${video.name}`;
      videoPath = `${process.env.URL}/uploads/video/${videoFileName}`;
      const videoFilePath = path.join(videoUploadDir, videoFileName);

      if (!fs.existsSync(videoUploadDir)) {
        fs.mkdirSync(videoUploadDir, { recursive: true });
      }

      fs.writeFileSync(videoFilePath, buffer);
    }

    let thumbnailPath = null;
    if (thumbnail) {
      const buffer = Buffer.from(await thumbnail.arrayBuffer());
      const thumbnailUploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "thumbnail"
      );
      const thumbnailFileName = `${Date.now()}-${thumbnail.name}`;
      thumbnailPath = `${process.env.URL}/uploads/thumbnail/${thumbnailFileName}`;
      const thumbnailFilePath = path.join(
        thumbnailUploadDir,
        thumbnailFileName
      );

      if (!fs.existsSync(thumbnailUploadDir)) {
        fs.mkdirSync(thumbnailUploadDir, { recursive: true });
      }

      fs.writeFileSync(thumbnailFilePath, buffer);
    }

    const newPost = await Post.create({
      channelID: userChannel._id,
      title: title,
      description: description,
      video: videoPath,
      thumbnail: thumbnailPath,
    });

    console.log(userChannel)

    userChannel.posts.push(newPost._id);
    await userChannel.save();

    return NextResponse.json(
      {
        success: true,
        message: `Post uploaded successfully.`,
        newPost: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
