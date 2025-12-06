import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is reuired"],
      trim: true,
      minLength: [3, "Name must be at least 3 charecters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "please enter a valid email address",
      ],
    },
    contact: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
    },
    role: { type: String ,
    enum: ["admin", "user"],
    default: "user",},
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
