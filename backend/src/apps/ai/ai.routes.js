import { Router } from "express";
import { searchDeepSeek } from "./ai.controller.js";

const router = Router()

router.post('/', searchDeepSeek)

export default router
