const mongodb = require("../database/database");
const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res) => {
	//#swagger.tags = ['Contacts']
	const result = await mongodb.getDatabase().db().collection("users").find();
	result.toArray().then((users) => {
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(users);
	});
};

const getContactById = async (req, res) => {
	//#swagger.tags = ['Contacts']
	const contactId = new ObjectId(req.params.id);
	const result = await mongodb
		.getDatabase()
		.db()
		.collection("users")
		.find({ _id: contactId });
	result.toArray().then((users) => {
		res.setHeader("Content-Type", "application/json");
		res.status(200).json(users[0]);
	});
};
const createContact = async (req, res) => {
	//#swagger.tags = ['Contacts']
	const contactId = new ObjectId(req.params.id);
	const contact = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		favoriteColor: req.body.favoriteColor,
		birthday: req.body.birthday,
	};
	const response = await mongodb
		.getDatabase()
		.collection("contacts")
		.insertOne(contact);
	if (response.acknowledged) {
		res.status(201).json(response);
	} else {
		res
			.status(500)
			.json(
				response.error || "Some error occurred while creating the contact.",
			);
	}
};

const updateContact = async (req, res) => {
	//#swagger.tags = ['Contacts']
	const contactId = new ObjectId(req.params.id);
	const contact = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		favoriteColor: req.body.favoriteColor,
		birthday: req.body.birthday,
	};
	const response = await mongodb
		.getDatabase()
		.collection("contacts")
		.replaceOne({ _id: contactId }, contact);
	console.log(response);
	if (response.modifiedCount > 0) {
		res.status(204).send();
	} else {
		res
			.status(500)
			.json(
				response.error || "Some error occurred while updating the contact.",
			);
	}
};

const deleteContact = async (req, res) => {
	//#swagger.tags = ['Contacts']
	const contactId = new ObjectId(req.params.id);
	const response = await mongodb
		.getDatabase()
		.collection("contacts")
		.deleteOne({ _id: contactId });
	console.log(response);
	if (response.deletedCount > 0) {
		res.status(204).send();
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
