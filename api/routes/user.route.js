import  express  from "express";
import { deleteUser, test, updateUser, getUserListing } from "../controllers/user.controller.js";
import { verfiyToken } from "../utils/verfiyUser.js";

const router = express.Router();

router.get('/test',test)
router.post('/update/:id', verfiyToken, updateUser)
router.delete('/delete/:id', verfiyToken, deleteUser)
router.get('/listings/:id',verfiyToken, getUserListing)

export default router;