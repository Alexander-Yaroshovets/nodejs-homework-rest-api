const { ctrlWrapper } = require("../../helpers");

const { User } = require("../../models/user");

const path = require("path");

const Jimp = require("jimp");

const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  console.log(filename);

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const newAvatar = await Jimp.read(resultUpload);

  newAvatar.resize(250, 250);

  newAvatar.write(resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = { updateAvatar: ctrlWrapper(updateAvatar) };
