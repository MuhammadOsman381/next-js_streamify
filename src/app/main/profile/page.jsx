"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/components/Profile";
import Post from "@/components/Post";
import axios from "axios";
import Helpers from "@/config/Helpers";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Footer from "@/components/Footer";

const Page = () => {
  const [banner, setBanner] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [posts, setPosts] = useState([]);
  const getProfileData = () => {
    axios
      .get("/api/user/profile", Helpers.authFileHeaders)
      .then((response) => {
        console.log(response.data.channel);
        setBanner(response.data.channel.banner);
        setDescription(response.data.channel.description);
        setImage(response.data.channel.image);
        setName(response.data.channel.name);
        setPosts(response.data.channel.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="flex flex-col items-center justify-center ">
          {/* Banner Section */}
          <div className="w-full h-40 sm:h-60 md:h-72 lg:h-80 xl:h-65 relative overflow-hidden rounded-lg">
            <img
              src={banner}
              className="w-full h-full object-cover  "
              alt="Banner"
            />
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center mt-[-50px] sm:mt-[-75px] md:mt-[-100px]">
            <div className="avatar">
              <div className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={image} alt="Profile" />
              </div>
            </div>

            {/* User Info Section */}
            <div className="text-center mt-4 flex flex-col items-center justify-center  ">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                {name}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600">
                {description}
              </p>
              <div className="flex gap-1 mt-5 ">
                <button className="btn btn-primary  text-white btn-sm hover:scale-110 transition-transform rounded-xl">
                  Edit <CiEdit />
                </button>
                <button className="btn btn-error    text-white btn-sm hover:scale-110 transition-transform rounded-xl">
                  Delete <MdDelete />
                </button>
              </div>
            </div>
          </div>
        </div>

        <Post posts={posts} />
      </div>
      <Footer />
    </>
  );
};

export default Page;
