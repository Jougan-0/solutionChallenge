"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '../../styles/signInPageStyle.css';
import {signIn,useSession} from "next-auth/react"
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const [error,setError]=useState("");
  const router = useRouter(); 
  const session=useSession();

  useEffect(()=>{
    if(session?.status==="authenticated"){
      router.replace("/dashboard")
    }
  },[session,router])
  function isValidEmail(email:string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
    const handleSubmit = async (e: any) =>{
        e.preventDefault();
        const email=e.target[0].value;
        const password=e.target[1].value;

        if(!isValidEmail(email)){
          setError("Invalid Email address");

          return;
        }
        if(!password||password.length<0){
          setError("Invalid Password");

          return
        }
      const res =await signIn("credentials",{
        redirect:false,
        email,
        password
      })
      if (res?.error){
        setError("Invalid email or password")
        if (res?.url) router.replace("/dashboard")
      }
    else{
      setError("")
    }
    }
  return (
    <div className='bodysignIn'>
    <div className="container mx-auto my-8 p-4 sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 bg-white rounded-lg shadow-md">
      <h1 className="text-center text-xl font-bold mt-20 text-black">SIGN IN</h1>
      <ul className="flex justify-center space-x-10 my-8">
        <li>
        <button type="button" onClick={()=>{
            signIn("instagram")
          }}>

          <img src="/images/icons/instagram.svg" alt="Instagram" className="h-12 w-12" />
          </button>
        </li>
        <li>
        <button type="button" onClick={()=>{
            signIn("linkedin")
          }}>
          <img src="/images/icons/linkedin.svg" alt="LinkedIn" className="h-12 w-12"/>
             </button>
        </li>
        <li>
        <button type="button" onClick={()=>{
            signIn("google")
          }}>
          <img src="/images/icons/google.svg" alt="Google" className="h-12 w-12" />
             </button>
        </li>
        <li>
        <button type="button" onClick={()=>{
            signIn("facebook")
          }}>
          <img src="/images/icons/facebook.svg" alt="Facebook" className="h-12 w-12" />
          </button>
        </li>
      </ul>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
      </form>
    <div className='text-center text-gray-500'>- OR -</div>
      <h3 className="text-center text-xl font-bold my-20 text-black">New?<Link className='text-blue-500 hover:underline' href="/signUp">Register Here</Link> </h3>
    </div>
    </div>

  );
};

export default SignInPage;
