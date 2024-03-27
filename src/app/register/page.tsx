'use client'
import { FormEvent, useEffect, useState } from "react";
import userSignUp from '@/libs/userSignUp'
import { useRouter } from "next/navigation";
import { Redirect } from "next";
import Link from "next/link";
import Image from 'next/image';
import { signIn } from "next-auth/react";


export default function SignUp() {
    const router = useRouter()

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [userTelephone, setUserTelephone] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    

    const handleSubmit = async (e:any) => {
        // e.preventDefault(); 
        console.log('hahaha');
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // setIsEmailValid(emailRegex.test(e.target.value)); 
        try {
            const res = await userSignUp(userEmail, userName, userPassword,  userTelephone, false);
            console.log('eiei');
            setUserEmail('')
            setUserPassword('')
            setUserName('')
            setUserTelephone('')
            router.push('/api/auth/signin')
        } catch (err) {
            console.log('Registration failed');
        }
    }
    

    return (
        <main className="h-[100vh]">
            <div className="flex items-center justify-center my-24 z-10">
            <form action={handleSubmit} className="flex flex-col bg-white rounded-xl shadow-lg justify-center items-center gap-5 text-xl py-8 w-[60vw]">
                    <p className="text-3xl font-semibold">Register</p>
                <div className="p-6 flex flex-col gap-4">
                    <div className="">
                        <label htmlFor="name" >Name: </label>
                        <input type="text" placeholder="Name" name='name' required max={50} value={userName}
                        onChange={(e)=>{setUserName(e.target.value); console.log('ieei');}}
                        className="border-[#8B2A33]"/>
                    </div>
                    <div className="">
                        <label htmlFor="email" >Email: </label>
                        <input type="text" placeholder="Email" name='email' required value={userEmail}
                        onChange={(e)=>setUserEmail(e.target.value)}/>
                        
                    </div>
                    <div className="">
                        <label htmlFor="password" >Password: </label>
                        <input type="password" placeholder="Password" name='password' required min={6} value={userPassword}
                        onChange={(e)=>setUserPassword(e.target.value)}/>
                    </div>
                    <div className="">
                        <label htmlFor="tel" >Tel: </label>
                        <input type="text" placeholder="Tel." name='tel' required value={userTelephone} 
                        onChange={(e)=>setUserTelephone(e.target.value)}/>
                    </div>
                </div>
                
                <button type="submit" onSubmit={(e)=>{console.log('eiei'); e.preventDefault(); handleSubmit }}
                className=" bg-[#8B2A33] border-2 border-[#8B2A33] text-white px-5 py-3 rounded-3xl transition duration-150 delay-100 ease-linear hover:text-black  hover:bg-white hover:border-black hover:scale-105 hover:border-2" >
                    Sign-Up!
                </button>
                <button onClick={(e)=>{e.stopPropagation(); signIn('google')}} className="flex items-center shadow-lg p-4 rounded-3xl hover:bg-[#e7e6e6] transition duration-150 delay-100 ease-linear hover:scale-105">
                    <img src="/img/Google_icon.webp" alt="google_icon" className="h-10"/>
                    <span className="text-xl">Sign Up with Google</span>
                </button>
                <Link href='api/auth/signin' className="text-base text-[#a3c5fd] hover:">
                    already has account? Sign in here
                </Link>
            </form>
            </div>
        </main>
    )
}