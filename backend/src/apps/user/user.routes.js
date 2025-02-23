import { Router } from "express";
import { getChats, createChat, getUsers, patchUser, createMessage, getMessages } from "./user.controller.js";
import { authGaurd } from "../../middleware/authGaurd.js";

const router = Router()

router.get("/", authGaurd, getUsers)
router.patch("/", authGaurd, patchUser)
router.get("/chats", authGaurd, getChats)
router.post("/chats", authGaurd, createChat)
router.post("/messages", authGaurd, createMessage)
router.get("/messages", getMessages)

export default router
