import express from "express"
import { Login, checkByEmailIdClientExist, getAllEnquiryByClientEmailId, getQuotation } from "../controllers/clientController.js"
const router = express.Router()


router.post('/login', Login)
router.get('/quotation/:email', getQuotation)
router.post('/get-all/enquiry', getAllEnquiryByClientEmailId)
router.get('/existence/:email', checkByEmailIdClientExist)

export default router