import dbConnection from "@/lib/dbConnection.js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Channel from "@/models/Channel.model.js";
import Post from "@/models/Post.model.js";

export async function GET(req) {
  try {
    await dbConnection();
    const postID = req.url.split("like/")[1];
    const token = req.headers.get("x-access-token");
    const decodedToken = jwt.decode(token);

    if (!decodedToken || !decodedToken.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid token." },
        { status: 401 }
      );
    }

    const post = await Post.findOne({ _id: postID });

    if (post.likes.includes(decodedToken.userId)) {
      post.likes = post.likes.filter(
        (sub) => sub.toString() !== decodedToken.userId
      );
    } else {
      post.likes.push(decodedToken.userId);
    }

    await post.save();

    console.log(post.likes);

    return NextResponse.json(
      {
        success: true,
        message: "Like updated successfully!",
        subscribers: post.likes,
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
