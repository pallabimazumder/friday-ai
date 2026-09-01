import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

/** Middleware to parse JSON requests */
app.use(express.json());
app.use('/', router);

app.get("/", (_req, res) => {
  res.send("Auth Service is running");
});

app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`);
  connectDb();
});