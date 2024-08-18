import React from "react";
import { FaEye } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import Footer from "./Footer";
const ChannelProfile = (props) => {
  const router = useRouter();

  const truncate = (words, length) => {
    if (!words || typeof words !== "string") {
      // Handle the case where words is not a valid string
      return "";
    }

    const wordArray = words.split(" ");
    let truncated = "";

    if (wordArray.length <= length) {
      return words;
    }

    wordArray.map((item) => {
      if (truncated.split(" ").length + 1 <= length) {
        truncated = truncated + (truncated ? " " : "") + item;
      }
    });

    return truncated + "...";
  };

  const single_post = (value) => {
    console.log(value);
    localStorage.setItem("postID", value);
    router.push("/main/single-post");
  };

  return (
    <>
      <div className="p-10">
        <div className="flex flex-row flex-wrap items-center justify-center gap-10">
          {props.posts?.length > 0 ? (
            props.posts?.map((items) => (
              <div
                key={items?.id}
                className="card card-compact hover:scale-105 cursor-pointer transition-transform bg-base-100 w-96 shadow-xl"
              >
                <figure className="relative">
                  <img
                    onClick={() => single_post(items?._id)}
                    src={items?.thumbnail}
                    alt="Thumbnail"
                  />
                  <div
                    onClick={() => single_post(items?._id)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-90  transition-opacity"
                  >
                    <FaPlay
                      onClick={() => single_post(items?._id)}
                      className="text-white hover:scale-110 transition-transform text-4xl"
                    />
                  </div>
                </figure>
                <div className="px-5 py-4">
                  <h2 className="card-title text-lg ">
                    {truncate(items?.title, 4)}
                  </h2>
                  <p>{truncate(items?.description, 5)}</p>

                  <div className="flex gap-2">
                    <div className="flex flex-row gap-1 text-[13px]">
                      <p className="font-normal w-auto h-auto text-gray-600">
                        Likes:
                      </p>
                      <p className="font-light w-auto h-auto text-gray-500">
                        {items?.likes?.length}
                      </p>
                    </div>

                    <div className="flex flex-row gap-1 text-[13px]">
                      <p className="font-normal w-auto h-auto text-gray-600">
                        Views:
                      </p>
                      <p className="font-light w-auto h-auto text-gray-500">
                        {items?.views?.length}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-1 text-[13px]">
                    <p className="font-normal w-auto h-auto text-gray-600">
                      Uploaded-At:
                    </p>
                    <p className="font-light w-auto h-auto text-gray-500">
                      {new Date(items?.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No posts are available on your account!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChannelProfile;
