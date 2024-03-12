const User = require("../models/user");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");
const sharp = require("sharp");

const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ success: true, user, token });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ success: true, user, token });
  } catch (e) {
    res.status(400).send({ success: false, error: "Invalid credentials" });
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send({ success: true });
  } catch (e) {
    res.status(500).send({ success: false, error: "Logout failed" });
  }
};

const logoutAllUsers = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ success: true });
  } catch (e) {
    res.status(500).send({ success: false, error: "Logout failed" });
  }
};

const getMyProfile = async (req, res) => {
  res.send({ success: true, user: req.user });
};

const updateMyProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ success: false, error: "Invalid updates" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send({ success: true, user: req.user });
  } catch (error) {
    res.status(400).send({ success: false, error: error.message });
  }
};

const deleteMyProfile = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) {
      return res.status(404).send({ success: false, error: "User not found" });
    }
    sendCancelationEmail(deletedUser.email, deletedUser.name);
    res.send({ success: true, user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
};

const uploadAvatar = async (req, res) => {
  const buffer = await sharp(req.file.buffer)
    .resize({ width: 250, height: 250 })
    .png()
    .toBuffer();
  req.user.avatar = buffer;
  await req.user.save();
  res.send({ success: true });
};

const deleteAvatar = async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send({ success: true });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ success: true, users });
  } catch (error) {
    res.status(500).send({ success: false, error: "Internal Server Error" });
  }
};

const getAvatarById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send({ success: false, error: "Avatar not found" });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  logoutAllUsers,
  getAllUsers,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  uploadAvatar,
  deleteAvatar,
  getAvatarById,
};
