
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");
const User = require("../models/User");

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const {
            name,
            avatar,
            resume,
            companyLogo,
            companyName,
            companyDescription,
            companyWebsite,
            skills,
            experience,
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.name = name || user.name;
        user.avatar = avatar || user.avatar;
        user.resume = resume || user.resume;

        // Job Seeker fields
        user.skills = skills || user.skills;
        user.experience = experience || user.experience;

        // Employer fields
        if (user.role === "employer") {
            user.companyName =
                companyName || user.companyName;
            user.companyLogo =
                companyLogo || user.companyLogo;

            user.companyDescription =
                companyDescription ||
                user.companyDescription;

            user.companyWebsite =
                companyWebsite ||
                user.companyWebsite;
        }

        await user.save();

        await user.save();

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,

            companyName: user.companyName,
            companyDescription: user.companyDescription,
            companyLogo: user.companyLogo,

            skills: user.skills,
            experience: user.experience,

            resume: user.resume,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

// Delete Resume
// Delete Resume
exports.deleteResume = async (req, res) => {
  try {
    const { resumeUrl } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "jobseeker") {
      return res.status(403).json({
        message: "Only jobseekers can delete resume",
      });
    }

    if (!resumeUrl) {
      return res.status(400).json({
        message: "Resume URL is required",
      });
    }

    // Extract Cloudinary public ID from URL
    const urlParts = resumeUrl.split("/upload/");

    if (urlParts.length < 2) {
      return res.status(400).json({
        message: "Invalid Cloudinary resume URL",
      });
    }

    let publicId = urlParts[1];

    // Remove version number, e.g. v123456789/
    publicId = publicId.replace(/^v\d+\//, "");

    // Remove file extension
    publicId = publicId.replace(/\.[^/.]+$/, "");

    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });

    // Remove resume URL from database
    user.resume = "";

    await user.save();

    res.json({
      message: "Resume deleted successfully",
    });
  } catch (err) {
    console.error("Cloudinary resume deletion error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Public Profile
exports.getPublicProfile = async (
    req,
    res
) => {
    try {
        const user = await User.findById(
            req.params.id
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json(user);

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};