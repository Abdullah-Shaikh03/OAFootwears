"use client";

import React from "react";
import HeaderNav from "./HeaderNav";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const RenderNav = () => {
  const pathname = usePathname();

  const [showHeader, setShowHeader] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const cueentScrollY = window.scrollY;
      if (cueentScrollY > prevScrollY) {
        setShowHeader(false);
      }else{
        setShowHeader(true);
      }
      setPrevScrollY(cueentScrollY);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <>
      <HeaderNav className={`${pathname === "/dasboard" || !showHeader ? "hidded" : ""} `} />
      <h1>{pathname}</h1>
    </>
  );
};

export default RenderNav;
