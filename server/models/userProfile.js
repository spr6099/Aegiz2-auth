import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    designation: String,
    pincode: String,
    state: String,
    address: String,
    gender: String,
    image: String, // store uploaded image filename
  },
  { timestamps: true }
);

export default mongoose.model("UserProfile", userProfileSchema);
