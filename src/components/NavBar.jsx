import React from "react";

const NavBar = () => {
  return (
    <div>
      <div className=" navbar  bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">streamify</a>
        </div>
      </div>

      <div className=" drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
        
        </div>
        <div className="drawer-side">
          <label 
            htmlFor="my-drawer" 
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
