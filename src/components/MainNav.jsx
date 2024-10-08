"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const MainNav = () => {
  const router = useRouter();
  const logout_user = () => {
    toast.success("User logout succesfully!");
    const daysToExpire = 0;
    const expires = new Date(
      Date.now() + daysToExpire * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `token=null; expires=${expires}; path=/; SameSite=Lax; Secure`;
    localStorage.clear();
    router.push("/");
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <label
            htmlFor="my-drawer"
            className="btn btn-square btn-ghost drawer-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">streamify</a>
        </div>
      </div>

      <div className="drawer  z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle  " />

        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <Link href={"/main"}>
              <li className="hover:scale-105 transition-transform">
                <span>Home</span>
              </li>
            </Link>

            <Link href={"/main/profile"}>
              <li className="hover:scale-105 transition-transform">
                <span>Profile</span>
              </li>
            </Link>

            <Link href={"/main/liked-videos"}>
              <li className="hover:scale-105 transition-transform">
                <span>Liked Videos</span>
              </li>
            </Link>

            <Link href={"/main/subscription"}>
              <li className="hover:scale-105 transition-transform">
                <span>Subscribed Channels</span>
              </li>
            </Link>

            <Link href={"/main/create-channel"}>
              <li className="hover:scale-105 transition-transform">
                <span>Create Channel</span>
              </li>
            </Link>

            <Link href={"/main/create-post"}>
              <li className="hover:scale-105 transition-transform">
                <span>Create Post</span>
              </li>
            </Link>

            {/* <Link href={"/"}> */}
            <li
              onClick={logout_user}
              className="hover:scale-105 transition-transform  w-24  "
            >
              <span className="btn btn-primary btn-sm">Logout</span>
            </li>
            {/* </Link> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
