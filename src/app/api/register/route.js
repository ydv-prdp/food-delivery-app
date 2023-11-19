import { User } from "@/models/User";
import mongoose from "mongoose"

export async function POST(req){
    const body = await req.json();
    const pass =  body.password;
    mongoose.connect(process.env.MONGO_URL);
        if(!pass?.length || pass.length < 5){
            new Error('password must be at least 5 characters');
        }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);
    body.password = hashedPassword;
    const createdUser =await User.create(body)
    return Response.json(createdUser)
}