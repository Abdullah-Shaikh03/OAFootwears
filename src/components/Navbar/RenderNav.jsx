"use client";

import React from "react";
import HeaderNav from "./HeaderNav";
import { usePathname } from "next/navigation";
const RenderNav = () => {
  const pathname = usePathname();
  return (
    <>
      <HeaderNav className={`${pathname === "dasboard" ? "hidded" : ""} `} />
      {/* <h1>{pathname}</h1> */}
    </>
  );
};

export default RenderNav;
