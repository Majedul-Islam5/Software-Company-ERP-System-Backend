"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Navbar from "../components/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingView from "../components/loadingPage";

interface Employee {
  id: string;
  fullname: string;
  email: string;
  status: string;
}

export default function Dashboard(){
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try{
        const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+`/hr/employee?id=${search}`,{ withCredentials: true }
        );
        setData(response.data);
      }catch(err){
        setError((err as AxiosError).message)
    }finally{
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchData, 300);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  if (loading && search === ""){
    return (
      <LoadingView/>
    );
  }

  if (error) {
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-red-100 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            !
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Failed</h2>
          <p className="text-gray-500 mb-8">{error}</p>
          
          <button
            onClick={() => router.push("/login")}
            className="w-full py-3 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-lg"
          >
            Go to Login
          </button>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      
      <main className="pl-64 pt-20">
        <div className="max-w-5xl mx-auto p-8">
          
          <header className="mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Employee Directory</h2>
            <p className="text-gray-500">Search by ID to filter or click a row to view full profile.</p>
          </header>

          {/* searchning */}
          <div className="relative mb-10 group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
               <span>🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search Employee by Id"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-lg"
            />
          </div>

          {/* emp info */}
          <div className="flex flex-col gap-3">
            {data.length>0?(
              data.map((item) => (
                <Link href={`/dashboard/${item.id}`} key={item.id} className="block">
                  <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group flex justify-between items-center">
                    
                    <div className="flex items-center gap-8">
                      <div className="min-w-[100px]">
                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest block mb-1">ID Number</span>
                        <p className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{item.id}</p>
                      </div>

                      <div>
                        <p className="text-lg font-bold text-gray-800 leading-tight">{item.fullname}</p>
                        <p className="text-gray-500 text-sm">{item.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="hidden sm:flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${item.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></span>
                        <span className={`text-xs font-bold uppercase tracking-wider ${item.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <div className="h-10 w-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                         <span className="font-bold">→</span>
                      </div>
                    </div>

                  </div>
                </Link>
              ))
            ) : (
              !loading && (
                <div className="text-center py-20 bg-gray-100/50 rounded-3xl border-2 border-dashed border-gray-200">
                   <p className="text-gray-400 text-lg">No records found for ID "{search}"</p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}