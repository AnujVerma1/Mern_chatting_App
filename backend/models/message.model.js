// // models/message.model.js
// import mongoose from 'mongoose';

// const messageSchema = new mongoose.Schema(
//   {
//     senderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     receiverId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     message: {
//       type: String,
//       required: false, // Not required as it could be a file message
//     },
//     fileUrl: {
//       type: String,
//       required: false,
//     },
//     type: {
//       type: String,
//       enum: ['text', 'image', 'pdf', 'audio'],
//       default: 'text',
//     },
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model('Message', messageSchema);
// export default Message;






























import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
	{
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User", //senderId will be taken as ref from user model
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		message: { 
			type: String,
			required: true,
		},
		// createdAt, updatedAt->time at which msg sent
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
