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
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Product Enquiry form</CardTitle>
          <CardDescription>
            What do you want to know? We are here to help!
          </CardDescription>
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
            <div className="flex mb-6 gap-4">
              <Input type="text" placeholder="Brand Name" className="flex-1" />
              <Input
                type="text"
                placeholder="Article"
                className="flex-1"
                required
              />
            </div>
            <Textarea placeholder="What you want to know about the Product?" />
          </div>
        </CardContent>
        <CardFooter className="items-center">
          <Button className="w-full">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Product;
