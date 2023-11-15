import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeader from "./SectionHeader";

export default function HomeMenu(){
    return (
        <section className="">
             <div className="text-center mb-4">
              <SectionHeader
                subHeader={'Check out'}
                mainHeader={'Menu'}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
               <MenuItem/>
               <MenuItem/>
               <MenuItem/>
               <MenuItem/>
               <MenuItem/>
               <MenuItem/>
            </div>
        </section>
       
    )
}