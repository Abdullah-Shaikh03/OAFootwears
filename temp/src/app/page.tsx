'use client'
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useSession } from 'next-auth/react';

export default function Page(){

  const { data: session } = useSession();
  console.log(session?.user)

  return (
    
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BackgroundBeams />
      <Card className="w-[350px] z-10">
        <CardHeader>
          <CardTitle>Welcome to OAFootwears</CardTitle>
          <CardDescription>Walk with Pride</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center">Explore our wide range of products or add your own to the catalog.</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link href="/products">
            <Button variant="outline">View Products</Button>
          </Link>
          <Link href="/products/new" >
            <Button>Add New Product</Button>
          </Link>
          {/* <DeleteButton/> */}
        </CardFooter>
      </Card>
    </div>
  );
}

