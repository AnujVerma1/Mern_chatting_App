// import express from 'express';
// import multer from 'multer';
// import { getMessages, sendMessage, sendFileMessage, exportMessagesToTextFile } from '../controllers/message.controller.js';
// import protectRoute from '../middleware/protectRoute.js';
// import path from 'path'; // Ensure to import path module for filename

// const router = express.Router();

// console.log("Message Routes Loaded"); // Add console log to check if routes are loaded

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Specify the folder for storing uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
//   }
// });

// const upload = multer({ storage });

// // Routes with middleware
// router.get('/:id', protectRoute, getMessages);
// router.post('/send/:id', protectRoute, sendMessage);
// router.post('/upload/:id', protectRoute, upload.single('file'), sendFileMessage); // New route for file uploads
// router.get('/export/:id', protectRoute, exportMessagesToTextFile);

// export default router;























// import express from 'express';
// import { getMessages, sendMessage, exportMessagesToTextFile } from '../controllers/message.controller.js';
// import protectRoute from '../middleware/protectRoute.js';

// const router = express.Router();

// router.get('/:id', protectRoute, getMessages);
// router.post('/send/:id', protectRoute, sendMessage);
// router.get('/export/:id', protectRoute, exportMessagesToTextFile); // New route for exporting messages

// export default router;




















//ORIGINL..............
import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);//msg sent by user hving someid
//protectRiute is used as an authentication to check whether user sending msg should already logged in..not all users in our DB will be allowed to sendmessage rather thode who passes protect function will do
export default router;
