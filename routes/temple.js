const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");

const temple = require("../controllers/temples");

router.get("/", temple.getAllTemples);

router.get("/:id", temple.getTempleById);
router.post("/", validate.saveTemple, temple.createTemple);

router.put("/:id", validate.saveTemple, temple.updateTemple);

router.delete("/:id", temple.deleteTemple);

module.exports = router;
