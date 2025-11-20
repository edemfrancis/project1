const controller1 = {};

controller1.francis = (req, res) => {
	res.send("indexFrancis Lesson 1 Welcome to Lesson 1!");
};

controller1.getLesson1 = (req, res) => {
	res.send("Hello from Lesson 1 Controller!");
};

module.exports = controller1;
