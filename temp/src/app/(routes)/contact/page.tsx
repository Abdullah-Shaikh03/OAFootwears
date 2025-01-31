import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Product from "@/components/ContactForms/Product";
import General from "@/components/ContactForms/General";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <Tabs defaultValue="account" className="flex flex-col items-center justify-center w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="product">Product</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <General />
          </TabsContent>
          <TabsContent value="product">
            <Product />
          </TabsContent>
        </Tabs>
    </div>
  );
};

export default page;
