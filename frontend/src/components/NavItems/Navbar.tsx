"use client";
import React from "react";
import Link from "next/link";
// import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import DropdownMenuCheckboxes from "./DropDown";
import {} from "@/components/ui/dropdown-menu";
import { MdMenu } from "react-icons/md";
const Navbar = () => {
  const links = [
    {
      id: 1,
      name: "Collections",
      link: "./collections",
    },
    {
      id: 2,
      name: "Reviews",
      link: "./reviews",
    },
    {
      id: 3,
      name: "Contact",
      link: "./contact",
    },
  ];


  const pathname = usePathname();
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              O&AFootwears
            </span>
          </Link>
          <div className="flex lg:order-2">
            <span className="rounded-lg flex items-center justify-center px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
              <Link
                href="/Login"
                className="bg-slate-600 text-white hover:bg-slate-700 px-4 py-2 rounded-md"
              >
                Log in
              </Link>
              <DropdownMenuCheckboxes />
            </span>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {links.map((links) => (
                <li key={links.id}>
                  <Link
                    href={links.link}
                    className="block py-2 pr-4 pl-3 rounded bg-primary-700"
                    aria-current="page"
                  >
                    {links.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
