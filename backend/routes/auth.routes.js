import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

console.log("Auth Routes Loaded"); // Add console log to check if routes are loaded

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;

