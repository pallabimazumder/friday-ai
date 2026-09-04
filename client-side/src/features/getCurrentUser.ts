import endpoint from "../../utils/axios";

const getCurrentUser = async () => {
    try {
        const { data } = await endpoint.get('/api/currentUser');
        return data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
};

export default getCurrentUser;
