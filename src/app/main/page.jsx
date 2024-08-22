"use client";
import Footer from "@/components/Footer";
import Helpers from "@/config/Helpers";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { PiTelevisionFill } from "react-icons/pi";
import Loader from "@/components/Loader";

const page = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
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
       {isLoading?
      <Loader/>:
      <div className="flex flex-row flex-wrap items-center justify-center gap-10">
      {posts?.length > 0 ?
        posts.map((items) => (
          <div className="hover:scale-105 transition-transform card bg-base-100 image-full w-96 shadow-xl">
            <figure>
              <img src={items.thumbnail} alt="Shoes" />
            </figure>
            <div className="card-body ">
              <h2 className="card-title hover:scale-105 transition-transform">{truncate(items.title, 5)}</h2>
              <p className="hover:scale-105 transition-transform" >{truncate(items.description, 4)}</p>

              <div className="flex flex-row gap-5">
                <span className="hover:scale-105 transition-transform flex flex-row items-center justify-center gap-1 w-7 ">
                  <p >
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
                onClick={()=>single_post(items?._id)}
                 className=" hover:scale-110 transition-transform btn btn-error btn-sm text-white ">
                  Watch <FaEye />
                </button>
              </div>
            </div>
            
          </div>
        )):
        <div>
          No posts are available now!
        </div>
        }
    </div> 
      }
      </div>
      <Footer />
    </>
  );
};

export default page;
