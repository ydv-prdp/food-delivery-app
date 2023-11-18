'use client'

import {signIn} from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);
    const handleFormSubmit = async(e) =>{
        e.preventDefault();
        setLoginInProgress(true);
        await signIn('credentials', {email, password, callbackUrl: '/'}); 
      
        setLoginInProgress(false);
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">
                Login
            </h1>
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email} onChange={ev=>setEmail(ev.target.value)}
                    disabled={loginInProgress}
                />
                <input type="password" name="password" placeholder="password" value={password} onChange={ev=>setPassword(ev.target.value)}
                     disabled={loginInProgress}
                />
                <button  disabled={loginInProgress}  type="submit">Login</button>
                <div className="my-4 text-center text-gray-500">
                    Or login with provider
                </div>
                <button type="button" onClick={()=>signIn('google', {callbackUrl:'/'})} className="flex items-center gap-2 justify-center">
                    <Image src="/gicon.png" objectFit="contain" width={20} height={30} alt={''}/>Login with Google 
                </button>
            </form>
        </section>
    )
}