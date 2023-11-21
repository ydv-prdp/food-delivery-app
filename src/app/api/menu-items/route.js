import { MenuItem } from "@/models/MenuItem";


export async function POST(req){
    const data = await req.json();
    console.log(data);
    if(data.name){
        const MenuItemDoc = await MenuItem.create(data);
        return Response.json(MenuItemDoc)
    }
    else{
        return Response.json("error");
    }
   
}

// export async function PUT(req){
//     const {data} = await req.json();
//     let _id = await data._id;
//     let name  = await data.name;
//     if(_id && name){
//        const res =  await Category.updateOne({_id}, {name});
//        console.log(res);
//     }
//     return Response.json(true)
// }

// export async function GET(){
//     const categories = await Category.find();
//     return Response.json(categories)
// }