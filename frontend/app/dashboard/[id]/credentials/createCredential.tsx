"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import * as z from "zod";

interface EmployeeCredential {
  id: string;
  email: string;
  password: string;
  role: string;
}

const passwordSchema = z.object({
    password:z.string().min(1, { message: "password cannot be empty" }).min(6, { message: "password must be atleast of length 6" }).regex(/[A-Z]+/, { message: "password must contain at least one uppercase letter" })
})
export default function EmployeeCredentials({employeeId,employeeEmail,}: {employeeId: string;employeeEmail: string;}) {
  const [credential, setCredential] = useState<EmployeeCredential | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [errors, setErrors] = useState<{password?: string;}>({});

  useEffect(() => {
    const fetchCredential = async () => {
      try {
        const res = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + `/hr/employeeCredential/${employeeId}`,{ withCredentials: true });
        setCredential(res.data);
      } catch {
        setCredential(null);
      }
    };
    fetchCredential();
  }, [employeeId]);

  const handleCreateCredential = async () => {

    const result = passwordSchema.safeParse({password});

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
      password: fieldErrors.password?.[0]
      });
      return;
    }

    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + `/hr/employeeCredential/${employeeId}`,
        { email: employeeEmail, password, role },
        { withCredentials: true }
      );
      setCredential(res.data);
      setShowModal(false);
    } catch {
      alert("Failed to create credentials");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {credential ? (
        // if credential exists
        <div className="max-w-md space-y-4">

          <div className="flex flex-col border-b border-gray-100 py-3">
            <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
              Email
            </span>
            <span className="text-lg font-semibold text-gray-800">
              {credential.email}
            </span>
          </div>

          <div className="flex flex-col border-b border-gray-100 py-3">
            <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
              Password
            </span>
            <span className="text-lg font-semibold text-gray-800">
              {".........."}
            </span>
          </div>

          <div className="flex flex-col border-b border-gray-100 py-3">
            <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
              Role
            </span>
            <span className="text-lg font-semibold text-gray-800">
              {credential.role}
            </span>
          </div>

          <button
            className="mt-4 bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-indigo-700 transition"
            >
            Update Credentials
        </button>

        </div>
      ) : (
        //  not exist
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Portal Credentials</h3>
          <p className="text-gray-500 mb-6">
            This employee does not have login credentials
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition"
          >
            Generate Credentials
          </button>

          {showModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-xl animate-in zoom-in-95">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Generate Credentials
                </h2>

                <div className="space-y-4">
 
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                      Email
                    </label>
                    <div className="w-full p-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 font-medium">
                      {employeeEmail}
                    </div>
                  </div>

               
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-1 block">
                      Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="admin">Admin</option>
                      <option value="hr">HR</option>
                      <option value="developer">Developer</option>
                      <option value="projectmanager">Project Manager</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 rounded-xl font-bold bg-gray-100 hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateCredential}
                    className="px-6 py-2 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
