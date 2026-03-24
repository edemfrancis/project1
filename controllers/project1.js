const mongodb = require("../database/database");
const { ObjectId } = require("mongodb");

const getAllContacts = async (req, res) => {
	//#swagger.tags = ['project1']
	try {
		const result = await mongodb
			.getDatabase()
			.db()
			.collection("users")
			.find({})
			.toArray();
		res.status(200).json(result);
	} catch (err) {
		res
			.status(500)
			.json({ error: "An error occurred while fetching contacts." });
	}
};

const getContactById = async (req, res) => {
	//#swagger.tags = ['project1']
	try {
		if (!ObjectId.isValid(req.params.id)) {
			res.status(400).json({ error: "Invalid contact ID format." });
			return;
		}

		const contactId = new ObjectId(req.params.id);
		const result = await mongodb
			.getDatabase()
			.db()
			.collection("users")
			.findOne({ _id: contactId });
		if (!result) {
			res.status(404).json({ error: "Contact not found." });
			return;
		}
		res.status(200).json(result);
	} catch (err) {
		res
			.status(500)
			.json({ error: "An error occurred while fetching the contact." });
	}
};

const createContact = async (req, res) => {
	//#swagger.tags = ['project1']
	try {
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
			res.status(201).json(response);
		} else {
			res.status(500).json({ error: "Error occurred while creating contact." });
		}
	} catch (err) {
		res
			.status(500)
			.json({ error: "An error occurred while creating the contact." });
	}
};

const updateContact = async (req, res) => {
	//#swagger.tags = ['project1']
	try {
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
		if (response.modifiedCount > 0) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: "Contact not found or no changes made." });
		}
	} catch (err) {
		res
			.status(500)
			.json({ error: "An error occurred while updating the contact." });
	}
};

const deleteContact = async (req, res) => {
	//#swagger.tags = ['project1']
	try {
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
		if (response.deletedCount > 0) {
			res.status(204).send();
		} else {
			res.status(404).json({ error: "Contact not found." });
		}
	} catch (err) {
		res
			.status(500)
			.json({ error: "An error occurred while deleting the contact." });
	}
};

module.exports = {
	getAllContacts,
	getContactById,
	createContact,
	updateContact,
	deleteContact,
};
