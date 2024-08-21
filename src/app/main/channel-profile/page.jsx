"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Helpers from "@/config/Helpers";
import ChannelProfile from "@/components/ChannelProfile";
import Footer from "@/components/Footer";

const page = () => {
  const [channel, setChannel] = useState([]);
  const [posts, setPosts] = useState([]);

  const getChannel = async () => {
    const channelID = localStorage.getItem("channelID");
    const response = await axios.get(
      `/api/channel/get/${channelID}`,
      Helpers.authHeaders
    );
    console.log(response.data.posts);
    setPosts(response.data.posts);
    setChannel(response.data.channel);
  };

  useEffect(() => {
    getChannel();
  }, []);

  return (
    <>
      <div className="p-5 min-h-[90vh]">
        {channel?.length > 0 &&
          channel?.map((items) => (
            <div className="flex flex-col items-center justify-center ">
              {/* Banner Section */}
              <div className="w-full h-40 sm:h-60 md:h-72 lg:h-80 xl:h-65 relative overflow-hidden rounded-lg">
                <img
                  src={items.banner}
                  className="w-full h-full object-cover  "
                  alt="Banner"
                />
              </div>

              {/* Profile Section */}
              <div className="flex flex-col items-center mt-[-50px] sm:mt-[-75px] md:mt-[-100px]">
                <div className="avatar">
                  <div className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={items.image} alt="Profile" />
                  </div>
                </div>

                {/* User Info Section */}
                <div className="text-center mt-4 flex flex-col items-center justify-center  ">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {items.name}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600">
                    {items.description}
                  </p>
                  <div className="flex gap-1 mt-5 ">
                    <button className="btn btn-error    text-white btn-sm hover:scale-110 transition-transform rounded-xl">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        <ChannelProfile posts={posts} />
      </div>
      <Footer />
    </>
  );
};

export default page;
