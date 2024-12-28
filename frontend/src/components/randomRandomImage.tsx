'use client'

import Image from 'next/image'
import { useRandomImages } from '@/lib/hooks'
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RandomImages() {
  const { data: images, isLoading, isError } = useRandomImages(3)

  if (isLoading) {
    return <RandomImagesLoading />
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 my-8">
        Failed to load images. Please try again later.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {images?.map((imageUrl:any, index:any) => (
        <Card key={index}>
          <CardContent className="p-0">
            <div className="relative aspect-video">
              <Image
                src={imageUrl}
                alt={`Random footwear image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function RandomImagesLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {[1, 2, 3].map((index) => (
        <Card key={index}>
          <CardContent className="p-0">
            <Skeleton className="aspect-video rounded-t-lg" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

