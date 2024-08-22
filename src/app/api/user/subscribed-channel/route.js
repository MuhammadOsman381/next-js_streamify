import dbConnection from "@/lib/dbConnection.js";
import User from "@/models/User.model.js";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Channel from "@/models/Channel.model.js";

export async function GET(req) {
  try {
    dbConnection();
    const token = req.headers.get("x-access-token");
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token not provided." },
        { status: 401 }
      );
    }

    const decodedToken = jwt.decode(token);

    if (!decodedToken || !decodedToken.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid token." },
        { status: 401 }
      );
    }

    const user = await User.findOne({ _id: decodedToken.userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found." },
        { status: 404 }
      );
    }

    const subscribedChannelArray = await Promise.all(
      user.subscribedChannels.map(async (items) => {
        return await Channel.findOne({ _id: items });
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Channel retrieved successfully!",
        channels:subscribedChannelArray,
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
