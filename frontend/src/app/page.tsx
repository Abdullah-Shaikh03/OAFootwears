"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "To",
    },
    // {
    //   text: "",
    // },
    // {
    //   text: "with",
    // },
    {
      text: "O&A Footwears.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-neutral-600 dark:text-neutral-200 text-base font-extrabold mb-10">
        Step into Comfort, Walk With Style
      </p>
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Link
          href="./login"
          className={`${buttonVariants({
            variant: "outline",
          })} rounded-xl bg-slate-600 text-white hover:border-slate-600 hover:border-2 text-lg font-semibold w-40 h-10`}
        >
          Explore Collections
        </Link>
        {/* <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button> */}
      </div>
    </div>
  );
};

export default Page;
