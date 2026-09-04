import endpoint from "../../utils/axios";

const getConversations = async () => {
    try {
        const { data } = await endpoint.get('/api/chat/conversation/get');
        return data;
    } catch (error) {
        console.error("Error getting conversation:", error);
        return [];
    }
};

export default getConversations;
