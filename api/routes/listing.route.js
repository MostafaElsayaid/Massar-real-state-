import express  from "express";
import { createlisting,deleteListing,updateListing, getListing } from "../controllers/listing.controller.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.post('/create', verfiyToken,createlisting)
router.delete('/delete/:id', verfiyToken, deleteListing)
router.post('/update/:id', verfiyToken, updateListing)
router.get('/get/:id',  getListing)

export default router;