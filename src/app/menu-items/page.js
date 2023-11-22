'use client'
import Right from "@/components/icons/Right";
import AdminTabs from "@/components/layout/AdminTabs"
import EditableImage from "@/components/layout/Editablemage";
import { useProfile } from "@/components/useProfile"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const MenuItemsPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const {loading:profileLoading, data:profileData} = useProfile();
    useEffect(()=>{
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems);
            })
        })
    }, [])

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
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
        <div className="grid grid-cols-2 gap-2">
          {menuItems?.length > 0 && menuItems.map(item => (
            <Link
              key={item._id}
              href={'/menu-items/edit/'+item._id}
              className="bg-gray-200 rounded-lg p-4"
            >
              <div className="relative">
                <Image
                  className="rounded-md"
                  src={item.image} alt={''} width={200} height={200} />
              </div>
              <div className="text-center">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MenuItemsPage