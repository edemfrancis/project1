const express = require("express");
const router = express.Router();

const controller1 = require("../controllers/francis");
router.use("/", require("./swagger"));

router.get(
	"/",
	// #swagger.tags = ['Lesson Week 01']
	controller1.francis,
);
router.get("/lesson1", controller1.getLesson1);

module.exports = router;
