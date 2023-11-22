import { MenuItem } from "@/models/MenuItem";


export async function POST(req){
    const data = await req.json();
    if(data.name){
        const MenuItemDoc = await MenuItem.create(data);
        return Response.json(MenuItemDoc)
    }
    else{
        return Response.json("error");
    }
   
}

export async function PUT(req){
    const {_id, ...data} = await req.json();
    await MenuItem.findByIdAndUpdate(_id, data); 
    return Response.json(true)
}

export async function GET(){
    const menuItems = await MenuItem.find();
    return Response.json(menuItems)
}

export async function DELETE(req){
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await MenuItem.deleteOne({_id});
    return Response.json(true)
}