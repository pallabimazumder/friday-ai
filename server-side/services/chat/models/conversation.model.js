import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "New Conversation",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: true,
});

const conversation = mongoose.model("Conversation", conversationSchema);

export default conversation;