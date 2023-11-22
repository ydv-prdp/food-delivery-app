import { Category } from "@/models/Category";

export async function POST(req){
    const data = await req.json();
    const name = data?.data?.name;
    if(name){
        const categoryDoc = await Category.create({name});
        return Response.json(categoryDoc)
    }
    else{
        return Response.json("error");
    }
    
}

export async function PUT(req){
    const {data} = await req.json();
    let _id = await data._id;
    let name  = await data.name;
    if(_id && name){
       const res =  await Category.updateOne({_id}, {name});
       console.log(res);
    }
    return Response.json(true)
}

export async function GET(){
    const categories = await Category.find();
    return Response.json(categories)
}

export async function DELETE(req){
    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    await Category.deleteOne({_id});
    return Response.json(true)
}