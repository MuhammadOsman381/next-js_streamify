"use client";
import Footer from "@/components/Footer";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { PiTelevisionFill } from "react-icons/pi";
import Loader from "@/components/Loader";

const page = () => {
  const router = useRouter();
  const [likedPosts, setLikedPosts] = useState([]);

  const getLikedPosts = async () => {
    const response = await axios("/api/user/liked-posts");
    console.log(response.data.likedPosts);
    setLikedPosts(response.data.likedPosts);
  };

  useEffect(() => {
    getLikedPosts();
  }, []);

  const truncate = (words, length) => {
    const wordArray = words.split(" ");
    let truncated = "";
    if (wordArray.length == length) {
      truncated = words;
      return truncated;
    } else {
      wordArray.map((items) => {
        if (truncated.split(" ").length + 1 <= length) {
          truncated = truncated + (truncated ? " " : "") + items;
        }
      });
      return truncated + "...";
    }
  };

  const single_post = (value) => {
    console.log(value);
    localStorage.setItem("postID", value);
    router.push("/main/single-post");
  };

  return (
    <div>
      <div className="min-h-[100vh] p-10">
        <div className="flex flex-row flex-wrap items-center justify-center gap-10">
          {likedPosts?.length > 0 ?
            likedPosts?.map((items) => (
              <div className="hover:scale-105 transition-transform card bg-base-100 image-full w-96 shadow-xl">
                <figure>
                  <img src={items.thumbnail} alt="Shoes" />
                </figure>
                <div className="card-body ">
                  <h2 className="card-title hover:scale-105 transition-transform">
                    {truncate(items.title, 5)}
                  </h2>
                  <p className="hover:scale-105 transition-transform">
                    {truncate(items.description, 4)}
                  </p>

                  <div className="flex flex-row gap-5">
                    <span className="hover:scale-105 transition-transform flex flex-row items-center justify-center gap-1 w-7 ">
                      <p>
                        <FaHeart className="text-red-600" />
                      </p>

                      <p>{items?.likes?.length}</p>
                    </span>

                    <span className="hover:scale-105 transition-transform flex flex-row items-center justify-center gap-1 w-7 ">
                      <p>
                        <PiTelevisionFill className="text-blue-600" />
                      </p>

                      <p>{items?.views?.length}</p>
                    </span>
                  </div>

                  <div className=" card-actions justify-end">
                    <button
                      onClick={() => single_post(items?._id)}
                      className=" hover:scale-110 transition-transform btn btn-error btn-sm text-white "
                    >
                      Watch <FaEye />
                    </button>
                  </div>
                </div>
              </div>
            )):
            <div>
              No liked videos found
            </div>
            }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
