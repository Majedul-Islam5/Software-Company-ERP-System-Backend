"use client"
import React from 'react';
import axios, { AxiosError } from 'axios';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import * as z from "zod"; 
import LoadingView from '../components/loadingPage';
import ErrorView from '../components/errorPage';

interface UserData{
  email:string
  password:string
}

const userSchema=z.object({
  email:z.string().trim().min(1,"Name is required").regex(/nexabyte\.tech/,"email must contain nexabyte.tech domain"),
  password:z.string().trim().min(1,"Password is required").regex(/[A-Z]/, "password must contain at least one uppercase letter")
})

export default function Login(){
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(()=>{
    const savedEmail = localStorage.getItem('rememberedUseremail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if(savedEmail){
      setEmail(savedEmail);
      setRememberMe(true);
    }
    if(savedPassword){
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const loginData = { email, password };
    const result = userSchema.safeParse(loginData);
    if(!result.success){
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    try{
      //setLoading(true); 
      const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+"/hr/signIn", loginData, { withCredentials: true });

      if(rememberMe){
        localStorage.setItem('rememberedUseremail', email);
        localStorage.setItem('rememberedPassword', password);
      }else{
        localStorage.removeItem('rememberedUseremail');
        localStorage.removeItem('rememberedPassword');
      }

      router.push('/dashboard');
    } catch(err){
      setError((err as AxiosError).message)
    } finally{
      setLoading(false)
    }
  };

  if(loading){
    return (
      <LoadingView/>
    )
  }

  if(error){
    return(
      <ErrorView error={error} onBack={() => setError(null)}/>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-600 p-4 relative overflow-hidden">
      
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-indigo-400/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-10 border border-white/20">

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/30 mb-4 rotate-3">
              <span className="text-white text-3xl font-black -rotate-3">N</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Nexabyte Portal
            </h1>
          </div>

          {/* form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-blue-700 mb-2 ml-1">
                Organization Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="exmp@nexabyte.tech.com"
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all duration-300 text-base font-medium text-slate-800"
              />
              {errors.email && (<span className="text-red-600 text-xs font-bold mt-1.5 block ml-1">{errors.email}</span>)}
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-blue-700 mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none transition-all duration-300 text-base text-slate-800"
              />
              {errors.password && (<span className="text-red-600 text-xs font-bold mt-1.5 block ml-1">{errors.password}</span>)}
            </div>

            <div className="flex items-center py-1">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm font-bold text-slate-500 group-hover:text-blue-700 transition-colors">Remember Me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-500/20 transform transition-all active:scale-[0.98] duration-150 text-base tracking-widest uppercase"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-[0.15em]">
              Nexabyte Technologies <span className="text-blue-600 mx-1">•</span> Secure Protocol
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
