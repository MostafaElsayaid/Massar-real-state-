import User from '../models/user.js';
import bcryptejs from 'bcryptjs';
export const signup = async (req,res,next)=>{

    const{username, email, password} = req.body;
    const hashedPass = bcryptejs.hashSync(password,10);
    const newUser = new User({username, email, password:hashedPass});
    try{
    await newUser.save();
    res.status(201).json({message:"User created successfully!"});
    }catch(error){
        next(error);
    }

}