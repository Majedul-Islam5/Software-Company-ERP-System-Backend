"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ButtonUI from "./buttonUI";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (!api) {
      setError("NEXT_PUBLIC_API_ENDPOINT is not set");
      return;
    }

    axios
      .get(`${api}/hr/employee/${id}`, {
        withCredentials: true, // ✅ sends httpOnly cookie to backend
      })
      .then((res) => setData(res.data))
      .catch((err) => {
        // optional: show backend message if available
        setError(err?.response?.data?.message || "Failed to load employee data");
      });
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!data) return <div>Loading...</div>;

  return <ButtonUI data={data} />;
}
