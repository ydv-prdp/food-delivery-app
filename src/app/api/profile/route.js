import { User } from "@/models/User";
import mongoose from "mongoose"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { UserInfo } from "@/models/UserInfo";

export async function PUT(req){
    const data = await req.json();
    const {_id, name, image, ...otherUserInfo} = data;
    mongoose.connect(process.env.MONGO_URL);
    let filter = {};
    if(_id){
        filter = {_id};
    }
    else{
        const session = await getServerSession(authOptions);
        const email = session.user.email;
        filter ={email}
    }
    await User.updateOne(filter, {name, image});
    await UserInfo.findOneAndUpdate(filter, otherUserInfo, {upsert:true});
    return Response.json(true);
}

export async function GET(){
    mongoose.connect(process.env.MONGO_URL);
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if(!email){
        return Response.json({});
    }
    let  user = await User.findOne({email});
    let  userInfo = await UserInfo.findOne({email});
    user = {...user, ...userInfo};
    return Response.json(user)

}