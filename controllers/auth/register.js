const { User } = require("../../models/user");

const bcrypt = require("bcrypt");

const gravatar = require("gravatar");

const { nanoid } = require("nanoid");

require("dotenv").config();

const { BASE_URL } = process.env;

const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "email already in use");
  }
  if (!user.verify) {
    throw HttpError(409, "email not verified");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);
  const verificationCode = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const verifyEmail = {
    to: email,
    subject: "email verification",
    html: `<a target = "_blank", href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = { register: ctrlWrapper(register) };
