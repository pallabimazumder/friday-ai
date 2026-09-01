import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";
import { app } from "../config/firebase.js";

export const userLogin = async (token) => {
  const decodedToken = await getAuth(app).verifyIdToken(token);
  const uid = decodedToken.uid;

  let userRecord = await User.findOne({ firebaseId: uid });
  if (!userRecord) {
    userRecord = await User.create({
      firebaseId: uid,
      username: decodedToken.name || "Anonymous",
      email: decodedToken.email || "",
      avatar: decodedToken.picture || "",
    });
  }

  return userRecord;
};