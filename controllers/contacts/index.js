const { addNewContact } = require("./addContact");

const { deleteContact } = require("./deleteContact");

const { getAll } = require("./getAllContacts");

const { getContactById } = require("./getContactById ");

const { reNewContact } = require("./updateAllContact");

const { updateFavorite } = require("./updateFavoriteField");

module.exports = {
  addNewContact,
  deleteContact,
  getAll,
  getContactById,
  reNewContact,
  updateFavorite,
};
