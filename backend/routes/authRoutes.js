const express = require("express");
const upload = require("../middlewares/uploadMiddlewares");
const {
  register,
  login,
  getMe,
} = require("../controllers/authController");
const resumeUpload = require("../middlewares/resumeUploadMiddleware");
const {
  protect,
} = require("../middlewares/authMiddlewares");

const router = express.Router();

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

// Get Logged-in User
router.get("/me", protect, getMe);
router.post(
  "/upload-image",
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const imageUrl =
      `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({
      imageUrl,
    });
  }
);
router.post(
  "/upload-resume",
  resumeUpload.single("resume"),
  (req, res) => {
    const resumeUrl =
      `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.json({
      resumeUrl,
    });
  }
);
module.exports = router;