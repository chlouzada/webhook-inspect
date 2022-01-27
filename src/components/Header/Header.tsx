import React from "react";

import logo from "../../../images/json_logo.svg";

function Header() {
  return (
    <header className="flex justify-between p-1 pb-2 md:p-5 container mx-auto">
      <img className=" w-24" src={logo} alt="JSON logo" />
      <div className="flex items-center gap-2 md:gap-5">
        <button className="p-2 md:px-5 rounded-full">Sign In</button>
        <button className="p-2 md:px-5 border border-blue-400 rounded-full">
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
