import express from "express";
import { agent } from "../controllers/agent.controller.js";

const router = express.Router();

router.post("/api/chat", agent);

export default router;