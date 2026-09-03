import express from "express";
import { createConversation, deleteConversation, getConversations, updateConversationTitle } from "../controllers/conversation.controller.js";
import { getMessages, saveMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/conversation/create", createConversation);
router.get("/conversation/get", getConversations);
router.post("/conversation/update-title", updateConversationTitle);
router.delete("/conversation/delete", deleteConversation);

router.post("/message/save", saveMessage);
router.get("/message/get/:conversationId", getMessages);


export default router;