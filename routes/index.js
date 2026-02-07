const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller1 = require("../controllers/francis");
router.use("/", require("./swagger"));

// router.get(
// 	"/",
// 	// #swagger.tags = ['Lesson Week 01']
// 	controller1.francis,
// );
router.get("/lesson1", controller1.getLesson1);

router.get("/login", passport.authenticate("github"), (req, res) => {});

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			return res.status(500).json({ message: "Error logging out." });
		}
		res.redirect("/");
	});
});

module.exports = router;
