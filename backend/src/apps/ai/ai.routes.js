import { Router } from "express";
import { searchOpenAI } from "./ai.controller.js";

const router = Router()

router.post('/', searchOpenAI)

export default router
