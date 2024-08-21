"use client";
import Helpers from "@/config/Helpers";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoPersonAdd } from "react-icons/io5";

const EditChannel = (props) => {
  const [title, setTitle] = useState(props.channel.name);
  const [description, setDescription] = useState(props.channel.description);
  const [profileImage, setProfileImage] = useState(props.channel.image);
  const [bannerImage, setBannerImage] = useState(props.channel.image);
  const [profilePreview, setProfilePreview] = useState(props.channel.image);
  const [bannerPreview, setBannerPreview] = useState(props.channel.banner);

  const handleImageUpload = (event, setImage, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", profileImage);
    formData.append("banner", bannerImage);
    axios
      .put(
        `/api/channel/edit/${props.channelID}`,
        formData,
        Helpers.authFileHeaders
      )
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex items-center justify-center p-5">
        <div className="flex w-full max-w-[35rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="p-6">
            <div className="block overflow-visible">
              <nav></nav>
              <div className="block w-full overflow-hidden bg-transparent">
                <div
                  role="tabpanel"
                  className="w-full p-0 font-sans text-base antialiased font-light leading-relaxed text-gray-700 h-max"
                >
                  <form
                    className="flex flex-col gap-4 mt-2"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <p className="block mb-2 font-sans text-sm font-medium leading-normal text-blue-gray-900">
                        Edit Name
                      </p>
                      <div className="relative h-10 w-full min-w-[200px]">
                        <input
                          type="text"
                          placeholder="Account name..."
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all focus:border-2 focus:border-gray-900"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="block mb-2 font-sans text-sm font-medium leading-normal text-blue-gray-900">
                      Edit Description
                      </p>
                      <div className="h-20 w-full min-w-[200px]">
                        <textarea
                          placeholder="Channel description..."
                          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline-none transition-all focus:border-2 focus:border-gray-900"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>

                    <p className="block font-sans text-sm font-medium leading-normal text-blue-gray-900">
                    Edit Channel Profile
                    </p>
                    <label
                      className="flex cursor-pointer justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      tabIndex="0"
                    >
                      <span className="flex items-center space-x-2">
                        {profilePreview ? (
                          <img
                            src={profilePreview}
                            alt="Profile Preview"
                            className="h-full w-full object-cover "
                          />
                        ) : (
                          <>
                            <svg
                              className="h-6 w-6 stroke-gray-400"
                              viewBox="0 0 256 256"
                            >
                              <path
                                d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="24"
                              ></path>
                              <path
                                d="M80,128a80,80,0,1,1,144,48"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="24"
                              ></path>
                              <polyline
                                points="118.1 161.9 152 128 185.9 161.9"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="24"
                              ></polyline>
                              <line
                                x1="152"
                                y1="208"
                                x2="152"
                                y2="128"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="24"
                              ></line>
                            </svg>
                            <span className="text-xs font-medium text-gray-600">
                              Drop or Attach Channel profile file
                            </span>
                          </>
                        )}
                      </span>
                      <input
                        id="photo-dropbox"
                        type="file"
                        className="sr-only"
                        onChange={(e) =>
                          handleImageUpload(
                            e,
                            setProfileImage,
                            setProfilePreview
                          )
                        }
                      />
                    </label>

                    <p className="block font-sans text-sm font-medium leading-normal text-blue-gray-900">
                    Edit Banner
                    </p>
                    <label
                      className="flex cursor-pointer justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      tabIndex="0"
                    >
                      <span className="flex items-center space-x-2">
                        {bannerPreview ? (
                          <img
                            src={bannerPreview}
                            alt="Banner Preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <>
                            <svg
                              className="h-6 w-6 stroke-gray-400"
                              viewBox="0 0 256 256"
                            >
                              <path
                                d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="24"
                              ></path>
                              <path
                                d="M80,128a80,80,0,1,1,144,48"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="24"
                              ></path>
                              <polyline
                                points="118.1 161.9 152 128 185.9 161.9"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="24"
                              ></polyline>
                              <line
                                x1="152"
                                y1="208"
                                x2="152"
                                y2="128"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="24"
                              ></line>
                            </svg>
                            <span className="text-xs font-medium text-gray-600">
                              Drop or Attach Banner file
                            </span>
                          </>
                        )}
                      </span>
                      <input
                        id="banner-dropbox"
                        type="file"
                        className="sr-only"
                        onChange={(e) =>
                          handleImageUpload(e, setBannerImage, setBannerPreview)
                        }
                      />
                    </label>

                    <button
                      className="select-none rounded-lg bg-black py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      type="button"
                      onClick={handleSubmit}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <span>Edit</span> 
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditChannel;
