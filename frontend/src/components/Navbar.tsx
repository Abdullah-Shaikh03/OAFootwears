"use client";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
const Navbar = () => {
  const links = [
    {
      id: 1,
      title: "Collections",
      link: "./collections",
    },
    {
      id: 2,
      title: "Reviews",
      link: "./reviews",
    },
    {
      id: 3,
      title: "Contact",
      link: "./contact",
    },
  ];
  return (
    <header className="shadow mb-2 my-2 overflow-hidden">
      <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <span className="text-3xl font-bold text-gray-900 md:text-4xl min-w-max ">
          <Link href={"/"}>O&A Footwears</Link>
        </span>
        <input type="checkbox" className="peer hidden" id="navbar-open" />
        <label
          className="absolute top-5 right-7 cursor-pointer md:hidden"
          htmlFor="navbar-open"
        >
          <span className="sr-only">Toggle Navigation</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <nav
          aria-label="Header Navigation"
          className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
        >
          <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0 gap-4">
            {links.map((link) => (
              <li
                className="px-4 py-1 rounded-xl duration-300 ease-in-out hover:bg-slate-600 hover:text-white hover:border-slate-600 hover:border-2"
                key={link.id}
              >
                <Link href={link.link}>{link.title}</Link>
              </li>
            ))}
            <li className="md:mr-12 hover:text-blue-600">
              <Link
                href="./login"
                className={`${buttonVariants({
                  variant: "outline",
                })} rounded-xl bg-slate-600 text-white hover:border-slate-600 hover:border-2`}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
