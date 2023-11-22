'use client'
import AdminTabs from "@/components/layout/AdminTabs"
import { useProfile } from "@/components/useProfile"
import {  useEffect, useState } from "react"
import toast from "react-hot-toast"



const Categories = () => {
   const {loading:profileLoading, data:profileData} = useProfile();
   const [newCategoryName, setNewCategoryName] = useState("");
   const [categories, setCategories] = useState([]);
   const [editedCategory, setEditedCategory] = useState(null);
   useEffect(()=>{
        fetchCategories();
    },[])

    function fetchCategories(){
        fetch('/api/categories').then(response => {
            response.json().then(data => {
               setCategories(data);
            })
        })
    }
    if(profileLoading){
        return 'Loading User Info...'
    }
    if(!profileData){
        return 'Not an admin';
    }
    
    async function handleCategorySubmit(ev){
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject)=>{
            const data = {name:newCategoryName};
            if(editedCategory){
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({data})
            })
            setNewCategoryName('');
            fetchCategories();
            setEditedCategory(null)
            if(response.ok){
                resolve();
            }
            else {
                reject();
            }
        })
        await toast.promise(creationPromise, {
            loading: editedCategory ? 'Updating category...' :'Creating your new category...',
            success: editedCategory ? 'Category updated' : 'Category created',
            error:editedCategory ? 'Error updating category' : 'Error Creating New Category'
        })
    }
    async function handleDelete(_id){
        const promise = new Promise(async (resolve, reject)=>{
            const response = await fetch('/api/categories?_id='+_id, {
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
        fetchCategories();
        
    }
  return (
    <section className="mt-8 max-w-lg mx-auto">
    <AdminTabs isAdmin={profileData}/>
        <form className="mt-8" onSubmit={handleCategorySubmit}>
            <div className="flex gap-2 items-end">
                <div className="grow">
                    <label>
                        {editedCategory ? 'Update Category': 'New Category Name'}
                        {editedCategory && (
                            <> : <b>{editedCategory.name}</b></>
                        )}
                    </label>
                    <input type="text" 
                        value={newCategoryName}
                        onChange={ev => setNewCategoryName(ev.target.value)}
                    />
                </div>
                <div className="flex pb-2 gap-2">
                    <button className="border border-primary" type="submit">
                        {editedCategory ? 'Update':'Create'}
                    </button>
                    <button type="button" onClick={()=>{setEditedCategory(null); setNewCategoryName('')}}>Cancel</button>
                </div>
            </div>
            
        </form>
        <div>
            {categories?.length > 0 ? 
                <h2 className="mt-8 text-sm text-gray-500 mb-2">Existing Categories:</h2>
                :
                <h2 className="mt-8 text-sm text-gray-500 mb-2">No Categories To Show</h2>
            }
            {categories?.length > 0 && categories.map(c => (
                <div className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                    <div className="grow">
                        {c.name}
                    </div>
                    <div className="flex gap-1">
                        <button
                            onClick={()=>{ 
                                setEditedCategory(c); 
                                setNewCategoryName(c.name)
                                }}
                            type="button"
                        >
                            Edit
                        </button>
                        <button
                            onClick={()=>handleDelete(c._id)}
                            type="button"
                        >
                            Delete
                        </button>

                    </div>
                </div>
                    
                
            ))}
        </div>
    </section>
  )
}

export default Categories