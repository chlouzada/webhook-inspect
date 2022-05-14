import React from "react";
import { Header as MantineHeader } from "@mantine/core";
import logo from "../../../images/json_logo.svg";

function Header() {
  return (
    <MantineHeader height={64} p="xs" className="px-4 flex justify-between">
      <div className="h-12 w-24">Logo</div>
      <div className="flex items-center gap-2 md:gap-5">
        <button className="p-1 px-3 rounded-full">Sign In</button>
        <button className="p-1 px-3 border border-blue-400 rounded-full">
          Sign Up
        </button>
      </div>
    </MantineHeader>
  );
}

export default Header;
