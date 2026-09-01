import express from "express";
import { createConversation, deleteConversation, getConversations, updateConversationTitle } from "../controllers/conversation.controller.js";
import { getMessages, saveMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.post("/api/conversation/create", createConversation);
router.get("/api/conversation/get", getConversations);
router.post("/api/conversation/update-title", updateConversationTitle);
router.delete("/api/conversation/delete", deleteConversation);

router.post("/api/message/save", saveMessage);
router.get("/api/message/get/:conversationId", getMessages);


export default router;