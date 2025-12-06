import User from "../models/authModel.js";
import UserProfile from "../models/userProfile.js";

export const getAllUsers = async (req, res) => {
  try {
    const profiles = await UserProfile.find().populate("userId").lean();
    console.log(profiles)
    res.json(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
};
