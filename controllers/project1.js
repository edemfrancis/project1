const mongodb = require("../database/database2");
const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res) => {
	//#swagger.tags = ['project1']
	try {
		const result = await mongodb.getDatabase().db().collection("users").find();
		const users = await result.toArray();
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(users);
	} catch (err) {
		res
			.status(500)
			.json({ error: "An error occurred while fetching contacts." });
	}
};

const getContactById = async (req, res) => {
	//#swagger.tags = ['project1']
	if (!ObjectId.isValid(req.params.id)) {
		res.status(400).json({ error: "Invalid contact ID format." });
		return;
	}

	try {
		const contactId = new ObjectId(req.params.id);
		const result = await mongodb
			.getDatabase()
			.db()
			.collection("users")
			.find({ _id: contactId });
		const users = await result.toArray();
		if (users.length === 0) {
			res.status(404).json({ error: "Contact not found." });
			return;
		}
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(users[0]);
	} catch (err) {
		res
			.status(500)
			.json({ error: "An error occurred while fetching the contact." });
	}
};
const createContact = async (req, res) => {
	//#swagger.tags = ['project1']
	const contact = {
		email: req.body.email,
		username: req.body.username,
		name: req.body.name,
		ipaddress: req.body.ipaddress,
		birthday: req.body.birthday,
		favoriteColor: req.body.favoriteColor,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	};
	const response = await mongodb
		.getDatabase()
		.db()
		.collection("users")
		.insertOne(contact);
	if (response.acknowledged) {
		res.status(200).json(response);
	} else {
		res
			.status(500)
			.json(
				response.error || "Some error occurred while creating the contact.",
			);
	}
};

const updateContact = async (req, res) => {
	//#swagger.tags = ['project1']
	if (!ObjectId.isValid(req.params.id)) {
		res.status(400).json({ error: "Invalid contact ID format." });
		return;
	}

	const contactId = new ObjectId(req.params.id);
	const contact = {
		email: req.body.email,
		username: req.body.username,
		name: req.body.name,
		ipaddress: req.body.ipaddress,
		birthday: req.body.birthday,
		favoriteColor: req.body.favoriteColor,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	};
	const response = await mongodb
		.getDatabase()
		.db()
		.collection("users")
		.replaceOne({ _id: contactId }, contact);
	console.log(response);
	if (response.modifiedCount > 0) {
		res.status(200).send();
	} else {
		res
			.status(500)
			.json(
				response.error || "Some error occurred while updating the contact.",
			);
	}
};

const deleteContact = async (req, res) => {
	//#swagger.tags = ['project1']
	if (!ObjectId.isValid(req.params.id)) {
		res.status(400).json({ error: "Invalid contact ID format." });
		return;
	}

	const contactId = new ObjectId(req.params.id);
	const response = await mongodb
		.getDatabase()
		.db()
		.collection("users")
		.deleteOne({ _id: contactId });
	console.log(response);
	if (response.deletedCount > 0) {
		res.status(200).send();
	} else {
		res
			.status(500)
			.json(
				response.error || "Some error occurred while deleting the contact.",
			);
	}
};

module.exports = {
	getAllContacts,
	getContactById,
	createContact,
	updateContact,
	deleteContact,
};
