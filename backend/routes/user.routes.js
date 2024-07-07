import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

console.log("User Routes Loaded"); // Add console log to check if routes are loaded

router.get("/", protectRoute, getUsersForSidebar);

export default router;

