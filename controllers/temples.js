const mongodb = require("../database/database");
const { ObjectId } = require("mongodb");

const getAllTemples = async (req, res) => {
	//#swagger.tags = ['project1']
	const result = await mongodb.getDatabase().db().collection("users").find();
	result.toArray().then((err, Temples) => {
		if (err) {
			res
				.status(500)
				.json({ error: "An error occurred while fetching contacts." });
		}
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(Temples);
	});
};

const getTempleById = async (req, res) => {
	//#swagger.tags = ['project1']
	if (!ObjectId.isValid(req.params.id)) {
		res.status(400).json({ error: "Invalid temple ID format." });
		return;
	}

	const templeId = new ObjectId(req.params.id);
	const result = await mongodb
		.getDatabase()
		.db()
		.collection("users")
		.find({ _id: templeId });
	result.toArray().then((Temples) => {
		if (err) {
			res.status(400).json({ message: err });
		}
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(Temples[0]);
	});
};
const createTemple = async (req, res) => {
	//#swagger.tags = ['project1']
	const temple = {
		temple_id: req.body.temple_id,
		additionalInfo: req.body.additionalInfo,
		name: req.body.name,
		location: req.body.location,
		dedicated: req.body.dedicated,
	};
	const response = await mongodb
		.getDatabase()
		.db()
		.collection("users")
		.insertOne(temple);
	if (response.acknowledged) {
		res.status(201).json(response);
	} else {
		res
			.status(500)
			.json(response.error || "Some error occurred while creating the temple.");
	}
};

const updateTemple = async (req, res) => {
	//#swagger.tags = ['project1']
	if (!ObjectId.isValid(req.params.id)) {
		res.status(400).json({ error: "Invalid temple ID format." });
		return;
	}

	const templeId = new ObjectId(req.params.id);
	const temple = {
		temple_id: req.body.temple_id,
		additionalInfo: req.body.additionalInfo,
		name: req.body.name,
		location: req.body.location,
		dedicated: req.body.dedicated,
	};
	const response = await mongodb
		.getDatabase()
		.db()
		.collection("users")
		.replaceOne({ _id: templeId }, temple);
	console.log(response);
	if (response.modifiedCount > 0) {
		res.status(204).send();
	} else {
		res
			.status(500)
			.json(response.error || "Some error occurred while updating the temple.");
	}
};

const deleteTemple = async (req, res) => {
	//#swagger.tags = ['project1']
	if (!ObjectId.isValid(req.params.id)) {
		res.status(400).json({ error: "Invalid temple ID format." });
		return;
	}

	const templeId = new ObjectId(req.params.id);
	const response = await mongodb
		.getDatabase()
		.db()
		.collection("users")
		.deleteOne({ _id: templeId });
	console.log(response);
	if (response.deletedCount > 0) {
		res.status(204).send();
	} else {
		res
			.status(500)
			.json(response.error || "Some error occurred while deleting the temple.");
	}
};

module.exports = {
	getAllTemples,
	getTempleById,
	createTemple,
	updateTemple,
	deleteTemple,
};
