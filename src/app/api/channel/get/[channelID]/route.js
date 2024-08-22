import dbConnection from "@/lib/dbConnection.js";
import { NextResponse } from "next/server";
import Post from "@/models/Post.model.js";
import Channel from "@/models/Channel.model.js";
import User from "@/models/User.model.js";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await dbConnection();
    const channelID = req.url.split("get/")[1];
    const channel = await Channel.findById(channelID);
    const decodedToken = jwt.decode(req.headers.get("x-access-token"));
    const user = await User.findOne({ _id: decodedToken.userId });

    if (!channel) {
      return NextResponse.json(
        { success: false, message: "Channel not found." },
        { status: 404 }
      );
    }
    const postArray = await Promise.all(
      channel.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        return post;
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Posts retrieved successfully.",
        channel: [channel],
        posts: postArray,
        isChannelSubscribed: user.subscribedChannels.includes(channelID),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
