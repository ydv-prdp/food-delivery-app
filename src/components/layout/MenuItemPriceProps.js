import { useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";


    
const MenuItemPriceProps = ({name, addLabel, props, setProps}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    function addProp(){
        setProps(oldProps => {
            return [...oldProps, {name:'', price:0}];
        })
    }
    function editProp(ev, index, prop){
        const newValue = ev.target.value;
        setProps(prevSizes => {
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes;
        })
    }  
    
    function removeProp(indexToRemove){
        setProps(prev=>prev.filter((v,index)=>index !== indexToRemove));
    }
  return (
    <div className="bg-gray-200 p-1 rounded-lg my-2">
    
    <div>
        <button 
            className="inline-flex p-1 border-0 justify-start" 
            type="button"
            onClick={()=>setIsOpen(prev=>!prev)}
        >
            {isOpen && (
                <ChevronUp/>
            )}
            {!isOpen && (
                <ChevronDown/>
            )}
            <span>{name}</span>
            <span>{props?.length}</span>
        </button>
    </div>
    <div className={isOpen ? 'block': 'hidden'}>
    {props?.length > 0 && props.map((size, index) => (
    <div className="flex items-end gap-2">
        <div>
            <label>Name</label>
            <input type="text" placeholder="Size name" 
                value={size.name}
                onChange={ev => editProp(ev, index, 'name')}
            />
        </div>
        <div>
            <label>Extra price</label>
            <input type="text" placeholder="Extra price" 
                value={size.price}
                onChange={ev => editProp(ev, index, 'price')}
            />
        </div>
        <div>
            <button 
                type="button" 
                className="bg-white mb-2"
                onClick={()=>removeProp(index)}
            >
                x
            </button>
        </div>       
    </div>
    ))}
    <button 
        type="button"
        onClick={addProp}
        className="bg-white">{addLabel}
    </button>
    </div>
    
</div>

  )
}

export default MenuItemPriceProps