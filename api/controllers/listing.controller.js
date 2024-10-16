import Listing from "../models/listing.js";
import { errorHandler } from "../utils/error.js";

export const createlisting = async(req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json({listing});
    } catch (error) {
        next(error)
    }
}

export const deleteListing = async(req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, 'لا يمكن العثور على العقار'));
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,'يمكنك فقط حذف العقارات الخاصه بك'))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('عقار محذوف بنجاح');
    } catch (error) {
        next(error)
    }
}

export const   updateListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
    if (!listing){
        return next(errorHandler(404, 'لا يمكن العثور على العقار'));

    }
    if(req.user.id !== listing.userRef){
        return next(errorHandler(401,'يمكنك فقط تعديل العقارات الخاصه بك'))
    }
    const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
        )
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error)
    }
    
    


}

export const getListing = async(req, res, next) => {
    try {
        const listing = await Listing.findByIdAndUpdate(req.params.id);
        if(!listing){
            return next(errorHandler(404, 'لا يمكن العثور على العقار'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error)
    }
}