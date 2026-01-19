"use client";

import Lottie from "lottie-react";
import animationData from "@/public/work-team.json";


import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccordionText from "@/components/ui/AccordionText";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar name="Demo" />

      <div className="flex-grow">
        <div className="flex flex-col items-center min-h-screen bg-gray-50 px-6 text-center">

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-4">
            Welcome to{" "}
            <span className="text-orange-400 font-semibold">
              ERP SOLUTION
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8">
            Streamline your business operations, manage resources efficiently,
            and gain real-time insights — all from one powerful platform.
          </p>

          {/* Lottie Animation */}
          <div className="mt-6 w-full max-w-3xl">
            <Lottie animationData={animationData} loop />
          </div>

          {/* Accordion */}
          <div className="mt-6 w-full max-w-3xl">
            <AccordionText />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
