import fs from "fs";
import path from "path";
import dbConnection from "@/lib/dbConnection.js";
import User from "@/models/User.model.js";
import { NextResponse } from "next/server";
import Channel from "@/models/Channel.model.js";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    dbConnection();

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");
    const banner = formData.get("banner");

    const token = req.headers.get("x-access-token");
    const decodedToken = jwt.decode(token);

    const user = await User.findOne({ _id: decodedToken.userId });
    if (user.channel) {
      return NextResponse.json(
        {
          success: false,
          message: "Channel already exist",
        },
        { status: 409 }
      );
    }

    let imagePath = null;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const imageUploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "image"
      );
      const imageFileName = `${Date.now()}-${image.name}`;
      imagePath = `http://192.168.18.12:3000/uploads/image/${imageFileName}`;
      const imageFilePath = path.join(imageUploadDir, imageFileName);

      if (!fs.existsSync(imageUploadDir)) {
        fs.mkdirSync(imageUploadDir, { recursive: true });
      }

      fs.writeFileSync(imageFilePath, buffer);
    }

    let bannerPath = null;
    if (banner) {
      const buffer = Buffer.from(await banner.arrayBuffer());
      const bannerUploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "banner"
      );
      const bannerFileName = `${Date.now()}-${banner.name}`;
      bannerPath = `http://192.168.18.12:3000/uploads/banner/${bannerFileName}`;
      const bannerFilePath = path.join(bannerUploadDir, bannerFileName);

      if (!fs.existsSync(bannerUploadDir)) {
        fs.mkdirSync(bannerUploadDir, { recursive: true });
      }

      fs.writeFileSync(bannerFilePath, buffer);
    }

    const newChannel = await Channel.create({
      name: title,
      description: description,
      banner: bannerPath,
      image: imagePath,
    });

    user.channel = newChannel._id;
    await user.save();
    return NextResponse.json(
      {
        success: true,
        message: "Channel create succesfully!",
        channel: newChannel,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}
