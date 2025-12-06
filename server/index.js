import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import db from "./config/db.js";
const PORT = process.env.PORT;
import User from "./models/authModel.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";

// ഇമേജ് കാണാതിരിക്കാനുള്ള പ്രധാന കാരണം Backend-ൽ ആ ഫോൾഡർ Public
//  ആയി സെറ്റ് ചെയ്യാത്തതാണ്. നിങ്ങൾ Image സേവ് ചെയ്യുന്നുണ്ട്, പക്ഷെ അത് പുറത്തേക്ക്
// (Frontend-ലേക്ക്) കൊടുക്കാനുള്ള അനുവാദം Server-ന് കൊടുത്തിട്ടില്ല.
// ഇത് പരിഹരിക്കാൻ

import path from "path";
import { fileURLToPath } from "url";

// --- 1. Path Setup for ES Modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// --- 2. Make 'uploads' folder Public ---
// ഇതിനർത്ഥം: "/uploads" എന്ന് തുടങ്ങുന്ന ഏത് ലിങ്ക് വന്നാലും "uploads" ഫോൾഡറിൽ നോക്കണം.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(cors());
db();

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
 
app.get("/", (req, res) => {
  res.send("backend connected");
});

const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({
      email: "admin@gmail.com",
    });
    if (!existingAdmin) {
      const admin = new User({
        name: "admin",
        email: "admin@gmail.com",
        contact: "9876543210",
        role: "admin",
        password: "$2b$10$Ndzu2KVG3ta2ThvMRllG6eus19mBAO/ua1oP7GEC1ZEhO7WquTDxi",
      });
      await admin.save();
      console.log("Admin created succesfully");
    } else {
      console.log("ℹ️ Admin account already exists.");
    }
  } catch (error) {
    console.error("error seeding Admin", error.message);
  }
};

app.listen(PORT, () => {
  console.log(`port connected on ${PORT}`);
  seedAdmin();
});
