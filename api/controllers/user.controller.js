import Listing from "../models/listing.js";
import User from "../models/user.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
export const test = (req,res)=>{
    res.json({
        message:"Hello !"
    })
}

export const updateUser =  async (req,res,next)=>{

    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, 'Unauthorized to update this user'));
    }
    try {
        if(req.body.password){
            const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
            req.body.password = hashedPassword;
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true});
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'Unauthorized to delete this user'));
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie("access_token")
        res.status(200).json('user has been deleted')
    } catch (error) {
        next(error)
    }
}

export const getUserListing = async(req, res, next) => {
    if(req.user.id === req.params.id){
            try {
                const listings = await Listing.find({userRef: req.params.id});
                res.status(200).json(listings);
            } catch (error) {
                next(error)
            }
    }else{
        return next(errorHandler(401, 'يمكنك فقط مشاهده العقارات الخاصه بك '));
    }
}
