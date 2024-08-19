"use client";
import Footer from "@/components/Footer";
import Helpers from "@/config/Helpers";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaBell } from "react-icons/fa";
const Page = () => {
  const router = useRouter();
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [channelImage, setChannelImage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [isVideoLiked, setiIsVideoLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribers, setSubscribers] = useState("");
  const [likes, setLikes] = useState("");
  const [channelID, setChannelID] = useState("");
  const [refresher, setRefresher] = useState(false);
  const [updated,setUpdated]= useState("");
  const [views, setViews] = useState("");
  const [date, setDate] = useState("");

  const checkValue = async () => {
    try {
      const postID = await localStorage.getItem("postID");
      const response = await axios.get(
        `/api/post/post-data/${postID}`,
        Helpers.authHeaders
      );
      console.log(response.data.post.likes.length);

      setDate(new Date(response.data.post.createdAt).toLocaleString());
      setUpdated(new Date(response.data.post.updatedAt).toLocaleString())
      setViews(response?.data?.post?.views?.length);
      const postData = await response.data.post;
      setIsSubscribed(response.data.isSubsscribed);
      setiIsVideoLiked(response.data.isPostLiked);
      const channelData = await response.data.channel;
      setSubscribers(channelData.subscriber.length);
      setVideo(postData.video);
      setTitle(postData.title);
      setLikes(postData.likes.length);
      setDescription(postData.description);
      setChannelImage(channelData.image);
      setChannelID(channelData._id);
      setChannelName(channelData.name);
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
            {video ? (
              <video
                src={video}
                controls
                className="w-full shadow-lg h-auto rounded-lg "
                loop
              />
            ) : (
              <p>Loading video...</p>
            )}
            {/* Channel Profile Section */}
            <div className="flex flex-row items-center space-x-4 mt-4 p-4 bg-white shadow-lg rounded-lg">
              {channelImage && channelName ? (
                <>
                  <div className="flex flex-row gap-4 items-start justify-start">
                    <p className="font-normal text-gray-500 text-sm">
                      {`${views} • Views`}
                    </p>
                    <p className="font-normal text-gray-500 text-sm">
                      {`${likes} • Likes`}
                    </p>
                    <span className="flex gap-1" >
                    <p className="font-normal text-gray-500 text-sm">uploaded_At:</p>
                    <p className="font-light text-gray-500 text-sm">{date}</p>
                    </span>


                    <span className="flex gap-1" >
                    <p className="font-normal text-gray-500 text-sm">updated_At:</p>
                    <p className="font-light text-gray-500 text-sm">{updated}</p>
                    </span>

                  </div>
                </>
              ) : (
                <p>Loading channel info...</p>
              )}
            </div>

            <div className="flex items-center space-x-4 mt-4 p-4 bg-white shadow-lg rounded-lg">
              {channelImage && channelName ? (
                <>
                  <img
                    onClick={channelProfile}
                    src={channelImage}
                    alt={`${channelName} Profile`}
                    className="w-16 h-16 rounded-full hover:scale-110 cursor-pointer transition-transform  object-cover border-2 border-gray-200"
                  />
                  <div className="flex flex-col items-start justify-start">
                    <p className="font-semibold text-lg text-gray-600 ">
                      {channelName}
                    </p>
                    <p className="font-light text-gray-500 text-sm">
                      {`${channelName} • ${subscribers} subscribers`}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={subscribeUser}
                        className="mt-2 px-4 py-1 bg-red-600 flex items-center justify-center gap-2 text-white text-sm rounded-lg shadow hover:bg-red-700  hover:scale-110 cursor-pointer transition-transform"
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
                      <div className=" mt-2 px-4 py-1  flex items-center justify-center rounded-full border border-gray-400 ">
                        <AiFillLike
                          onClick={likePost}
                          className={`text-2xl hover:scale-110 transition-transform cursor-pointer ${
                            isVideoLiked ? "text-black" : "text-gray-500"
                          }`}
                        />
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
              {title || "Loading title..."}
            </pre>
            <pre className=" text-wrap font-sans text-gray-600">
              {description || "Loading description..."}
            </pre>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
