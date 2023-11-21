"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";



export default function LoginPage() {
    let router = useRouter();
    const[user, setUser] = React.useState({
        email: "",
        password: "",
        
    });
    console.log("email is", user.email);
    const onLogin = async () => {
        try {
            
                const response =  await fetch("api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user })
                
            });
            console.log("login successful", response.body);
            if (response.ok) {
                router.push("/home");
              }        } catch (error: any) {
            console.log("error is", error.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1> Login </h1>
        <hr/>
       

        <label htmlFor="email" >email</label>
        <input  className="p-2 border border-gray-300 mb-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                id="email"
                type="text" 
                style={{color: "black"   }}
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})} 
                placeholder="email"/>
        <hr/>
        <label htmlFor="password" >password</label>
        <input  className="p-2 border border-gray-300 mb-4 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                id="password"
                type="password" 
                value={user.password}
                style={{color: "black"   }}

                onChange={(e) => setUser({...user, password: e.target.value})} 
                placeholder="password"/>
        <hr/>
      
            <button className="p-2   " onClick={onLogin}>Login</button>
            <Link href="/signup">Visit Signup</Link>
         </div>
    )
}