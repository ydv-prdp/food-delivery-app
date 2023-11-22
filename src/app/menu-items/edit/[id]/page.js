'use client'

import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import AdminTabs from "@/components/layout/AdminTabs";
import EditableImage from "@/components/layout/Editablemage";
import MenuItemForm from "@/components/layout/MenuItemForm";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage(){
    const {id} = useParams();
    const {loading:profileLoading, data:profileData} = useProfile();
    const [menuItem, setMenuItem] = useState(null)
    const [redirectToItems, setRedirectToItems] = useState('');
    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(items => {
                const item = items.find(i=>i._id === id);
                setMenuItem(item)
            })
        })
    },[])
    if(profileLoading){
        return 'Loading user info';
    }
    if(!profileData){
        return "Not an admin";
    }
    async function handleDelete(){
        const promise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/menu-items?_id='+id, {
                method:'DELETE',
            })
            if(response.ok){
                resolve();
            } 
            else{
                reject();
            }
        })
     
        await toast.promise(promise, {
            loading:'Deleting...',
            success:'Deleted',
            error:'Error',
        })
        setRedirectToItems(true);
        if(redirectToItems){
            return redirect('/menu-items');
        }
    }
   
    async function handleMenuFormSubmit(ev, data){
        ev.preventDefault();
        data = {...data, _id:id};
        const savingPromise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/menu-items', {
                method:'PUT',
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
            loading:'Updating this tasty item',
            success: 'Updated',
            error:'Error'
        })
        setRedirectToItems(true);
    }
    if(redirectToItems){
        return redirect('/menu-items');
    }
  return (
    <section className="mt-8">
      <AdminTabs isAdmin={true}/>
      <div className="max-w-md mx-auto mt-8">
        <Link className="button" href={'/menu-items'}>
            <Left/>
            Show all menu items
        </Link>
      </div>
      <MenuItemForm menuItem={menuItem} onSubmit={handleMenuFormSubmit}/>
      <div className="max-w-md mx-auto mt-4 pl-4">
        <button onClick={handleDelete}>Delete this menu item</button>
      </div>
    </section>
  )
}