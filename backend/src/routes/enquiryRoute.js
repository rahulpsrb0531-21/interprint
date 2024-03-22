import express from "express"
const router = express.Router()
import { createEnquiry, getEnquiryAll } from "../controllers/enquiryController.js"

router.post('/create', createEnquiry)
router.get('/all', getEnquiryAll)

export default router