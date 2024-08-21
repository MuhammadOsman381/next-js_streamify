import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";


const Profile = (props) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        {/* Banner Section */}
        <div className="w-full h-20 sm:h-60 md:h-72 lg:h-80 xl:h-65 relative overflow-hidden rounded-lg">
          <img
            src={props.banner}
            className="w-full h-full object-cover"
            alt="Banner"
          />
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center mt-[-50px] sm:mt-[-75px] md:mt-[-100px]">
          <div className="avatar">
            <div className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={props.image}
                alt="Profile"
              />
            </div>
          </div>

          {/* User Info Section */}
          <div className="text-center mt-4 flex flex-col items-center justify-center  ">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {props.name}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              {props.description}
            </p>
            <div className="flex gap-1 mt-5 " >
            <button className="btn btn-primary  text-white btn-sm hover:scale-110 transition-transform rounded-xl">
              Edit <CiEdit />
            </button>
            <button className="btn btn-error    text-white btn-sm hover:scale-110 transition-transform rounded-xl">
              Delete <MdDelete />
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
