"use client";
import Link from "next/link";
import { TextField } from "@mui/material";

const page = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="font-f text-gray-900 sm:px-10 bg-white bg-opacity-25 shadow-2xl min-w-[90%] rounded-3xl border-2 border-primary/30">
        <div className="text-gray-900">
          <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            <div className="mx-2 pt-12 text-center md:mx-auto md:w-2/3 md:pb-12">
              <h1 className="mb-4 text-3xl font-black sm:text-5xl xl:text-6xl font-heading">
                Contact us
              </h1>
              <div className="text-lg sm:text-xl xl:text-xl"></div>
            </div>
          </div>
        </div>
        <div className="mx-auto mb-20 flex w-full max-w-screen-lg flex-col overflow-hidden rounded-xl text-gray-900 md:flex-row">
          <form className="mx-auto w-full max-w-xl px-10 py-8 md:px-8">
            <div className="mb-4">
              <TextField
                id="standard-basic"
                label="Email"
                variant="standard"
                required
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                id="standard-basic"
                label="Phone"
                variant="standard"
                required
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                id="standard-basic"
                label="Store Name and Address"
                variant="standard"
                required
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                id="standard-multiline-static"
                label="What can we help you with?"
                variant="standard"
                rows={4}
                multiline
                required
              />
            </div>
            <div className="flex items-center">
              <div className="flex-1 sm:flex sm:items-center sm:justify-center"></div>
              <button
                className="rounded-xl bg-primary border-primary border-2 px-4 py-3 text-center font-bold text-white hover:bg-primary/30 hover:text-primary"
                type="submit"
              >
                Send message
              </button>
            </div>
          </form>
          <div className="mt-10 px-10 py-8 text-primary md:mt-0 md:ml-auto">
            <div className="">
              <p className="mb-4 font-medium border-b  pb-2">OFFICE HOURS</p>
              <p className="mb-4">Monday – Thursday: 08:00 – 16:00</p>
              <p className="mb-4">Friday: 08:00 - 15:00</p>
              <p className="mb-4">Weekend: Closed</p>
              <p className="mb-4">
                Email:
                <Link href="#" className="font-semibold underline"></Link>
              </p>
              <p className="mb-4">
                Phone:
                <Link href="#" className="font-semibold underline">
                  {`Contact Number`}
                </Link>
              </p>
              <hr className="my-2 h-0 border-t border-r-0 border-b-0 border-l-0 border-primary" />
              {/* <p className="mb-4">Org.no: 63452-2832</p>
              <p className="mb-4">VAT no: 32353</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
