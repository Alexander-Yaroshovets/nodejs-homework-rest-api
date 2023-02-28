const { Contact } = require("../../models/contact");

const { ctrlWrapper, HttpError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

module.exports = { deleteContact: ctrlWrapper(deleteContact) };
