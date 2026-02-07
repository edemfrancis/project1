const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");

const temple = require("../controllers/temples");

router.get("/", temple.getAllTemples);

router.get("/:id", temple.getTempleById);
router.post("/", authenticate, validate.saveTemple, temple.createTemple);

router.put("/:id", authenticate, validate.saveTemple, temple.updateTemple);

router.delete("/:id", authenticate, temple.deleteTemple);

module.exports = router;
