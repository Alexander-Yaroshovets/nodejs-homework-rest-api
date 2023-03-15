const { User } = require("../../models/user");

const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");

require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(401, "Email already verified");
  }
  const verifyEmail = {
    to: email,
    subject: "email verification",
    html: `<a target = "_blank", href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
