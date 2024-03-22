import express from "express"
import { Login, createQuotation, getAllClient, getAllQuotation, registerClient } from "../controllers/salesController.js"
const router = express.Router()

router.post('/login', Login)
router.post('/client/register', registerClient)
router.post('/create/quotation', createQuotation)
router.get('/get-all/quotation', getAllQuotation)
router.get('/get-all/client', getAllClient)

export default router