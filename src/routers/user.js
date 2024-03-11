const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const {
  createUser,
  loginUser,
  logoutUser,
  logoutAllUsers,
  getMyProfile,
  updateMyProfile,
  deleteMyProfile,
  uploadAvatar,
  deleteAvatar,
  getAvatarById,
  getAllUsers,
} = require("../controllers/userController.js");

router.post("/users/signup", createUser);
router.post("/users/login", loginUser);
router.post("/users/logout", auth, logoutUser);
router.post("/users/logoutAll", auth, logoutAllUsers);

router.get("/users/me", auth, getMyProfile);
router.patch("/users/me", auth, updateMyProfile);
router.delete("/users/me", auth, deleteMyProfile);

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post("/users/me/avatar", auth, upload.single("avatar"), uploadAvatar);
router.delete("/users/me/avatar", auth, deleteAvatar);
router.get("/users/:id/avatar", getAvatarById);
router.get("/users", getAllUsers);

module.exports = router;
