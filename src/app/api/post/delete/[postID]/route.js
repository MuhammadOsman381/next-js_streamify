import dbConnection from "@/lib/dbConnection.js";
import { NextResponse } from "next/server";
import Channel from "@/models/Channel.model.js";
import { v4 as uuidv4 } from "uuid";
const fs = require("fs");
const path = require("path");
import Post from "@/models/Post.model.js";
import User from "@/models/User.model.js";

export async function DELETE(req) {
  try {
    await dbConnection();
    const postID = await req.url.split("delete/")[1];
    console.log(postID);

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

    if (post.video) {
      const videoPath = path.join(
        process.cwd(),
        "public",
        post.video.replace(`${process.env.URL}`, "")
      );
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }
    }

    if (post.thumbnail) {
      const thumbnailPath = path.join(
        process.cwd(),
        "public",
        post.thumbnail.replace(`http://localhost:3000`, "")
      );
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    }

    await Channel.updateMany(
      { posts: postID },
      { $pull: { posts: postID } }
    );

    await User.updateMany(
      { likedVideos: postID },
      { $pull: { likedVideos: postID } }
    );

    await post.deleteOne();

    return NextResponse.json(
      {
        success: true,
        message: "Post deleted successfully.",
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
