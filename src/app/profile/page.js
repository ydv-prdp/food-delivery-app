'use client'
import AdminTabs from "@/components/layout/AdminTabs";
import EditableImage from "@/components/layout/Editablemage";
import InfoBox from "@/components/layout/InfoBox";
import SuccessBox from "@/components/layout/SuccessBox";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function ProfilePage(){
    const session = useSession();
    const {status} = session;
    const [image, setImage] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    useEffect(()=>{
        if(status === 'authenticated'){
            setUserName(session?.data?.user?.name);
            setImage(session.data?.user?.image);
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                   setPhone(data._doc.phone);
                   setStreetAddress(data._doc.streetAddress);
                   setPostalCode(data._doc.postalCode);
                   setCity(data._doc.city);
                   setCountry(data._doc.country);
                   setIsAdmin(data._doc.admin);
                   setProfileFetched(true);
                   console.log(data._doc.phone)
                })
            })
        }
    },[session, status])
    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        const savingProfile = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method:'PUT',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name:userName, 
                    image,
                    phone,
                    streetAddress,
                    postalCode,
                    city,
                    country
                })
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
        <section className="mt-8">
           <AdminTabs isAdmin={isAdmin}/>
            <div className="max-w-md mx-auto">
               <div className="flex gap-4 items-center mt-8">
                   <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            <EditableImage link={image} setLink={setImage}/>
                        </div>
                   </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label>
                            First and Last Name
                        </label>
                        <input type="text" placeholder="First and Last Name"
                            value={userName} onChange={ev => setUserName(ev.target.value)}
                        />
                         <label>
                            Email
                        </label>
                        <input type="email" disabled={true} value={session.data?.user?.email}/>
                        <label>
                            Phone
                        </label>
                        <input type="tel" placeholder="Phone number" 
                            value={phone} 
                            onChange={ev => setPhone(ev.target.value)}
                        />
                         <label>
                            Street Address
                        </label>
                        <input type="text" placeholder="Street address"
                            value={streetAddress} 
                            onChange={ev => setStreetAddress(ev.target.value)}
                        />
                         <label>
                            City
                        </label>
                        <input type="text" placeholder="City"
                            value={city} 
                            onChange={ev => setCity(ev.target.value)}
                        />
                         <label>
                            Postal Code
                        </label>
                        <input type="text" placeholder="Postal code"
                            value={postalCode} 
                            onChange={ev => setPostalCode(ev.target.value)}
                        />
                         <label>
                            Country
                        </label>
                        <input type="text" placeholder="Country"
                            value={country} 
                            onChange={ev => setCountry(ev.target.value)}
                        />
                        <button type="submit">
                            Save
                        </button>
                    </form>
               </div>
            </div>

        </section>
    )
}