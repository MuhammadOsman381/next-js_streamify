"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Helpers from "@/config/Helpers";
import { CiEdit } from "react-icons/ci";
import Footer from "@/components/Footer";
import { FaPlay } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import EditChannel from "@/components/EditChannel";
import EditPost from "@/components/EditPost";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { RxCross1 } from "react-icons/rx";

const Page = () => {
  const router = useRouter();
  const defaultPostData = {
    _id: "",
    title: "",
    description: "",
    thumbnail: "",
    video: "",
  };

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

  const [channel, setChannel] = useState(defaultChannelValues);
  const [isEditChannelDisplay, setIsEditChannelDisplay] = useState(false);
  const [isEditPostDisplay, setIsEditPostDisplay] = useState(false);
  const [postData, setPostData] = useState(defaultPostData);
  const [refresher, setRefresher] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getProfileData = () => {
    axios
      .get("/api/user/profile", Helpers.authFileHeaders)
      .then((response) => {
        console.log(response.data.channel);
        setChannel(response.data.channel);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

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

  const editChannel = () => {
    setIsEditChannelDisplay(true);
  };

  const editPost = (id, title, description, thumbnail, video) => {
    setPostData({
      _id: id,
      title: title,
      description: description,
      thumbnail: thumbnail,
      video: video,
    });
    setIsEditPostDisplay(true);
  };

  const deletePost = (postID) => {
    console.log(postID);
    axios
      .delete(`/api/post/delete/${postID}`)
      .then((response) => {
        toast.success(response.data.message);
        setRefresher(!refresher);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProfileData();
  }, [refresher]);

  return (
    <>
      {!isEditChannelDisplay &&
        !isEditPostDisplay &&
        (!isLoading ? (
          <div className="p-5">
            {channel !== null ? (
              <div className="flex flex-col items-center justify-center ">
                <div className="w-full h-40 sm:h-60 md:h-72 lg:h-65 xl:h-65 relative overflow-hidden rounded-lg">
                  <img
                    src={channel.banner}
                    className="w-full h-full object-cover  "
                    alt="Banner"
                  />
                </div>
                <div className="flex flex-col items-center mt-[-50px] sm:mt-[-75px] md:mt-[-100px]">
                  <div className="avatar">
                    <div className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={channel.image} alt="Profile" />
                    </div>
                  </div>

                  {/* User Info Section */}
                  <div className="text-center mt-4 flex flex-col items-center justify-center  ">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                      {channel.name}
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600">
                      {channel.description}
                    </p>

                    <div className="flex gap-3 mt-5 text-gray-600  mb-5 w-auto px-10 py-2 h-auto rounded-lg  bg-white border-t-gray-500 border-t-2 ">
                      <span>
                        {`${channel.subscriber.length} • Subscribers`}
                      </span>
                      <span>{`${channel.posts.length} • Posts`}</span>
                    </div>

                    <div className="flex gap-1  ">
                      <button
                        onClick={editChannel}
                        className="btn btn-primary  text-white btn-sm hover:scale-110 transition-transform rounded-xl"
                      >
                        Edit <CiEdit />
                      </button>

                      <button
                        className="btn bg-red-500 btn-error text-white btn-sm hover:scale-110 transition-transform rounded-xl"
                        onClick={() =>
                          document.getElementById("my_modal_5").showModal()
                        }
                      >
                        Delete <MdDelete />
                      </button>

                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <p className="py-4">
                            Are you sure you want to delete your account?
                          </p>
                          <div className="modal-action">
                            <button
                              className="btn mr-2 btn-primary text-white btn-sm hover:scale-110 transition-transform rounded-xl"
                              onClick={() =>
                                document.getElementById("my_modal_5").close()
                              }
                            >
                              Cancel <RxCross1 />
                            </button>
                            <button
                              className="btn btn-error text-white btn-sm hover:scale-110 transition-transform rounded-xl"
                              onClick={(e) => {
                                e.preventDefault();
                                // Add your delete logic here
                                document.getElementById("my_modal_5").close();
                              }}
                            >
                              Delete <MdDelete />
                            </button>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full min-h-[60vh] flex items-center justify-center  ">
                <span>You have not created your chanel yet!</span>
              </div>
            )}

            <div className="p-10">
              <div className="flex flex-row flex-wrap items-center justify-center gap-10">
                {channel.posts?.length > 0 ? (
                  channel.posts?.map((items) => (
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
                        <h2 className="card-title text-lg ">
                          {truncate(items.title, 5)}
                        </h2>
                        <p>{truncate(items.description, 5)}</p>
                        <div className="flex flex-row gap-3 text-[13px]">
                          <div className="flex flex-row gap-1">
                            <p className="font-normal w-auto h-auto text-gray-600">
                              Likes:
                            </p>
                            <p className="font-light w-auto h-auto text-gray-500">
                              {items.likes.length}
                            </p>
                          </div>

                          <div className="flex flex-row gap-1">
                            <p className="font-normal w-auto h-auto text-gray-600">
                              Views:
                            </p>
                            <p className="font-light w-auto h-auto text-gray-500">
                              {items.views.length}
                            </p>
                          </div>
                        </div>
                        <div className="card-actions mb-2 justify-end">
                          <button
                            onClick={() =>
                              editPost(
                                items._id,
                                items.title,
                                items.description,
                                items.thumbnail,
                                items.video
                              )
                            }
                            className="btn btn-primary text-white  hover:scale-110 transition-transform btn-sm rounded-xl"
                          >
                            Edit <CiEdit />
                          </button>

                          <button
                            className="btn  btn-error text-white btn-sm hover:scale-110 transition-transform rounded-xl"
                            onClick={() =>
                              document.getElementById("my_modal_9").showModal()
                            }
                          >
                            Delete <MdDelete />
                          </button>

                          <dialog
                            id="my_modal_9"
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <p className="py-4">
                                Are you sure you want to delete your post?
                              </p>
                              <div className="modal-action">
                                <button
                                  className="btn mr-2 btn-primary text-white btn-sm hover:scale-110 transition-transform rounded-xl"
                                  onClick={() =>
                                    document
                                      .getElementById("my_modal_9")
                                      .close()
                                  }
                                >
                                  Cancel <RxCross1 />
                                </button>
                                <button
                                  className="btn btn-error text-white btn-sm hover:scale-110 transition-transform rounded-xl"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deletePost(items._id);
                                    document
                                      .getElementById("my_modal_9")
                                      .close();
                                  }}
                                >
                                  Delete <MdDelete />
                                </button>
                              </div>
                            </div>
                          </dialog>
                        </div>
                      </div>
                    </div>
                  ))
                ) : channel !== null ? (
                  <div>No posts are available on your account!</div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        ))}

      {isEditChannelDisplay && <EditChannel channel={channel} />}

      {isEditPostDisplay && <EditPost postData={postData} />}

      <Footer />
    </>
  );
};

export default Page;
