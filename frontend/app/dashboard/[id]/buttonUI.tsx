"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Show from "./empShow";
import EmployeeCredentials from "./credentials/createCredential";

export default function ButtonUI({ data }: { data: any }){
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_ENDPOINT+`/hr/deleteEmployee/${employee.id}`, { 
        withCredentials: true 
      }); 
      router.push("/dashboard"); 
      } catch (err) {
        setError((err as AxiosError).message)
      }
  };


  const handleTerminate = async () => {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_ENDPOINT+`/hr/employee/${employee.id}`, { 
        withCredentials: true 
      }); 
      router.push("/dashboard"); 
      } catch (err) {
        setError((err as AxiosError).message)
      }
  };
  
  const employee = data; //Array.isArray(data) ? data[0] : data;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        
    <div className="bg-indigo-600 p-8 text-white flex justify-between items-center">
      <div className="flex items-center gap-6">
        <div className="h-32 w-32 rounded-3xl overflow-hidden border-4 border-white/30 shadow-2xl flex-shrink-0 transition-transform hover:scale-105 duration-300">
          <img 
            // src={process.env.NEXT_PUBLIC_API_ENDPOINT+`/hr/img/`+employee.userImage}
            src={employee.userImage}
            alt={employee.fullname} 
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">
            Employee ID: {employee.id}
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {employee.fullname}
          </h1>
        </div>
      </div>

      <button 
        onClick={() => router.back()} 
        className="text-sm font-bold bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-xl border border-white/10 transition-all flex items-center gap-2"
      >
        <span>←</span> Back
      </button>
    </div>

        <div className="flex border-b border-gray-100 px-8 bg-gray-50/50">
          {["profile", "credentials","accessories", "payroll"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-6 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === tab 
                ? "border-indigo-600 text-indigo-600" 
                : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <DetailRow label="Full Name" value={employee.fullname} />
                 <DetailRow label="Email Address" value={employee.email} />
                 <DetailRow label="Status" value={employee.status} />
                 <DetailRow label="Gender" value={employee.gender} />
                 <DetailRow label="Phone" value={employee.phone} />
                 <DetailRow label="Joining Date" value={employee.joindate.split('T')[0]} />
                 <DetailRow label="Age" value={employee.age} />
                 <DetailRow label="Basic Salary" value={employee.salary} />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700"
                >
                  Update Information
                </button>

                {showModal && <Show information={employee} onClose={() => setShowModal(false)} />}
                
                <button onClick={employee.status === 'active' ? handleTerminate : handleDelete} className={`px-6 py-3 rounded-xl font-bold transition-all shadow-sm ${employee.status === 'active'? 'bg-amber-50 text-amber-600 hover:bg-amber-100': 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                >
                {employee.status === 'active' ? 'Terminate' : 'Delete Record'}
              </button>
              </div>
            </div>
          )}

          {activeTab === "credentials" && (
            <EmployeeCredentials  employeeId={employee.id} employeeEmail={employee.email} />
          )}

          
          {activeTab === "accessories" && (
            <div className="animate-in slide-in-from-bottom-2 duration-300 space-y-6">
              
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  Issued Accessories
                </h3>

                <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-indigo-700">
                  + Assign Accessory
                </button>
              </div>

              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-400">
                No accessories assigned to this employee yet.
              </div>
            </div>
          )}

          {activeTab === "payroll" && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Payroll History</h3>
                <button className="bg-emerald-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-emerald-700">
                  + Generate New Payroll
                </button>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center text-gray-400">
                No payroll records found for this employee.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const DetailRow = ({ label, value}: any) => (
  <div className="flex flex-col border-b border-gray-100 py-3">
    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{label}</span>
    <span className={`text-lg font-semibold 'text-gray-800'}`}>
      {value}
    </span>
  </div>
);