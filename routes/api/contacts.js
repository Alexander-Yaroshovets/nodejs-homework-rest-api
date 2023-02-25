const express = require("express");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addNewContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.reNewContact
);

module.exports = router;
