// import mongoose from "mongoose";

// const connectToMongoDB = async () => {
// 	try {
// 		await mongoose.connect(process.env.MONGO_DB_URI, {
// 			useNewUrlParser: true,
// 			useUnifiedTopology: true,
// 			useCreateIndex: true,
// 			useFindAndModify: false,
// 		});
// 		console.log("Connected to MongoDB");
// 	} catch (error) {
// 		console.error("Error connecting to MongoDB:", error.message);
// 		process.exit(1); // Exit process with failure
// 	}
// };

// export default connectToMongoDB;

















import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default connectToMongoDB;
