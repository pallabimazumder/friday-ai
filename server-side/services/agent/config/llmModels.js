import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();

const createGroqModel = () => {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        throw new Error("GROQ_API_KEY is missing. Add it to the agent .env file before starting the service.");
    }

    return new ChatGroq({
        apiKey,
        model: "openai/gpt-oss-120b",
        temperature: 0,
        maxTokens: undefined,
        maxRetries: 2,
    });
};

const createGeminiModel = () => {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
        throw new Error("GOOGLE_API_KEY is missing. Add it to the agent .env file before starting the service.");
    }

    return new ChatGoogleGenerativeAI({
        apiKey,
        model: "gemini-2.5-flash",
        temperature: 0,
        maxRetries: 2,
    });
};

export const getModel = async (agentName) => {
    switch (agentName) {
        case "coding":
            return createGeminiModel();
        default:
            return createGroqModel();
    }
};