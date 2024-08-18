import dbConnection from "@/lib/dbConnection.js";
import { NextResponse } from "next/server";
import Post from "@/models/Post.model.js";

export async function GET(req) {
  try {
    dbConnection();
    const posts = await Post.find().exec();

    if (posts.length == 0) {
      return NextResponse.json(
        {
          success: false,
          message: `posts not found.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `posts found succesfully.`,
        posts: posts,
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
