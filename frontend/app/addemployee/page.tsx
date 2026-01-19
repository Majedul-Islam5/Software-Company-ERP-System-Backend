"use client";

import { useState, ChangeEvent, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Navbar from "../components/navbar";
import { useRouter } from "next/navigation";
import * as z from "zod"; 
import ErrorView from "../components/errorPage";
import LoadingView from "../components/loadingPage";

// need to handle the error of entering duplicate error

const employeeSchema = z.object({
  fullname: z.string().min(1, "Name cannot be empty"),
  email: z.string().min(1, "email cannot be empty").email("Invalid email format").regex(/@nexabyte\.tech/, "email must contain nexabyte.tech domain"),
  gender: z.string().min(1, "gender cannot be empty"),
  status: z.string().min(1, "status cannot be empty"),
  joindate: z.string().min(1, "joining date cannot be empty"),
  salary: z.string().min(1, "salary cannot be empty"),
  age: z.string().min(1, "age cannot be empty"),
  phone: z.string().regex(/^[0-9]+$/, "phone number can contain digits only").length(11, "phone number can contain 11 digits only"),
  file: z.instanceof(File, { message: "Please select a image" })
});

type empType = z.infer<typeof employeeSchema>;

export default function AddEmployee() {
  const router = useRouter();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("male");
  const [status, setStatus] = useState("active");
  const [joindate, setJoindate] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setUserImage] = useState<File | null>(null);
  const [logerror, setlogError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{fullname?: string;
  email?: string;
  gender?: string;
  status?: string;
  joindate?: string;
  salary?: string;
  age?: string;
  phone?: string;
  file?: string;}>({});


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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const empData = { fullname, email, gender,status,joindate,salary,age,phone,file };
    const result = employeeSchema.safeParse(empData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
      fullname: fieldErrors.fullname?.[0],
      email: fieldErrors.email?.[0],
      gender: fieldErrors.gender?.[0],
      status: fieldErrors.status?.[0],
      joindate: fieldErrors.joindate?.[0],
      salary: fieldErrors.salary?.[0],
      age: fieldErrors.age?.[0],
      phone: fieldErrors.phone?.[0],
      file: fieldErrors.file?.[0],
      });
      return;
    }

    
    const data = new FormData();
    data.append("fullname", fullname);
    data.append("email", email);
    data.append("gender", gender);
    data.append("status", status);
    data.append("joindate", joindate);
    data.append("salary", salary);
    data.append("age", age);
    data.append("phone", phone);

    if (file) {
      data.append("file", file);
    }

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+"/hr/employee", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      router.push("/dashboard");

    } catch (err) {
      setError((err as AxiosError).message)
    }
  };

  if (loading){
      return (
            <LoadingView/>
          )
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


  if (error) {
    return(
        <ErrorView error={error} onBack={() => setError(null)}/>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Navbar />
      <main className="pl-64 pt-20">
        <div className="max-w-4xl mx-auto p-8">
          <header className="mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Enroll New Employee</h2>
          </header>

          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            
            
            <div className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-2">Profile Image</label>
            <input 
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700"
            />
            {errors.file && <span className="text-red-500 text-sm">{errors.file}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
                <input
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Full Name"
                className="p-4 border rounded-2xl outline-none focus:border-indigo-500 transition-all"
                />
                {errors.fullname && <span className="text-red-500 text-sm">{errors.fullname}</span>}
            </div>

            <div className="flex flex-col">
                <input               
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email (@nexabyte.tech)"
                className="p-4 border rounded-2xl outline-none focus:border-indigo-500 transition-all"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            <div className="flex flex-col">
                <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="p-4 border rounded-2xl outline-none bg-white"
                >
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
                {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
            </div>

            <div className="flex flex-col">
                <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-4 border rounded-2xl outline-none bg-white"
                >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                </select>
                {errors.status && <span className="text-red-500 text-sm">{errors.status}</span>}
            </div>

            <div className="flex flex-col">
                <input
                type="date"
                value={joindate}
                onChange={(e) => setJoindate(e.target.value)}
                className="p-4 border rounded-2xl outline-none"
                />
                {errors.joindate && <span className="text-red-500 text-sm">{errors.joindate}</span>}
            </div>

            <div className="flex flex-col">
                <input               
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salary"
                className="p-4 border rounded-2xl outline-none"
                />
                {errors.salary && <span className="text-red-500 text-sm">{errors.salary}</span>}
            </div>

            <div className="flex flex-col">
                <input               
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                className="p-4 border rounded-2xl outline-none"
                />
                {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
            </div>

            <div className="flex flex-col">
                <input               
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (11 digits)"
                className="p-4 border rounded-2xl outline-none"
                />
                {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>
            </div>


            <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50">
              Submit Employee Data
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}