const fs = require("fs");
const path = require("path");
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
exports.deleteResume = async (req, res) => {
    try {
        const { resumeUrl } = req.body;

        // Extract file name
        const fileName = resumeUrl.split("/").pop();

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

        // Build path
        const filePath = path.join(
            __dirname,
            "../uploads",
            fileName
        );

        // Delete file if exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Remove resume from DB
        user.resume = "";

        await user.save();

        res.json({
            message: "Resume deleted successfully",
        });

    } catch (err) {
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