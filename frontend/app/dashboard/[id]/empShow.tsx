"use client";

import { useState } from "react";
import axios, { AxiosError } from "axios";
import * as z from "zod";
import ErrorView from "@/app/components/errorPage";

interface Employee {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  status: string;
  joindate: string;
}

interface ShowProps {
  information: Employee;
  onClose?: () => void;
}

const employeeSchema = z.object({
  fullname: z.string().min(1, "Full Name cannot be empty"),
  email: z.string().min(1, "Email cannot be empty").email("Invalid email format").regex(/@nexabyte\.tech/, "email must contain nexabyte.tech domain"),
  phone: z.string().regex(/^[0-9]+$/, "Phone number can contain digits only").length(11, "Phone number must be 11 digits"),
  age: z.string().min(1, "Age cannot be empty"),
  gender: z.string().min(1, "Gender cannot be empty"),
  status: z.string().min(1, "Status cannot be empty"),
  joindate: z.string().min(1, "Joining date cannot be empty"),
});

export default function Show({ information, onClose }: ShowProps) {
  const [fullname, setFullname] = useState(information.fullname);
  const [email, setEmail] = useState(information.email);
  const [phone, setPhone] = useState(information.phone);
  const [age, setAge] = useState(information.age.toString());
  const [gender, setGender] = useState(information.gender);
  const [status, setStatus] = useState(information.status);
  const [joindate, setJoindate] = useState(information.joindate.split("T")[0]);
  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    const empData = { fullname, email, phone, age, gender, status, joindate };
    const result = employeeSchema.safeParse(empData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    try {
      await axios.put(process.env.NEXT_PUBLIC_API_ENDPOINT+`/hr/employee/${information.id}`, empData, {
        withCredentials: true,
      });
      if (onClose) onClose();
    } catch (err: any) {
      setError((err as AxiosError).message)
    }
  };

  if(error){
        return(
          <ErrorView error={error} onBack={() => setError(null)}/>
        );
    }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-6">Update Employee Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="Full Name"
              className="border rounded-lg px-3 py-2 w-full"
            />
            {errors.fullname && <span className="text-red-500 text-sm">{errors.fullname}</span>}
          </div>

          <div className="flex flex-col">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="border rounded-lg px-3 py-2 w-full"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className="flex flex-col">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              className="border rounded-lg px-3 py-2 w-full"
            />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
          </div>

          <div className="flex flex-col">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="border rounded-lg px-3 py-2 w-full"
            />
            {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
          </div>

          <div className="flex flex-col">
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
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
              className="border rounded-lg px-3 py-2 w-full"
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
              className="border rounded-lg px-3 py-2 w-full"
            />
            {errors.joindate && <span className="text-red-500 text-sm">{errors.joindate}</span>}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
