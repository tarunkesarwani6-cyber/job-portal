const express = require("express");

const {
  updateProfile,
  deleteResume,
  getPublicProfile,
} = require("../controllers/userController");

const {
  protect,
} = require("../middlewares/authMiddlewares");

const router = express.Router();

// Protected Routes
router.put("/profile", protect, updateProfile);

router.post("/resume", protect, deleteResume);

// Public Route
router.get("/:id", getPublicProfile);

module.exports = router;