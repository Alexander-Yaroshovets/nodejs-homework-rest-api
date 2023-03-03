const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const bcrypt = require("bcrypt");

const { ctrlWrapper, HttpError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "email or password wrong");
  }
  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "email or password wrong");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
  });
};

module.exports = { login: ctrlWrapper(login) };
