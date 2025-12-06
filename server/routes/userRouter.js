import express from "express";
import { fetchUser, updateProfile, userProfile } from "../controllers/userController.js";
import { upload } from "../middleware/multerConfig.js";
import { varifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", upload.single("image"), varifyToken, userProfile);
router.put("/:id", upload.single("image"), varifyToken, updateProfile);

router.get("/profile/:id", varifyToken, fetchUser);

export default router;
