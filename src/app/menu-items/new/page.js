'use client'

import Right from "@/components/icons/Right";
import AdminTabs from "@/components/layout/AdminTabs";
import EditableImage from "@/components/layout/Editablemage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage(){
    const {loading:profileLoading, data:profileData} = useProfile();
    const [redirectToItems, setRedirectToItems] = useState('');

    if(profileLoading){
        return 'Loading user info';
    }
    if(!profileData){
        return "Not an admin";
    }
    async function handleMenuFormSubmit(ev, data){
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/menu-items', {
                method:'POST',
                body:JSON.stringify(data),
                headers:{'Content-Type':'application/json'},
            })
            if(response.ok){
                resolve();
            }
            else
                reject();
        })
        await toast.promise(savingPromise, {
            loading:'Saving this tasty item',
            success: 'Saved',
            error:'Error'
        })
        setRedirectToItems(true);
    }
    if(redirectToItems){
        return redirect('/menu-items');
    }
  return (
    <section className="mt-8 max-w-lg mx-auto">
      <AdminTabs isAdmin={true}/>
      <div className="max-w-md mx-auto mt-8">
        <Link className="button" href={'/menu-items'}>
            Show all menu items
            <Right/>
        </Link>
      </div>
     <MenuItemForm menuItem={null} onSubmit={handleMenuFormSubmit}/> 
    </section>
  )
}