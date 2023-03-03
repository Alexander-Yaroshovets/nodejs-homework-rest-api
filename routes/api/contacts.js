const express = require("express");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

const {
  addNewContact,
  deleteContact,
  getAll,
  getContactById,
  reNewContact,
  updateFavorite,
} = require("../../controllers/contacts");

router.get("/", getAll);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(schemas.addSchema), addNewContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateSchema),
  updateFavorite
);

router.delete("/:contactId", isValidId, deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  reNewContact
);

module.exports = router;
