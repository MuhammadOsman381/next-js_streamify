import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnection from "@/lib/dbConnection.js";
import User from "@/models/User.model.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    dbConnection();

    const formData = await req.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    const isEmailExist = await User.findOne({ email: email });

    if (!isEmailExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email!",
        },
        { status: 409 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      isEmailExist.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password!",
        },
        { status: 409 }
      );
    }

    const token = sign({ userId: isEmailExist._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    const response = NextResponse.json(
      {
        success: true,
        message: `Welcome back ${isEmailExist.name}`,
        token: token,
        user: {
          id: isEmailExist._id,
          name: isEmailExist.name,
          email: isEmailExist.email,
        },
      },
      { status: 201 }
    );

    response.cookies.set("token", token, {
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
