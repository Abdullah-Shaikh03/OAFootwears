"use client";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="text-base mx-8 md:mx-12 border-white border-[1px] lg:mx-16 mt-12 backdrop-filter backdrop-blur-sm bg-opacity-[20%] bg-white top-4 z-50 sticky rounded-3xl  shadow-2xl lg:rounded-full">
      <header className="text-primary">
        <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
          <Link
            href="#"
            className="flex items-center whitespace-nowrap text-2xl font-black"
          >
            <span className="text-black font-heading text-3xl">O &amp; A Footwear</span>
          </Link>
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
            <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
              <li className="md:mr-12">
                <Link href="#">Our Collection</Link>
              </li>
              <li className="md:mr-12">
                <Link href="#">contact</Link>
              </li>
              <hr className="md:hidden"/>
              <li>

              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
