"use client";

import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import ButtonUI from "./buttonUI";
import { useRouter, useParams } from "next/navigation";
import LoadingView from "@/app/components/loadingPage";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // ✅ don’t call backend with undefined

    const fetchEmployee = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/hr/employee/${id}`,
          { withCredentials: true }
        );
        setData(res.data);
      } catch (err) {
        const axiosError = err as AxiosError<any>;
        setError(axiosError.response?.data?.message ?? "Request failed");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  // while id is not ready
  if (!id) return <LoadingView />;

  if (loading) return <LoadingView />;

  if (error) {
    return (
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

  return <ButtonUI data={data} />;
}
