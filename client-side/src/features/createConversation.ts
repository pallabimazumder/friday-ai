import endpoint from "../../utils/axios";

const createConversation = async () => {
  try {
    const { data } = await endpoint.post('/api/chat/conversation/create');
    return data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    return [];
  }
};

export default createConversation;