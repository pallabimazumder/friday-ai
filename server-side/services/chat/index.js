import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import router from './routes/chat.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/", router);

app.get('/', (_req, res) => {
    res.send('Chat service is running');
});

app.listen(PORT, () => {
    console.log(`Chat service is running on port ${PORT}`);
    connectDb();
});