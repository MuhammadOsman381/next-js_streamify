import dbConnection from "@/lib/dbConnection.js";
import { NextResponse } from "next/server";
import Channel from "@/models/Channel.model.js";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");
const path = require("path");
import Post from "@/models/Post.model.js";

export async function PUT(req) {
  try {
    await dbConnection();
    const postID = await req.url.split("edit/")[1];
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    let video = formData.get("video");
    let thumbnail = formData.get("thumbnail");

    const uploadDirVideo = path.join(
      process.cwd(),
      "public",
      "uploads",
      "video"
    );
    const uploadDirthumbnail = path.join(
      process.cwd(),
      "public",
      "uploads",
      "thumbnail"
    );
    if (!fs.existsSync(uploadDirVideo)) {
      fs.mkdirSync(uploadDirVideo, { recursive: true });
    }
    if (!fs.existsSync(uploadDirthumbnail)) {
      fs.mkdirSync(uploadDirthumbnail, { recursive: true });
    }

    const post = await Post.findOne({ _id: postID });
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found." },
        { status: 404 }
      );
    }

    if (video && typeof video === "object" && video.name) {
      if (post.video) {
        const oldVideoPath = path.join(
          process.cwd(),
          "public",
          post.video.replace("http://localhost:3000", "")
        );
        if (fs.existsSync(oldVideoPath)) {
          fs.unlinkSync(oldVideoPath);
        }
      }

      const uniqueVideoName = `${uuidv4()}-${video.name}`;
      const videoFilePath = path.join(uploadDirVideo, uniqueVideoName);
      const videoFileStream = fs.createWriteStream(videoFilePath);
      videoFileStream.write(Buffer.from(await video.arrayBuffer()));
      videoFileStream.end();
      video = `${process.env.URL}/uploads/video/${uniqueVideoName}`;
    } else {
      video = post.video;
    }

    if (thumbnail && typeof thumbnail === "object" && thumbnail.name) {
      if (post.thumbnail) {
        const oldThumbnailPath = path.join(
          process.cwd(),
          "public",
          post.thumbnail.replace("http://localhost:3000", "")
        );
        if (fs.existsSync(oldThumbnailPath)) {
          fs.unlinkSync(oldThumbnailPath);
        }
      }

      const uniqueThumbnailName = `${uuidv4()}-${thumbnail.name}`;
      const thumbnailFilePath = path.join(
        uploadDirthumbnail,
        uniqueThumbnailName
      );
      const thumbnailFileStream = fs.createWriteStream(thumbnailFilePath);
      thumbnailFileStream.write(Buffer.from(await thumbnail.arrayBuffer()));
      thumbnailFileStream.end();
      thumbnail = `${process.env.URL}/uploads/thumbnail/${uniqueThumbnailName}`;
    } else {
      thumbnail = post.thumbnail;
    }

    post.thumbnail = thumbnail;
    post.video = video;
    post.title = title || post.title;
    post.description = description || post.description;

    await post.save();

    return NextResponse.json(
      {
        success: true,
        message: "Post updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating channel:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
