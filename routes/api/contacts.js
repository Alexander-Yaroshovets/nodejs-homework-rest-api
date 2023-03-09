const express = require("express");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

const {
  addNewContact,
  deleteContact,
  getAll,
  getContactById,
  reNewContact,
  updateFavorite,
} = require("../../controllers/contacts");

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), addNewContact);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchema),
  updateFavorite
);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  reNewContact
);

module.exports = router;
