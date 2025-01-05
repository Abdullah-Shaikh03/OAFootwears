"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useSession } from "next-auth/react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Page() {
  const { data: session } = useSession();

  const words = `Stepping Up Your Business, One Pair at a Time!`;
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundBeams />
      <div className="">

      </div>
      <TextGenerateEffect duration={2} filter={false} words={words} />
    </div>
  );
}
