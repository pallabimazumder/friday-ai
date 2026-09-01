import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        console.log("User ID from header:", userId);
        const conversation = await Conversation.create({ userId: userId });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getConversations = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        console.log("User ID from header:", userId);
        const conversations = await Conversation.find({ userId: userId }).sort({ updatedAt: -1 });
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateConversationTitle = async (req, res) => {
    try {
        const { conversationId, title } = req.body;
        if (!conversationId || !title) {
            return res.status(400).json({ message: "conversationId and title are required!!!" });
        }
        const conversation = await Conversation.findByIdAndUpdate(conversationId, { title }, { new: false });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.body;
        if (!conversationId) {
            return res.status(400).json({ message: "conversationId is required!!!" });
        }
        await Conversation.findByIdAndDelete(conversationId);
        res.status(200).json({ message: "Conversation deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};