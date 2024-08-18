import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnection from "@/lib/dbConnection.js";
import User from "@/models/User.model.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    dbConnection();

    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(name, email, password);

    const isEmailExist = await User.findOne({ email: email });

    if (isEmailExist) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists with this email!",
        },
        { status: 409 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        token: token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
