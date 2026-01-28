const controller1 = {};
const path = require("path");

controller1.francis = (req, res) => {
	try {
		res.send("Hello, this francis Edem from Lesson 1 Controller!");
	} catch (err) {
		res.status(500).json({ error: "An error occurred." });
	}
};

controller1.getLesson1 = (req, res) => {
	try {
		res.send("Hello from Lesson 1 Controller!");
	} catch (err) {
		res.status(500).json({ error: "An error occurred." });
	}
};

module.exports = controller1;
