'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NavLinks = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Collection", link: "/collection" },
  { id: 3, name: "Reviews", link: "/reviews" },
  { id: 4, name: "Dashboard", link: "/dashboard" },
  { id: 5, name: "Contact", link: "/contact" },
];

const HeaderNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

return (
    <div
        className={`${props.className} bg-white/20 mx-20 my-10 shadow-2xl border-2 overflow-hidden ${isOpen ? 'rounded-3xl' : "rounded-full"}`}
    >
        <header className="text-slate-700 container relative mx-auto flex flex-col overflow-hidden px-4 py-4 xl:flex-row xl:items-center">
            <Link
                href="/"
                className="flex items-center whitespace-nowrap text-2xl font-black"
            >
                <span className="mr-2 ">
                    <Image width={150} height={115} src="/Logo.webp" alt="Logo" />
                </span>
            </Link>
            <button
                onClick={toggleNavbar}
                className="absolute top-5 right-5 cursor-pointer xl:hidden"
            >
                <svg
                    className="h-7 w-7"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </button>
            <nav
                aria-label="Header Navigation"
                className={`${
                    isOpen ? 'block duration-500' : 'hidden'
                } xl:flex w-full flex-col items-center overflow-hidden transition-all xl:ml-24 xl:max-h-full xl:flex-row rounded-2xl`}
            >
                <ul className="flex w-full flex-col items-center space-y-2 xl:flex-row xl:justify-center xl:space-y-0">
                    {NavLinks.map((link) => (
                        <li key={link.id} className="xl:mr-12">
                            <Link
                                href={link.link}
                                className="rounded-full text-primary font-heading hover:bg-primary/20 hover:px-2 hover:py-1 duration-500 hover:text-md"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <hr className="mt-4 w-full xl:hidden bg-primary h-1" />
                <div className="my-4 flex justify-center items-center space-x-6 space-y-2 xl:my-0 xl:ml-auto xl:space-x-8 xl:space-y-0">
                    <Link
                        href="/login"
                        className="whitespace-nowrap rounded-xl sm:text-xl bg-primary px-5 py-3 font-heading text-white transition-all duration-200 hover:bg-primary/20 border-2 border-primary hover:text-primary"
                    >
                        Login
                    </Link>
                </div>
            </nav>
        </header>
    </div>
);
};

export default HeaderNav;
