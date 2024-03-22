import express from "express"
import { Login } from "../controllers/dispatchController.js"
const router = express.Router()

router.post('/login', Login)

export default router