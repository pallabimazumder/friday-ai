import { getModel } from "../config/llmModels.js";

export const chatAgent = async (state) => {
    const llmModel = await getModel('chat');
    const systemPrompt = "You're are Friday AI, an intelligent AI assistant."
    const response = llmModel.invoke([
        {
            "role": 'system',
            "content": systemPrompt
        },
        {
            "role": 'human',
            "content": state.prompt
        },
    ]);

    return {
        ...state,
        aiResponse: (await response).content,
    }
};