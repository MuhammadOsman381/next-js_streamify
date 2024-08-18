import React from "react";
import { FaEye } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
const Post = (props) => {
  const router = useRouter();

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
    localStorage.setItem("postID", value);
    router.push("/main/single-post");
  };

  return (
    <div className="p-10">
      <div className="flex flex-row flex-wrap items-center justify-center gap-10">
        {props.posts?.length > 0 ? (
          props.posts?.map((items) => (
            <div
              key={items.id}
              className="card card-compact hover:scale-105 cursor-pointer transition-transform bg-base-100 w-96 shadow-xl"
            >
              <figure className="relative">
                <img
                  onClick={() => single_post(items._id)}
                  src={items.thumbnail}
                  alt="Thumbnail"
                />
                <div
                  onClick={() => single_post(items._id)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-90  transition-opacity"
                >
                  <FaPlay
                    onClick={() => single_post(items._id)}
                    className="text-white hover:scale-110 transition-transform text-4xl"
                  />
                </div>
              </figure>
              <div className="px-5 py-2">
                <h2 className="card-title text-lg ">{items.title}</h2>
                <p>{truncate(items.description, 5)}</p>
                <div className="flex flex-row gap-1 text-[13px]">
                  <p className="font-normal w-auto h-auto text-gray-600">
                    Likes:
                  </p>
                  <p className="font-light w-auto h-auto text-gray-500">
                    {items.likes.length}
                  </p>
                </div>
                <div className="card-actions mb-2 justify-end">
                  <button className="btn btn-primary btn-sm">
                    Edit <CiEdit />
                  </button>
                  <button className="btn text-white btn-error btn-sm">
                    Delete <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No posts are available on your account!</div>
        )}
      </div>
    </div>
  );
};

export default Post;
