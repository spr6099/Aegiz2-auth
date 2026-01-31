import User from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// helper function
const findEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;
    const user = await findEmail(email);

    if (user) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      contact,
      password: hashedPassword,
    });
    const result = await newUser.save();

    const { password: _, ...userData } = result._doc;
    return res.status(201).json({ data: userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid UserName and Password" });
    }

    const { password: _, ...userData } = user._doc;

    const token = jwt.sign(
      { user: user._id, role: user.role },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login succesfull",
      success: true,
      token,
      data: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
