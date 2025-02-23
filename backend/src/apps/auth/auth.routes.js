import { Router } from "express";
import { signin, signup, signout } from "./auth.controller.js";
import { authGaurd } from "../../middleware/authGaurd.js";

const router = Router()

router.post("/signin", signin)
router.post("/signup", signup)
router.get("/signout", authGaurd, signout)

export default router



