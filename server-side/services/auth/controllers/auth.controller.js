import redis from "../../../shared/redis/redis.js";
import { userLogin } from "../services/auth.service.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const userRecord = await userLogin(token);

    const sessionId = crypto.randomUUID();

    const sessionData = {
      userId: userRecord._id,
      name: userRecord.username,
      email: userRecord.email,
      avatar: userRecord.avatar,
    };

    await redis.setex(`session:${sessionId}`, 7 * 24 * 60 * 60, JSON.stringify(sessionData));

    res.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(sessionData);

  } catch (error) {
    console.error("Error verifying ID token:", error);
    return res.status(401).json({ message: "Invalid access token" });
  }
};

export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;

    if (!sessionId) {
      console.warn('No session cookie found in logout request');
      res.clearCookie("session");
      return res.status(200).json({ message: "Logged out successfully" });
    }

    await redis.del(`session:${sessionId}`);
    res.clearCookie("session");

    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};