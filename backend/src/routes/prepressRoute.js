import express from "express"
import { Login, getAllEnquiry, updateUps } from "../controllers/prepressController.js"
const router = express.Router()

router.post('/login', Login)
router.get('/all/enquiry', getAllEnquiry)
router.post('/update/ups', updateUps)

export default router