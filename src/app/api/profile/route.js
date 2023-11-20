import { User } from "@/models/User";
import mongoose from "mongoose"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req){
    const data = await req.json();
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    const resp= await User.updateOne({email}, data);
    return Response.json(true);
}

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    return Response.json(
        await User.findOne({email})
    )

}