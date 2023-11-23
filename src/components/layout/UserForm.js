'use client'
import { useState } from "react";
import EditableImage from "./Editablemage";

export default function UserForm({user, onSave}){
    const [image, setImage] = useState(user?.image || '');
    const [userName, setUserName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
    const [postalCode, setPostalCode] = useState(user?.postalCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [country, setCountry] = useState(user?.country || '');
    return (
        <div className="flex gap-4 items-center mt-8">
        <div>
             <div className="p-2 rounded-lg relative max-w-[120px]">
                 <EditableImage link={image} setLink={setImage}/>
             </div>
        </div>
         <form className="grow" onSubmit={ev => onSave(ev, {
            name:userName, image, phone, streetAddress, city, country, postalCode
         })}>
             <label>
                 First and Last Name
             </label>
             <input type="text" placeholder="First and Last Name"
                 value={userName} onChange={ev => setUserName(ev.target.value)}
             />
              <label>
                 Email
             </label>
             <input type="email" disabled={true} value={user?.email}/>
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
    )
}