import axios from "axios";
import graph from "../graph/graph.js";

export const agent = async (req, res) => {
    try {
        const { conversationId, prompt } = req.body;

        await axios.post(process.env.CHAT_SERVICE_URL + '/api/message/save', {
            conversationId,
            role: 'user',
            content: prompt
        });

        const result = await graph.invoke({
            prompt,
            conversationId
        });

        const response = result.aiResponse;

        return res.status(200).json({ response });
    } catch (error) {
        console.error("Error occurred while calling chat service:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}