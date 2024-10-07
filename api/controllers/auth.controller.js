import User from '../models/user.js';
import bcryptejs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import  Jwt  from 'jsonwebtoken';
export const signup = async (req,res,next)=>{
    try{
    const{username, email, password} = req.body;
    
    const hashedPass =  bcryptejs.hashSync(password,10);
    const newUser = new User({username, email, password:hashedPass});
    
    await newUser.save();
    res.status(201).json("User created successfully!");
    }catch(error){
        return next(error);
        
    }

}

export const signin = async (req,res,next)=>{
    const{email, password} = req.body;
    
    try{
    const user = await User.findOne({email});
        if(!user) return next(errorHandler(404,'User not found '))
        
        const isMatch =  bcryptejs.compareSync(password,user.password);
        if(!isMatch) return next(errorHandler(401,'Invalid email or password'))
        const token = Jwt.sign({id:user._id},process.env.JWT_SECRET);
        const {password: pass, ...rest} = user._doc;
        res.cookie('access_token',token,{httpOnly: true}).status(200).json(rest);
    }catch(error){
        next(error); 
    }
}