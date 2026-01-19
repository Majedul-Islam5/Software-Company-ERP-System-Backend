"use client";

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NotificationButton from "./notification";
import { useState } from "react";
import ErrorView from "./errorPage";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+"/hr/logout",{},{ withCredentials: true });
      router.replace("/login");
    } catch (err) {
      setError((err as AxiosError).message)
    }
  };

  const linkStyles = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
      pathname === path
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
        : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
    }`;

    if(error){
        return(
          <ErrorView error={error} onBack={() => setError(null)}/>
        );
      }

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 rotate-3">
            <span className="text-white text-2xl font-black -rotate-3">N</span>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            HR Dashboard
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/dashboard" className={linkStyles("/dashboard")}>
            Dashboard
          </Link>
          <Link href="/addemployee" className={linkStyles("/addemployee")}>
            Add Employee
          </Link>
          <Link href="/announcement" className={linkStyles("/announcement")}>
            Post Announcement
          </Link>
          <Link href="/email" className={linkStyles("/email")}>
            Send Email
          </Link>
        </nav>
      </aside>

      
      <nav className="fixed top-0 left-64 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50 px-6 py-3">
        <div className="flex items-center justify-end gap-4">
          <NotificationButton />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
