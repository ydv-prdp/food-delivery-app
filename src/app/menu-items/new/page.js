'use client'

import Right from "@/components/icons/Right";
import AdminTabs from "@/components/layout/AdminTabs";
import EditableImage from "@/components/layout/Editablemage";
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage(){
    const {loading:profileLoading, data:profileData} = useProfile();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectToItems, setRedirectToItems] = useState('');

    if(profileLoading){
        return 'Loading user info';
    }
    if(!profileData){
        return "Not an admin";
    }
    async function handleMenuFormSubmit(ev){
        ev.preventDefault();
        const data = {image, name, description, basePrice};
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
    <section className="mt-8">
      <AdminTabs isAdmin={true}/>
      <div className="max-w-md mx-auto mt-8">
        <Link className="button" href={'/menu-items'}>
            Show all menu items
            <Right/>
        </Link>
      </div>
      <form className="mt-8 max-w-md mx-auto" onSubmit={handleMenuFormSubmit}>
        <div className="grid items-start gap-2" style={{gridTemplateColumns: '.3fr .7fr'}}>
            <div>
                <EditableImage link={image} setLink={setImage}/>
            </div>
            <div className="grow">
                <label>Item Name</label>
                <input type="text"
                    value={name}
                    onChange={ev=>setName(ev.target.value)}
                />
                <label>Description</label>
                <input type="text"
                    value={description}
                    onChange={ev=>setDescription(ev.target.value)}
                />
                <label>Base Price</label>
                <input type="text"
                    value={basePrice}
                    onChange={ev=>setBasePrice(ev.target.value)}
                />
            </div>
            <div>
                <button className="mb-2" type="submit">Create</button>
            </div>
        </div>
      </form>  
    </section>
  )
}