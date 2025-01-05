"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TypewriterEffect as TypeEffect } from "@/components/ui/typewriter-effect";

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  // console.log(session?.user)
  const words = [
    {
      text: "OA",
      className: "rubik-vinyl-regular",
    },
    {
      text: "Footwears",
      className: "rubik-vinyl-regular",
    },
  ];
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundBeams />
      <div className="z-10 flex flex-col items-center justify-center">
        <div className="px-2 py-4 mx-3 my-6">
          <TypeEffect words={words} />
        </div>
        <div className="font-medium text-2xl">
          "Stepping Up Your Business, One Pair at a Time!"
        </div>
        <div className="my-4">
          <Button variant={'outline'} className="px-3 py-6 rounded-3xl" onClick={()=>{router.push("/products")}}>Explore our Collection</Button>
        </div>
      </div>
    </div>
  );
}
