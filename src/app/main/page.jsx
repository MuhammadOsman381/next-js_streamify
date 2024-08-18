"use client";
import Footer from "@/components/Footer";
import Helpers from "@/config/Helpers";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

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

  const getPostData = () => {
    axios
      .get("/api/post/get", Helpers.authHeaders)
      .then((response) => {
        console.log(response.data.posts);
        setPosts(response.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const single_post = (value) => {
    console.log(value);
    localStorage.setItem("postID", value);
    router.push("/main/single-post");
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <>
      <div className="min-h-[100vh] p-10">
        <div className="flex flex-row flex-wrap items-center justify-center gap-10">
          {posts?.length > 0 ? (
            posts?.map((items) => (
              <div
                key={items.id}
                onClick={() => single_post(items._id)}
                className="card card-compact hover:scale-105 cursor-pointer transition-transform bg-base-100 w-96 shadow-xl"
              >
                <figure className="relative">
                  <img src={items.thumbnail} alt="Thumbnail" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-90  transition-opacity">
                    <FaPlay className="text-white hover:scale-110 transition-transform text-4xl" />
                  </div>
                </figure>
                <div className="px-6 py-3 mb-3 ">
                  <h2 className="card-title">{truncate(items.title, 4)}</h2>
                  <p>{truncate(items.description, 5)}</p>

                  <div className="flex flex-wrap gap-2 mt-2 ">
                    <div className="flex flex-row  text-[13px]">
                      <p className="font-normal w-auto h-auto text-gray-600">
                        Likes:
                      </p>
                      <p className="font-light w-auto h-auto text-gray-500">
                        {items?.likes?.length}
                      </p>
                    </div>
                    <div className="flex flex-row  text-[13px]">
                      <p className="font-normal w-auto h-auto text-gray-600">
                        Views:
                      </p>
                      <p className="font-light w-auto h-auto text-gray-500">
                        {items?.views?.length}
                      </p>
                    </div>

                    <div className="flex flex-row  text-[13px]">
                      <p className="font-normal w-auto h-auto text-gray-600">
                        Uploaded-At:
                      </p>
                      <p className="font-light w-auto h-auto text-gray-500">
                        {new Date(items?.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Currently no posts are available!</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
