"use client";
import Link from "next/link";
import { TextField } from "@mui/material";
import React from "react";

const Page = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    phone: "",
    storeDetails: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Email sent successfully');
        setFormData({
          email: "",
          phone: "",
          storeDetails: "",
          message: "",
        });
      } else {
        alert('Error sending email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  return (
    <div className="flex items-center justify-center mb-12">
      <div className="font-f text-gray-900 sm:px-10 bg-white bg-opacity-25 shadow-2xl min-w-[90%] rounded-3xl border-2 border-primary/30">
        <div className="text-gray-900">
          <div className="mx-auto w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl">
            <div className="mx-2 pt-12 text-center md:mx-auto md:w-2/3 md:pb-12">
              <h1 className="mb-4 text-3xl font-black sm:text-5xl xl:text-6xl font-heading">
                Contact us
              </h1>
            </div>
          </div>
        </div>
        <div className="mx-auto mb-20 flex w-full max-w-screen-lg flex-col overflow-hidden rounded-xl text-gray-900 md:flex-row">
          <form className="mx-auto w-full max-w-xl px-10 py-8 md:px-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextField
                id="email"
                label="Email"
                variant="standard"
                required
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <TextField
                id="phone"
                label="Phone"
                variant="standard"
                required
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <TextField
                id="storeDetails"
                label="Store Name and Address"
                variant="standard"
                required
                fullWidth
                name="storeDetails"
                value={formData.storeDetails}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <TextField
                fullWidth
                id="message"
                label="What can we help you with?"
                variant="standard"
                rows={4}
                multiline
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
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
              <p className="mb-4 font-medium border-b pb-2">OFFICE HOURS</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
