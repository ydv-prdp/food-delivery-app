import { User } from "@/models/User";
import mongoose from "mongoose"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req){
    const data = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    if('name' in data){
        const user = await User.findOne({email});
        if(user){
            user.name = data.name;
            await user.save();
        }
    }
    return Response.json(true);
}