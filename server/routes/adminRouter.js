import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
const router = express.Router();



router.get("/getUsers",getAllUsers)


export default router;
