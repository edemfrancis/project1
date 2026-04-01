const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");

let database = null;

const initDb = (callback) => {
	if (database) {
		console.log("Using existing database connection");
		return callback(null, database);
	}

	const url = process.env.MONGO_URL2;
	if (!url) {
		console.warn("MONGO_URL not set — continuing without database connection");
		return callback(null, null);
	}

	MongoClient.connect(url)
		.then((client) => {
			database = client;
			console.log("Connected to MongoDB");
			callback(null, database);
		})
		.catch((err) => {
			console.error("MongoDB connection error:", err);
			callback(err);
		});
};

const getDatabase = () => {
	if (!database) {
		throw new Error("No database connection");
	}
	return database;
};

module.exports = {
	initDb,
	getDatabase,
};
