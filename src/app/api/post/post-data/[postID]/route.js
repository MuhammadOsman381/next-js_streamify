import dbConnection from "@/lib/dbConnection.js";
import User from "@/models/User.model.js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Channel from "@/models/Channel.model.js";
import Post from "@/models/Post.model.js";

export async function GET(req) {
  try {
    await dbConnection();
    const postID = req.url.split("post-data/")[1];
    const post = await Post.findOne({ _id: postID });

    const channel = await Channel.findOne({ _id: post.channelID });
    const userID = jwt.decode(req.headers.get("x-access-token"));
    const isSubsscribed = channel.subscriber.includes(userID.userId);
    const isPostLiked = post.likes.includes(userID.userId);

    if (post.views) {
      if (post.views.includes(userID.userId)) {
        await post.save();
      } else {
        post.views.push(userID.userId);
        await post.save();
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Working fine!",
        post: post,
        channel: channel,
        isSubsscribed: isSubsscribed,
        isPostLiked: isPostLiked,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving channel:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
