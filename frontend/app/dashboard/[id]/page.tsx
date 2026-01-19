import { cookies } from "next/headers";
import ButtonUI from "./buttonUI";
import axios from "axios";

async function getData(id: string) { 
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT+`/hr/employee/${id}`, {headers:{Cookie:`access_token=${token}`}
      });
      return res.data;
    } catch (err) {
      throw new Error("error working");
    }
}

export default async function Page(props: any) {
  const {id} = await props.params;
  try {
    const data = await getData(id);
    return <ButtonUI data={data} />;
  } catch (err) {
    return <div>Failed to load employee data</div>;
  }
  
}
