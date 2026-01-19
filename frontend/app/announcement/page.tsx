"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import LoadingView from "../components/loadingPage";
import ErrorView from "../components/errorPage";


interface announcementType {
  subject: string;
  message: string;
}


export default function CreateAnnouncement() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [logerror, setlogError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: string; msg: string } | null>(null);

  useEffect(() => {
    const check=async () => {
      setLoading(true);
      try{
        await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+"/hr/dashboard",{ withCredentials: true }
        );
      }catch(err){
        setlogError((err as AxiosError).message)
    }finally{
        setLoading(false);
      }
    };
    check();
  }, []);
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const announceData: announcementType = {
      subject: subject,
      message: message
    };

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+"/hr/announcements",announceData,{ withCredentials: true }
      );

      setStatus({ type: "success", msg: "Announcement posted successfully!" });
      setSubject("");
      setMessage("");
    } catch (err) {
      setError((err as AxiosError).message)
    }
  };


  
    if (loading){
      return (
            <LoadingView/>
          )
    }
  
    if(error){
        return(
          <ErrorView error={error} onBack={() => setError(null)}/>
        );
    }

  if (logerror) {
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
        <div className="max-w-3xl mx-auto p-8">
          
          <header className="mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Create Announcement</h2>
            
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {status && (
              <div className="p-4 rounded-xl border bg-emerald-50 border-emerald-100 text-emerald-700" 
              >
              {status.msg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">
                Subject
              </label>
              <input
                required
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">
                Message Content
              </label>
              <textarea
                required
                rows={6}
                placeholder="Write announcement details"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-lg resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
            Post Announcement
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}