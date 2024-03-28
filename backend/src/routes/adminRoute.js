import express from "express"
import { registerClient, registerSales, registerWorker } from "../controllers/adminController.js"
const router = express.Router()

router.post("/client/register", registerClient)
router.post("/sales/register", registerSales)
router.post("/worker/register", registerWorker)

export default router