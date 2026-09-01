import redis from "../../shared/redis/redis.js";

const protectedRoute = async (req, res, next) => {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    await redis.get(`session:${sessionId}`, (err, sessionData) => {
        if (err || !sessionData) {
            return res.status(401).json({ message: "Session Expired." });
        }

        req.user = JSON.parse(sessionData);
        next();
    });
};

export default protectedRoute;