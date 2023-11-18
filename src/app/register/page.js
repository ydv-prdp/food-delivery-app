'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);
    async function handleFormSubmit(ev){
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
       
        const response = await fetch('/api/register', {
                method:'POST', 
                body:JSON.stringify({email, password}),
                headers:{'Content-Type':'application/json'},
            
        });
        if(response.ok){
            setUserCreated(true)
        }
        else{
            setError(true)
        }
            setCreatingUser(false);
    }
    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 flex justify-center">
                    User created. Now you can {' '}
                    <Link className="underline" href="/login"> Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An error has occurred. <br />
                    Please try again later.
                </div>
            )}
            <form className="block max-w-xl mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email} onChange={ev=>setEmail(ev.target.value)}
                    disabled={creatingUser}
                />
                <input type="password" placeholder="password" value={password} onChange={ev=>setPassword(ev.target.value)}
                     disabled={creatingUser}
                />
                <button type="submit"  disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">
                    Or login with provider
                </div>
                <button  onClick={()=>signIn('google', {callbackUrl:'/'})} className="flex items-center gap-2 justify-center">
                    <Image src="/gicon.png" objectFit="contain" width={20} height={30} alt={''}/>Login with Google 
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Exisiting account?{' '}
                    <Link className="underline" href={'/login'}>Login here &raquo;</Link>
                </div>
            </form>
        </section>
    )
}