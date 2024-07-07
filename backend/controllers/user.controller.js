import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => { //users to which we can chat..apperas on sidebar...these are in database
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");//show all users to which we can chat but skip ourselves and we want user data except there password 

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
