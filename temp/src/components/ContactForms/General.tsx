"use client";
import { Button } from "../ui/button";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

const Product = () => {
  return (
    <div className="flex flex-col ">
      <Card>
        <CardHeader>
          <CardTitle>Get In Touch</CardTitle>
          <CardDescription>We are here to help!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex min-w-max gap-4 px-2 py-4">
            <Input type="text" placeholder="Name" className="flex-1" />
            <Input
              type="text"
              placeholder="Contact Number"
              className="flex-1"
              required
            />
          </div>
          <div className="flex-col px-2 py-4">
            <Input
              type="email"
              placeholder="someone@example.com"
              className="mb-6"
              required
            />
            <Input
              type="text"
              placeholder="Your store name (non-retailer or non-shop owners put NA)"
              className="mb-6"
              required
            />
            <Textarea placeholder="What you want to know about the Product?" />
          </div>
        </CardContent>
        <CardFooter className="items-center">
          <Button className="min-w-full">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Product;
