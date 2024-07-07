// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// // Function to handle sending text messages
// export const sendMessage = async (req, res) => {
// 	try {
// 		const { message } = req.body;
// 		const { id: receiverId } = req.params;
// 		const senderId = req.user._id;

// 		let conversation = await Conversation.findOne({
// 			participants: { $all: [senderId, receiverId] },
// 		});

// 		if (!conversation) {
// 			conversation = await Conversation.create({
// 				participants: [senderId, receiverId],
// 			});
// 		}

// 		const newMessage = new Message({
// 			senderId,
// 			receiverId,
// 			message,
// 		});

// 		if (newMessage) {
// 			conversation.messages.push(newMessage._id);
// 		}

// 		await Promise.all([conversation.save(), newMessage.save()]);

// 		const receiverSocketId = getReceiverSocketId(receiverId);
// 		if (receiverSocketId) {
// 			io.to(receiverSocketId).emit("newMessage", newMessage);
// 		}

// 		res.status(201).json(newMessage);
// 	} catch (error) {
// 		console.log("Error in sendMessage controller: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

// // Function to handle sending file messages
// export const sendFileMessage = async (req, res) => {
// 	try {
// 		const { id: receiverId } = req.params;
// 		const senderId = req.user._id;
// 		const fileUrl = `/uploads/${req.file.filename}`;

// 		let conversation = await Conversation.findOne({
// 			participants: { $all: [senderId, receiverId] },
// 		});

// 		if (!conversation) {
// 			conversation = await Conversation.create({
// 				participants: [senderId, receiverId],
// 			});
// 		}

// 		const newMessage = new Message({
// 			senderId,
// 			receiverId,
// 			message: fileUrl,
// 			type: req.file.mimetype, // Store the file type
// 		});

// 		if (newMessage) {
// 			conversation.messages.push(newMessage._id);
// 		}

// 		await Promise.all([conversation.save(), newMessage.save()]);

// 		const receiverSocketId = getReceiverSocketId(receiverId);
// 		if (receiverSocketId) {
// 			io.to(receiverSocketId).emit("newMessage", newMessage);
// 		}

// 		res.status(201).json(newMessage);
// 	} catch (error) {
// 		console.log("Error in sendFileMessage controller: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

// // Function to handle fetching messages
// export const getMessages = async (req, res) => {
// 	try {
// 		const { id: userToChatId } = req.params;
// 		const senderId = req.user._id;

// 		const conversation = await Conversation.findOne({
// 			participants: { $all: [senderId, userToChatId] },
// 		}).populate("messages");

// 		if (!conversation) return res.status(200).json([]);

// 		const messages = conversation.messages;

// 		res.status(200).json(messages);
// 	} catch (error) {
// 		console.log("Error in getMessages controller: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };

// // Existing export function
// export const exportMessagesToTextFile = async (req, res) => {
// 	try {
// 		const { id: userToChatId } = req.params;
// 		const senderId = req.user._id;

// 		const conversation = await Conversation.findOne({
// 			participants: { $all: [senderId, userToChatId] },
// 		}).populate("messages");

// 		if (!conversation) return res.status(200).json([]);

// 		const messages = conversation.messages.map(message => `${message.senderId}: ${message.message}`).join('\n');

// 		res.setHeader('Content-disposition', 'attachment; filename=messages.txt');
// 		res.set('Content-Type', 'text/plain');
// 		res.status(200).send(messages);
// 	} catch (error) {
// 		console.log("Error in exportMessagesToTextFile controller: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };




























import fs from 'fs';
import path from 'path';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { getReceiverSocketId, io } from "../socket/socket.js";

// existing sendMessage and getMessages functions

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body; // getting msg from user as input
		const { id: receiverId } = req.params; // got it from protectRoute line 24
		const senderId = req.user._id;

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const exportMessagesToTextFile = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate('messages');

		if (!conversation) {
			return res.status(404).json({ error: 'Conversation not found' });
		}

		const messages = conversation.messages;
		const fileName = `messages_${senderId}_${userToChatId}.txt`;
		const filePath = path.join(__dirname, '..', 'exports', fileName);

		const messagesText = messages.map(msg => `${msg.createdAt} - ${msg.senderId}: ${msg.message}`).join('\n');

		fs.writeFileSync(filePath, messagesText);

		res.status(200).download(filePath, fileName, () => {
			fs.unlinkSync(filePath); // Remove the file after download
		});
	} catch (error) {
		console.log('Error in exportMessagesToTextFile controller: ', error.message);
		res.status(500).json({ error: 'Internal server error' });
	}
};






















// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage = async (req, res) => {
// 	try {
// 		const { message } = req.body; //getting msg from user as input
// 		const { id: receiverId } = req.params; //got it from protectRoute line 24
// 		const senderId = req.user._id;

// 		let conversation = await Conversation.findOne({ //mongoose syntax-->check to find conversation b/w these users
// 			participants: { $all: [senderId, receiverId] },
// 		});

// 		if (!conversation) {  //if not found-->we create one with these participants(sender,receiver)
// 			conversation = await Conversation.create({
// 				participants: [senderId, receiverId],
// 			});
// 		}

// 		const newMessage = new Message({  //creating new msg 
// 			senderId,
// 			receiverId,
// 			message,
// 		});

// 		if (newMessage) {//putting that msg into messages array
// 			conversation.messages.push(newMessage._id);
// 		}

// 		// await conversation.save();
// 		// await newMessage.save();

// 		// this will run in parallel
// 		await Promise.all([conversation.save(), newMessage.save()]);

// 		// SOCKET IO FUNCTIONALITY WILL GO HERE
// 		const receiverSocketId = getReceiverSocketId(receiverId);
// 		if (receiverSocketId) {
// 			// io.to(<socket_id>).emit() used to send events to specific client
// 			io.to(receiverSocketId).emit("newMessage", newMessage);
// 		}

// 		res.status(201).json(newMessage); //send the msg as response
// 	} catch (error) {
// 		console.log("Error in sendMessage controller: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// }; 

// export const getMessages = async (req, res) => {
// 	try {
// 		const { id: userToChatId } = req.params; //user we are chating with
// 		const senderId = req.user._id;

// 		const conversation = await Conversation.findOne({ //inside this conversation collection dont just give us messages array
// 			participants: { $all: [senderId, userToChatId] },//rather give each msg one by one-->.populate helps in this
// 		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

// 		if (!conversation) return res.status(200).json([]); 

// 		const messages = conversation.messages;

// 		res.status(200).json(messages);
// 	} catch (error) {
// 		console.log("Error in getMessages controller: ", error.message);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// };
