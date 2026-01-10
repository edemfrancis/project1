const express = require("express");
const router = express.Router();

const controller1 = require("../controllers/lessonwk01");

router.get("/", controller1.francis);
router.get("/lesson1", controller1.getLesson1);

module.exports = router;
