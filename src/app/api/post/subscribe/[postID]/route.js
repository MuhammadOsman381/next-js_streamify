import dbConnection from "@/lib/dbConnection.js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Channel from "@/models/Channel.model.js";
import Post from "@/models/Post.model.js";

export async function GET(req) {
  try {
    await dbConnection();
    const postID = req.url.split("subscribe/")[1];
    const token = req.headers.get("x-access-token");
    const decodedToken = jwt.decode(token);

    if (!decodedToken || !decodedToken.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid token." },
        { status: 401 }
      );
    }

    const post = await Post.findOne({ _id: postID });
    const channel = await Channel.findOne({ _id: post.channelID });

    if (!channel) {
      return NextResponse.json(
        { success: false, message: "Channel not found." },
        { status: 404 }
      );
    }

    if (channel.subscriber.includes(decodedToken.userId)) {
      channel.subscriber = channel.subscriber.filter(
        (sub) => sub.toString() !== decodedToken.userId
      );
    } else {
      channel.subscriber.push(decodedToken.userId);
    }

    await channel.save();

    console.log(channel.subscriber);

    return NextResponse.json(
      {
        success: true,
        message: "Subscription updated successfully!",
        subscribers: channel.subscriber,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
