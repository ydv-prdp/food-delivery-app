'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage(){
    const session = useSession();
    const {status} = session;
    const userImage = session.data?.user?.image;
    const [userName, setUserName] = useState('');
    useEffect(()=>{
        if(status === 'authenticated'){
            setUserName(session?.data?.user?.name);
        }
    },[session, status])
    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        const response = await fetch('/api/profile', {
            method:'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({name:userName})
        })
    }
    console.log(userName)
    if(status === 'loading'){
        return 'Loading...'
    }
    if(status === 'unauthenticated'){
       return redirect('/login');
    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Profile
            </h1>
            <div className="max-w-md mx-auto">
               <div className="flex gap-4 items-center">
                   <div>
                        <div className="p-2 rounded-lg relative">
                            <Image src={userImage} className="rounded-lg w-full h-full mb-4" width={250} height={250} alt="avatar"/>
                            <button type="button">
                                Edit
                            </button>
                        </div>
                   </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="First and Last Name"
                            value={userName} onChange={ev => setUserName(ev.target.value)}
                        />
                        <input type="email" disabled={true} value={session.data?.user?.email}/>
                        <button type="submit">
                            Save
                        </button>
                    </form>
               </div>
            </div>

        </section>
    )
}