"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Business Owner",
    content:
      "OA Footwears has transformed my business. Their quality products and excellent service have helped me increase customer satisfaction and boost sales.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Retail Manager",
    content:
      "I've been working with OA Footwears for years, and they never disappoint. Their diverse range of styles keeps my customers coming back for more.",
  },
  {
    id: 3,
    name: "Mike Johnson",
    role: "E-commerce Entrepreneur",
    content:
      "The team at OA Footwears understands the needs of online retailers. Their efficient delivery and product quality have been crucial to my success.",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="my-16 w-full max-w-4xl">
      <h2 className="mb-8 text-3xl font-bold text-center text-white">
        What Our Customers Say
      </h2>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gray-800 text-white">
              <CardContent className="p-6">
                <p className="text-lg mb-4">"{testimonials[currentIndex].content}"</p>
                <p className="font-semibold">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-gray-400">{testimonials[currentIndex].role}</p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevTestimonial}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </button>
      </div>
    </section>
  );
}

