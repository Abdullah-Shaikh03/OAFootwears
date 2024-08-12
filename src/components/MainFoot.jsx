"use client";
import React from "react";
import { usePathname } from "next/navigation";
import NavLinks from "./Navbar/NavLinks";

const MainFoot = () => {
  const pathname = usePathname();
  return (
    <footer
      className={`mt-auto w-screen bg-primary/25 flex md:flex-row  flex-col gap-5`}
    >
      <section className="relative">
        <h1 className="font-heading text-4xl mx-2 lg:px-28 lg:py-14 sm:px-14 pt-7 font-bold">
          O & A Footwears
        </h1>
      </section>
      <section className="flex-2/3 flex lg:ms-auto mx-10 font-bold text-xl mt-4">
        <ul className="sm:flex mt-10">
          <NavLinks />
        </ul>
      </section>
    </footer>
  );
};

export default MainFoot;
