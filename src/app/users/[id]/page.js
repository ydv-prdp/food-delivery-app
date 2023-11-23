'use client'
import AdminTabs from "@/components/layout/AdminTabs";
import UserForm from "@/components/layout/UserForm";
import { useProfile } from "@/components/useProfile";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";


const EditUserPage = () => {
    const {id} = useParams();
    const {loading:profileLoading, data:profileData} = useProfile();
    const [user, setUser] = useState(null)
    useEffect(()=>{
      fetch('/api/users').then(res => {
          res.json().then(users => {
              const user = users.find(u => u._id === id);
              setUser(user);
          })
      })
    }, [])
      if(profileLoading){
          return 'Loading user info';
      }
      if(!profileData){
          return "Not an admin";
      }
      function handleEditUser(ev, data){
        ev.preventDefault();
        fetch('/api/profile', {
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({...data, _id:id})
        })

      }
  return (
    <section className="mt-8 max-w-xl mx-auto">
        <AdminTabs isAdmin={true}/>
        <div className="mt-8">
            <UserForm user={user} onSave={handleEditUser}/>
        </div>
    </section>
  )
}

export default EditUserPage