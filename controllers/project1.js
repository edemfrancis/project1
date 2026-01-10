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

module.exports = {
	getAllContacts,
	getContactById,
};
