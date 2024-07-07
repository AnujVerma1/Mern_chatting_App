// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import multer from "multer";

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";

// import connectToMongoDB from "./db/connectToMongoDB.js";
// import { app, server } from "./socket/socket.js";

// dotenv.config();

// const __dirname = path.resolve();
// const PORT = process.env.PORT || 5000;

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// // Middleware setup
// app.use(express.json()); // Parse JSON bodies
// app.use(cookieParser()); // Parse cookies

// console.log("Auth Routes Loading...");
// app.use("/api/auth", authRoutes); // Authentication routes
// console.log("Message Routes Loading...");
// app.use("/api/messages", messageRoutes(upload)); // Messages routes with upload middleware
// console.log("User Routes Loading...");
// app.use("/api/users", userRoutes); // Users routes
// console.log("Middleware setup complete");

// // Static files setup
// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// // Catch-all route for SPA
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// // Start server and connect to MongoDB
// server.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`Server Running on port ${PORT}`);
// });
































// import path from "path";
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import multer from "multer";

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";

// import connectToMongoDB from "./db/connectToMongoDB.js";
// import { app, server } from "./socket/socket.js";

// dotenv.config();

// const __dirname = path.resolve();
// const PORT = process.env.PORT || 5000;

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage });

// app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
// app.use(cookieParser());//calling this middleware before calling any route as below

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes(upload)); // Pass upload to messageRoutes
// app.use("/api/users", userRoutes);

// app.use(express.static(path.join(__dirname, "/frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });

// server.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`Server Running on port ${PORT}`);
// });
























// import fs from 'fs';
// import path from 'path';
// import express from 'express';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';

// import authRoutes from './routes/auth.routes.js';
// import messageRoutes from './routes/message.routes.js';
// import userRoutes from './routes/user.routes.js';

// import connectToMongoDB from './db/connectToMongoDB.js';
// import { app, server } from './socket/socket.js';

// dotenv.config();

// const __dirname = path.resolve();
// const PORT = process.env.PORT || 5000;

// // Check if the exports directory exists, if not create it
// const exportsDir = path.join(__dirname, 'exports');

// if (!fs.existsSync(exportsDir)) {
//   fs.mkdirSync(exportsDir);
// }

// app.use(express.json());
// app.use(cookieParser());

// app.use('/api/auth', authRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/users', userRoutes);

// app.use(express.static(path.join(__dirname, '/frontend/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
// });

// server.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`Server Running on port ${PORT}`);
// });


































//ORIGINAL.....................
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());//calling this middleware before calling any route as below

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);//messageRoutes controller
app.use("/api/users", userRoutes);//get users for sidebar endpoint

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
