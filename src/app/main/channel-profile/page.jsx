"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Helpers from "@/config/Helpers";
import Footer from "@/components/Footer";
import { FaBell } from "react-icons/fa";
import Loader from "@/components/Loader";
import Posts from "@/components/Posts";

const Page = () => {
  const [channel, setChannel] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isChannelSubscribed, setIsChannelSubscribed] = useState(false);
  const [refresher, setRefresher] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getChannel = async () => {
    try {
      const channelID = localStorage.getItem("channelID");
      const response = await axios.get(
        `/api/channel/get/${channelID}`,
        Helpers.authHeaders
      );
      setIsChannelSubscribed(response.data.isChannelSubscribed);
      setPosts(response.data.posts);
      setChannel(response.data.channel);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const subscribeUser = async (channelID) => {
    try {
      const response = await axios.get(
        `/api/post/subscribe/${channelID}`,
        Helpers.authHeaders
      );
      setRefresher(!refresher);
      console.log(response);
    } catch (error) {
      console.error("Error subscribing to channel:", error);
    }
  };

  useEffect(() => {
    getChannel();
  }, [refresher]);

  return (
    <>
      <div className="p-5 min-h-[90vh]">
        {isLoading ? (
          <Loader />
        ) : channel ? (
          <>
            {channel.length > 0 ? (
              channel.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col items-center justify-center "
                >
                  {/* Banner Section */}
                  <div className="w-full h-40 sm:h-60 md:h-72 lg:h-65 xl:h-65 relative overflow-hidden rounded-lg">
                    <img
                      src={item.banner}
                      className="w-full h-full object-cover"
                      alt="Banner"
                    />
                  </div>

                  {/* Profile Section */}
                  <div className="flex flex-col items-center mt-[-50px] sm:mt-[-75px] md:mt-[-100px]">
                    <div className="avatar">
                      <div className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={item.image} alt="Profile" />
                      </div>
                    </div>

                    {/* User Info Section */}
                    <div className="text-center mt-4 flex flex-col items-center justify-center">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        {item.name}
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600">
                        {item.description}
                      </p>
                      <div className="flex gap-1 mt-5">
                        <button
                          onClick={() => subscribeUser(item._id)}
                          className="mt-2 px-4 py-1 opacity-80 hover:opacity-100 bg-red-600 flex items-center justify-center gap-2 text-white text-sm rounded-lg shadow hover:bg-red-700 hover:scale-110 cursor-pointer transition-transform"
                        >
                          {isChannelSubscribed ? (
                            <>
                              <span>Subscribed</span> <FaBell />
                            </>
                          ) : (
                            <>
                              <span>Subscribe</span> <FaBell />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No channel found</div>
            )}
            <Posts posts={posts} />
          </>
        ) : (
          <div>No channel data available</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Page;
