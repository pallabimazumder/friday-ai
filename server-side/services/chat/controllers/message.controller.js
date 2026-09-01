import Message from "../models/message.model.js";

export const saveMessage = async (req, res) => {
    try {
        const { conversationId, role, content } = req.body;
        if (!conversationId || !role || !content) {
            return res.status(400).json({ message: "conversationId, role, and content are required!!!" });
        }
        const message = await Message.create({ conversationId, role, content });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        if (!conversationId) {
            return res.status(400).json({ message: "conversationId is required!!!" });
        }
        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};