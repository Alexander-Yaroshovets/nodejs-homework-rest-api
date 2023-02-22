const express = require("express");

const schema = require("../../schemas/contacts");

const { validateBody } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addNewContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateBody(schema.addSchema), ctrl.reNewContact);

module.exports = router;
