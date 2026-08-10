const express = require("express");
const upload = require("../middlewares/uploadMiddlewares");
const cloudinary = require("../config/cloudinary");
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
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "job-portal/profile-images",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      res.status(200).json({
        imageUrl: result.secure_url,
      });
    } catch (error) {
      console.error("Cloudinary upload error:", error);

      res.status(500).json({
        message: "Image upload failed",
      });
    }
  }
);
router.post(
  "/upload-resume",
  resumeUpload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "job-portal/resumes",
            resource_type: "raw",
            public_id: `${Date.now()}-${req.file.originalname}`,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });

      res.status(200).json({
        resumeUrl: result.secure_url,
      });
    } catch (error) {
      console.error("Cloudinary resume upload error:", error);

      res.status(500).json({
        message: "Resume upload failed",
      });
    }
  }
);
module.exports = router;