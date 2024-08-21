import dbConnection from "@/lib/dbConnection.js";
import { NextResponse } from "next/server";
import Channel from "@/models/Channel.model.js";
import { v4 as uuidv4 } from 'uuid';
const fs = require("fs");
const path = require("path");

export async function PUT(req) {
  try {
    await dbConnection();
    const channelID = await req.url.split("edit/")[1];
    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    let image = formData.get("image");
    let banner = formData.get("banner");

    const uploadDirImage = path.join(process.cwd(), "public", "uploads", "image");
    const uploadDirBanner = path.join(process.cwd(), "public", "uploads", "banner");

    if (!fs.existsSync(uploadDirImage)) {
      fs.mkdirSync(uploadDirImage, { recursive: true });
    }
    if (!fs.existsSync(uploadDirBanner)) {
      fs.mkdirSync(uploadDirBanner, { recursive: true });
    }

    const channel = await Channel.findOne({ _id: channelID });
    if (!channel) {
      return NextResponse.json(
        { success: false, message: "Channel not found." },
        { status: 404 }
      );
    }

    
    if (banner && typeof banner === "object" && banner.name) {
      
      if (channel.banner) {
        const oldBannerPath = path.join(
          process.cwd(),
          "public",
          channel.banner.replace(`${process.env.URL}`, "")
        );
        if (fs.existsSync(oldBannerPath)) {
          fs.unlinkSync(oldBannerPath);
        }
      }

      const uniqueBannerName = `${uuidv4()}-${banner.name}`;
      const bannerFilePath = path.join(uploadDirBanner, uniqueBannerName);
      const bannerFileStream = fs.createWriteStream(bannerFilePath);
      bannerFileStream.write(Buffer.from(await banner.arrayBuffer()));
      bannerFileStream.end();
      banner = `${process.env.URL}/uploads/banner/${uniqueBannerName}`;
    } else {
      banner = channel.banner; 
    }

   
    if (image && typeof image === "object" && image.name) {
   
      if (channel.image) {
        const oldImagePath = path.join(
          process.cwd(),
          "public",
          channel.image.replace("http://localhost:3000", "")
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const uniqueImageName = `${uuidv4()}-${image.name}`;
      const imageFilePath = path.join(uploadDirImage, uniqueImageName);
      const imageFileStream = fs.createWriteStream(imageFilePath);
      imageFileStream.write(Buffer.from(await image.arrayBuffer()));
      imageFileStream.end();
      image = `${process.env.URL}/uploads/image/${uniqueImageName}`;
    } else {
      image = channel.image;
    }

    // Update channel details
    channel.banner = banner;
    channel.image = image;
    channel.title = title || channel.title;
    channel.description = description || channel.description;

    await channel.save();

    return NextResponse.json(
      {
        success: true,
        message: "Channel updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating channel:", error);
    return NextResponse.json(
      { success: false, message: "Server error, please try again later." },
      { status: 500 }
    );
  }
}