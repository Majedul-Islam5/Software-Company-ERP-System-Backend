/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
 
const notfound = () => {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans text-center">
 
            <div className="mb-8">
                <h1 className="text-9xl font-extrabold text-[#0f172a]">
                    4<span className="text-orange-500">0</span>4
                </h1>
            </div>
 
            {/* --- Message --- */}
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
                Page Not Found
            </h2>
 
            <p className="text-gray-500 text-lg max-w-md mx-auto mb-8 leading-relaxed">
                Oops! The page you are looking for doesn&apos;t exist or has been moved.
                Let&apos;s get you back to business.
            </p>
            {/* --- Action Buttons --- */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                    <button className="btn bg-[#0094F7] hover:bg-blue-600 text-white border-none px-8 text-lg font-bold shadow-md w-full sm:w-auto">
                        Go Back Home
                    </button>
                </Link>
 
                <button onClick={() => { router.back() }} className="btn bg-transparent hover:bg-gray-50 text-[#0f172a] border border-gray-300 px-8 text-lg w-full sm:w-auto">
                    Back
                </button>
            </div>
 
        </div>
    );
};
export default notfound;
 