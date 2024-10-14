import express  from "express";
import { createlisting } from "../controllers/listing.controller.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.post('/create', verfiyToken,createlisting)

export default router;