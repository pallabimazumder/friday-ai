import "dotenv/config";
import express from "express";
import router from "./routes/agent.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/", router);

app.get("/", (_req, res) => {
  res.send("Agent service is running");
});

app.listen(PORT, () => {
  console.log(`Agent service is running on port ${PORT}`);
});