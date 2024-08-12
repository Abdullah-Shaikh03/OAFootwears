import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const shoeCategories = [
    {
      id: 1,
      name: "Sneakers",
      image:
        "https://images.unsplash.com/photo-1579446650032-86effeeb3389?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Boots",
      image:
        "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Sandals",
      image:
        "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Crocs",
      image:
        "https://images.unsplash.com/photo-1603145733190-59811e523c72?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      name: "Formals",
      images:
        "https://images.unsplash.com/photo-16https://images.unsplash.com/photo-1576133385309-203e67da8e58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D73201183171-0884d985b81d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section>
      <div className="py-4 px-2 mx-auto max-w-screen-xl sm:py-4 lg:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 h-full">
          {shoeCategories.map((category) => (
            <div
              key={category.id}
              className="col-span-2 sm:col-span-1 md:col-span-2 h-auto md:h-full flex flex-col"
            >
              <Link
                href=""
                className="group relative flex flex-col overflow-hidden rounded-lg px-4 pb-4 pt-40 flex-grow"
              >
                <Image
                  width={100}
                  height={100}
                  src={category.image}
                  alt="Slippers"
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 "></div>
                <h3 className="z-10 text-2xl font-bold absolute top-0 left-0 p-4 xs:text-xl md:text-3xl">
                  {category.name}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;
