"use client";
import Footer from "@/components/Footer";
import Helpers from "@/config/Helpers";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Page = () => {
  const router = useRouter();
  const defaultChannelValues = {
    banner: "",
    createdAt: "",
    updatedAt: "",
    description: "",
    image: "",
    name: "",
    posts: [],
    subscriber: [],
    _id: "",
  };

  const defaultPostValues = {
    createdAt: "",
    updatedAt: "",
    channelID: "",
    description: "",
    likes: [],
    thumbnail: "",
    title: "",
    video: "",
    views: [],
    _id: "",
  };

  const [channel, setChannel] = useState(defaultChannelValues);
  const [post, setPost] = useState(defaultPostValues);
  const [isVideoLiked, setiIsVideoLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [channelID, setChannelID] = useState("");
  const [refresher, setRefresher] = useState(false);

  const checkValue = async () => {
    try {
      const postID = await localStorage.getItem("postID");
      const response = await axios.get(
        `/api/post/post-data/${postID}`,
        Helpers.authHeaders
      );
      setPost(response.data.post);
      setChannel(response.data.channel);
      setIsSubscribed(response.data.isSubsscribed);
      setiIsVideoLiked(response.data.isPostLiked);
      const channelData = await response.data.channel;
      setChannelID(channelData._id);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  const subscribeUser = async () => {
    const postID = await localStorage.getItem("postID");
    const response = await axios.get(
      `/api/post/subscribe/${postID}`,
      Helpers.authHeaders
    );
    setRefresher(!refresher);
    console.log(response);
  };

  const likePost = async () => {
    const postID = await localStorage.getItem("postID");
    const response = await axios.get(
      `/api/post/like/${postID}`,
      Helpers.authHeaders
    );
    setRefresher(!refresher);
    console.log(response);
  };

  const channelProfile = () => {
    localStorage.setItem("channelID", channelID);
    router.push("/main/channel-profile");
  };

  useEffect(() => {
    checkValue();
  }, [refresher]);

  return (
    <>
      <div className=" w-full p-5 max-sm:p-0  min-h-[90vh]">
        <div className="flex flex-col md:flex-row md:justify-between p-4 space-y-6 md:space-y-0 md:space-x-6">
          <div className="w-full  md:w-2/3">
            {post.video ? (
              <video
                src={post.video}
                controls
                className="w-full shadow-lg h-auto rounded-lg "
                loop
              />
            ) : (
              <p>Loading video...</p>
            )}
            {/* Channel Profile Section */}
            <div className="flex flex-row  items-center space-x-4 mt-4 p-4 bg-white shadow-lg rounded-lg">
              {channel.image && channel.name ? (
                <>
                  <div className="flex flex-row gap-4 items-start justify-start">
                    <p className="font-normal text-gray-500 text-sm">
                      {`${post.views.length} • Views`}
                    </p>
                    <p className="font-normal text-gray-500 text-sm">
                      {`${post.likes.length} • Likes`}
                    </p>
                    <span className="flex gap-1">
                      <p className="font-normal text-gray-500 text-sm">
                        uploaded_At:
                      </p>
                      <p className="font-light text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </span>

                    <span className="flex gap-1">
                      <p className="font-normal text-gray-500 text-sm">
                        updated_At:
                      </p>
                      <p className="font-light text-gray-500 text-sm">
                        {new Date(post.updatedAt).toLocaleString()}
                      </p>
                    </span>
                  </div>
                </>
              ) : (
                <p>Loading channel info...</p>
              )}
            </div>

            <div className="flex items-center space-x-4 mt-4 p-4 bg-white shadow-lg rounded-lg">
              {channel.image && channel.name ? (
                <>
                  <img
                    onClick={channelProfile}
                    src={channel.image}
                    alt={`${channel.name} Profile`}
                    className="w-16 h-16 rounded-full hover:scale-110 cursor-pointer transition-transform  object-cover border-2 border-gray-200"
                  />
                  <div className="flex flex-col items-start justify-start">
                    <p className="font-semibold text-lg text-gray-600 ">
                      {channel.name}
                    </p>
                    <p className="font-light text-gray-500 text-sm">
                      {`${channel.name} • ${channel.subscriber.length} subscribers`}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={subscribeUser}
                        className="mt-2 px-4 py-1 opacity-80  hover:opacity-100 bg-red-600 flex items-center justify-center gap-2 text-white text-sm rounded-lg shadow hover:bg-red-700  hover:scale-110 cursor-pointer transition-transform"
                      >
                        {isSubscribed ? (
                          <>
                            <span>Subscribed</span> <FaBell />
                          </>
                        ) : (
                          <>
                            <span>Subscribe</span> <FaBell />
                          </>
                        )}
                      </button>
                      <div className=" text-red-600 mt-2   flex items-center justify-center rounded-full border-none ">
                        {!isVideoLiked ? (
                          <FaRegHeart
                            className="text-2xl hover:scale-110 opacity-80  hover:opacity-100 transition-transform cursor-pointer"
                            onClick={likePost}
                          />
                        ) : (
                          <FaHeart
                            className="text-2xl opacity-80  hover:opacity-100 hover:scale-110  transition-all cursor-pointer"
                            onClick={likePost}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading channel info...</p>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/3 space-y-4">
            <pre className="text-wrap font-sans text-2xl text-gray-600 font-bold">
              {post.title || "Loading title..."}
            </pre>
            <pre className=" text-wrap font-sans text-gray-600">
              {post.description || "Loading description..."}
            </pre>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
