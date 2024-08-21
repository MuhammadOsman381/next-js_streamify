import React from "react";

const Loader = () => {
  return (
    <div class="flex justify-center items-top mt-10 h-screen">
      <div class="  relative inline-flex">
        <div class="w-8 h-8 bg-black rounded-full"></div>
        <div class="w-8 h-8 bg-black rounded-full absolute top-0 left-0 animate-ping"></div>
        <div class="w-8 h-8 bg-black rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
