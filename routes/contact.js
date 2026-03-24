const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");

const contactController = require("../controllers/project1");

router.get("/", contactController.getAllContacts);

router.get("/:id", contactController.getContactById);

router.post("/", validate.saveContact, contactController.createContact);

router.put("/:id", validate.saveContact, contactController.updateContact);

router.delete("/:id", validate.saveContact, contactController.deleteContact);

module.exports = router;
