'use client'
import AdminTabs from "@/components/layout/AdminTabs";
import EditableImage from "@/components/layout/Editablemage";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import UserForm from "@/components/layout/UserForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function ProfilePage(){
    const session = useSession();
    const {status} = session;
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    useEffect(()=>{
        if(status === 'authenticated'){
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                   setUser(data._doc);
                   setIsAdmin(data._doc?.admin);
                   setProfileFetched(true);
                   console.log(data._doc)
                })
            })
        }
    },[session, status])
    async function handleProfileInfoUpdate(ev, data){
        ev.preventDefault();
        const savingProfile = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method:'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            if(response.ok){
                resolve();
            }
            else
                reject();
        })
        await toast.promise(savingProfile, {
            loading: 'Saving...',
            success: 'Profile saved!',
            error:'Error',
        })
      
    }
    if(status === 'loading' || !profileFetched){
        return 'Loading...'
    }
    if(status === 'unauthenticated'){
       return redirect('/login');
    }
    
    return(
        <section className="mt-8 max-w-lg mx-auto">
           <AdminTabs isAdmin={isAdmin}/>
            <div className="max-w-md mx-auto">
               <UserForm user={user} onSave={handleProfileInfoUpdate}/>
            </div>

        </section>
    )
}