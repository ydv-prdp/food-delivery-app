'use client'
import AdminTabs from "@/components/layout/AdminTabs"
import { useProfile } from "@/components/useProfile";
import Link from "next/link";
import { useEffect, useState } from "react";


const UsersPage = () => {
  const {loading:profileLoading, data:profileData} = useProfile();
  const [users, setUsers] = useState([])
  useEffect(()=>{
    fetch('/api/users').then(res => {
        res.json().then(users => {
            setUsers(users);
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
    <section className="mt-8 max-w-xl mx-auto">
        <AdminTabs isAdmin={true}/>
        <div className="mt-8">
            {users?.length > 0 && users.map(user => (
                <div className="bg-gray-100 rounded-lg mb-2 p-1 flex items-center gap-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-1 grow">
                        <div className="text-gray-900">
                            {!!user.name && (<span>{user.name}</span>)}
                            {!user.name && (<span className="italic">No name</span>)}
                        </div>
                        <span className="text-gray-400">{user.email}</span>
                    </div>
                    <div>
                        <Link className="button" href={'/users/'+user._id}>Edit</Link>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default UsersPage