"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
type Checked = DropdownMenuCheckboxItemProps["checked"];

const DropdownMenuCheckboxes = (props: any) => {
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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-inherit border-none hover:bg-none"
        >
          <Avatar>
            <AvatarImage
              className="w-10 h-10 rounded-full"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>pfp</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 border-none shadow-slate-500 mx-2 shadow-2xl rounded">
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Dashboard
        </DropdownMenuItem>
        <ul className="lg:hidden">
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
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer">
          <ThemeSwitch />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuCheckboxes;
