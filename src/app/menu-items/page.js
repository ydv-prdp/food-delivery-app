'use client'
import Right from "@/components/icons/Right";
import AdminTabs from "@/components/layout/AdminTabs"
import EditableImage from "@/components/layout/Editablemage";
import { useProfile } from "@/components/useProfile"
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";


const MenuItemsPage = () => {
    const {loading:profileLoading, data:profileData} = useProfile();

    if(profileLoading){
        return 'Loading user info';
    }
    if(!profileData){
        return "Not an admin";
    }
   
  return (
    <section className="mt-8 max-w-md mx-auto">
      <AdminTabs isAdmin={true}/>
      <div className="mt-8">
        <Link className="button" href={'/menu-items/new'}>
            Create New Menu Item 
            <Right/>
        </Link>
      </div>
    </section>
  )
}

export default MenuItemsPage