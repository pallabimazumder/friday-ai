import { StateGraph } from "@langchain/langgraph";
import { agentState } from "./state.js";
import { router } from "./router.js";
import { chatAgent } from "../agents/chat.agent.js";
import { searchAgent } from "../agents/search.agent.js";
import { visionAgent } from "../agents/vision.agent.js";
import { pdfAgent } from "../agents/pdf.agent.js";
import { pptAgent } from "../agents/ppt.agent.js";
import { codingAgent } from "../agents/coding.agent.js";

const workflow = new StateGraph(agentState);

workflow.addNode("router", router);
workflow.addNode("chat", chatAgent);
workflow.addNode("search", searchAgent);
workflow.addNode("vision", visionAgent);
workflow.addNode("pdf", pdfAgent);
workflow.addNode("ppt", pptAgent);
workflow.addNode("coding", codingAgent);

workflow.addEdge('__start__', 'router');
workflow.addConditionalEdges('router', (state) => {
    switch (state.agentName) {
        case 'chat':
            return 'chat';
        case 'search':
            return 'search';
        case 'vision':
            return 'vision';
        case 'pdf':
            return 'pdf';
        case 'ppt':
            return 'ppt';
        case 'coding':
            return 'coding';
        default:
            return 'chat';
    }
}, {
    chat: 'chat',
    search: 'search',
    vision: 'vision',
    pdf: 'pdf',
    ppt: 'ppt',
    coding: 'coding',
});

workflow.addEdge('search', 'chat');

workflow.addEdge('chat', '__end__');
workflow.addEdge('vision', '__end__');
workflow.addEdge('pdf', '__end__');
workflow.addEdge('ppt', '__end__');
workflow.addEdge('coding', '__end__');

const graph = workflow.compile();

export default graph;