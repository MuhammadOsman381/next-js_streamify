import dbConnection from "@/lib/dbConnection.js";
import User from "@/models/User.model.js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Channel from "@/models/Channel.model.js";
import Post from "@/models/Post.model.js";

export async function GET(req) {
  try {
    await dbConnection();
    const token = req.headers.get("cookie").split("token=")[1]
    const decodedToken = jwt.decode(token)
    const user = await User.findOne({_id:decodedToken.userId})
    const likedPosts = await Promise.all(user.likedVideos.map(async (items)=>{
      return await Post.findOne({_id:items})
    }))
    return NextResponse.json(
      {
        success: true,
        message: "working fine!",
        likedPosts:likedPosts,
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
