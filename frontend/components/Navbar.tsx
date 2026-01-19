

import Logo from "@/public/Logo";
import Link from "next/link"; 

 

export default function Navbar({name="Unknown"}) { 

  console.log(name) 

  return ( 

     <nav className="w-full bg-gray-900 text-white px-6 py-4"> 

      <div className="max-w-7xl mx-auto flex justify-between items-center"> 

         

        {/* Logo */} 

        <Link href="/" className="text-xl font-bold"> 

          <Logo/> 

        </Link> 

 

        <div className="space-x-6"> 

 

          <Link href="/" className="hover:text-gray-300 text-blue-500"> 

           Welcome Back  

          </Link> 

          <Link href="/" className="hover:text-gray-300"> 

            Home 

          </Link>  

          <Link href="./login" className="hover:text-gray-300"> 

            Login 

          </Link> 

           

           

        </div> 

 

      </div> 

    </nav> 

  ) 

} 