import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import getCurrentUser from "./controllers/user.controller.js";
import protectedRoute from "./middleware/auth.middleware.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CLIENT_SIDE_URL,
  credentials: true,
}));
app.use(cookieParser());

/** Connect to micro-services */
app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));
app.use("/api/chat", protectedRoute, proxyWithHeader(process.env.CHAT_SERVICE_URL));
app.use("/api/agent", protectedRoute, proxyWithHeader(process.env.AGENT_SERVICE_URL));

app.get("/api/currentUser", protectedRoute, getCurrentUser);

app.get("/", (_req, res) => {
  res.send("Gateway server is running");
});

app.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});