const controller1 = {};
const path = require("path");

controller1.francis = (req, res) => {
	res.send("Hello, this francis Edem from Lesson 1 Controller!");
};

controller1.getLesson1 = (req, res) => {
	res.send("Hello from Lesson 1 Controller!");
};

module.exports = controller1;
