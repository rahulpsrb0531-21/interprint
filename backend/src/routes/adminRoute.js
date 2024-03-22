import express from "express"
import { registerClient, registerSales } from "../controllers/adminController.js"
const router = express.Router()

router.post("/client/register", registerClient)
router.post("/sales/register", registerSales)

export default router