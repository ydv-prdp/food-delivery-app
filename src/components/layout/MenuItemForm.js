
import { useEffect, useState } from "react";
import EditableImage from "./Editablemage";
import MenuItemPriceProps from "./MenuItemPriceProps";
import Categories from "@/appcategories/page";

export default function MenuItemForm({onSubmit, menuItem}){
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
    const [sizes, setSizes] = useState(menuItem?.sizes || []);
    const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices || []);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(menuItem?.category || '');
    useEffect(()=>{
        fetch('/api/categories').then(res=>{
            res.json().then(categories=>{
                setCategories(categories);
            })
        })
    },[])
   
    return (
        <form 
            className="mt-8 max-w-md mx-auto" 
            onSubmit={ev => onSubmit(ev, {image, name, description, basePrice, sizes, extraIngredientPrices, category})}
        >
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
                <label>Category</label>
                <select value={category} onChange={ev=>setCategory(ev.target.value)}>
                    {categories?.length > 0 && categories.map(c => (
                        <option value={c._id}>{c.name}</option>
                    ))}  
                </select>
                <label>Base Price</label>
                <input type="text"
                    value={basePrice}
                    onChange={ev=>setBasePrice(ev.target.value)}
                />
                <MenuItemPriceProps 
                    name={'Sizes'} 
                    props={sizes} 
                    setProps={setSizes}
                    addLabel={'Add item size'}    
                />
                 <MenuItemPriceProps 
                    name={'Extra Ingredients'} 
                    props={extraIngredientPrices} 
                    setProps={setExtraIngredientPrices}
                    addLabel={'Add ingredients prices'}    
                />
            </div>
        </div>
            <div>
                <button className="" type="submit">Save</button>
            </div>
      </form>  
    )
}