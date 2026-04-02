const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate2");
const { authenticate } = require("../middleware/auth");
const { errorHandler } = require("../middleware/errorHandler"); 

const contactController = require("../controllers/project1");

router.get("/", errorHandler(contactController.getAllContacts));

router.get("/:id", errorHandler(contactController.getContactById));

router.post("/", authenticate, validate.saveContact, contactController.createContact);

router.put("/:id", authenticate, validate.saveContact, contactController.updateContact);

router.delete("/:id", authenticate, contactController.deleteContact);

module.exports = router;
