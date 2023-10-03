"use client";
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";
// import  axios, { Axios } from "axios";
import fetch from "node-fetch";


export default function SignupPage() {
    const[user, setUser] = React.useState({
        
    });
    const router = useRouter();
      const handleChange = (e: any) => {
    setUser({...user, [e.target.name]: e.target.value });
    console.log("XXXXXproductFormis", user);
  }
    const onSignup = async() => {
        try {
            const response =  await fetch("api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user })
                
            });
            console.log("SignUp success", response.body);
            // return router.push("/login");
        } catch (error: any) {
            console.log("SignUp failed", error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1> Sign Up </h1>
        <hr/>
        <label htmlFor="username" >username</label>
        
        <input  className="p-2 border border-gray-300 mb-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                name="username"
                type="text" 
                style={{color: "black"   }}

                onChange={handleChange} 
                placeholder="username"/>
        <hr/>

        <label htmlFor="email" >email</label>
        <input  className="p-2 border border-gray-300 mb-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                name="email"
                type="text" 
                style={{color: "black"   }}
                onChange={handleChange} 
                placeholder="email"/>
        <hr/>
        <label htmlFor="password" >password</label>
        <input  className="p-2 border border-gray-300 mb-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                name="password"
                type="password" 
                style={{color: "black"   }}

                onChange={handleChange} 
                placeholder="password"/>
        <hr/>
      
            <button className="p-2" onClick={onSignup}>signUP</button>
            <Link href="/login">Visit Login</Link>
         </div>
    )
}