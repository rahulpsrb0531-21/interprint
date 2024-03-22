import express from "express"
import { Login, getAllEnquiryByClientEmailId, getQuotation } from "../controllers/clientController.js"
const router = express.Router()


router.post('/login', Login)
router.get('/quotation/:id', getQuotation)
router.post('/get-all/enquiry', getAllEnquiryByClientEmailId)

export default router