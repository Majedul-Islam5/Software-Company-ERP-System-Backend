import { cookies } from "next/headers";
import ButtonUI from "./buttonUI";

async function getData(id: string) {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    throw new Error("No access token cookie found");
  }

  const api = process.env.NEXT_PUBLIC_API_ENDPOINT; // ok if it's set in Vercel for the frontend project
  if (!api) throw new Error("NEXT_PUBLIC_API_ENDPOINT is not set");

  const res = await fetch(`${api}/hr/employee/${id}`, {
    headers: {
      Cookie: `access_token=${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Backend error ${res.status}: ${text}`);
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const data = await getData(params.id);
    return <ButtonUI data={data} />;
  } catch (err) {
    return <div>Failed to load employee data</div>;
  }
}
