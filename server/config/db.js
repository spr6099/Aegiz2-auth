import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/crud");
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};

export default db;
