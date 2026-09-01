import { readFile } from "node:fs/promises";
import { getModel } from "../config/llmModels.js";

const routerPrompt = readFile(
    new URL("../config/router-prompt.txt", import.meta.url),
    "utf8",
);

export const router = async (state) => {
    const llmModel = await getModel("router");
    const promptTemplate = await routerPrompt;
    const prompt = `${promptTemplate.trim()}\n${state.prompt}`;
    const response = await llmModel.invoke(prompt);
    console.log("Router LLM Response: ", response);

    const agent = String(response.content).trim().toLowerCase();

    return {
        ...state,
        agent,
    };
};