const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");
const { errorHandler } = require("../middleware/errorHandler");

const temple = require("../controllers/temples");

router.get("/", errorHandler(temple.getAllTemples));

router.get("/:id", errorHandler(temple.getTempleById));
router.post(
	"/",
	authenticate,
	validate.saveTemple,
	errorHandler(temple.createTemple),
);

router.put(
	"/:id",
	authenticate,
	validate.saveTemple,
	errorHandler(temple.updateTemple),
);

router.delete("/:id", authenticate, errorHandler(temple.deleteTemple));

module.exports = router;
