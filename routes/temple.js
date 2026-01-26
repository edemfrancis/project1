const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");

const temple = require("../controllers/temples");

router.get("/", temple.getAllTemples);

router.get("/:id", validate.saveTemple, temple.getTempleById);
router.post("/", temple.createTemple);

router.put("/:id", validate.saveTemple, temple.updateTemple);

router.delete("/:id", validate.saveTemple, temple.deleteTemple);

module.exports = router;
