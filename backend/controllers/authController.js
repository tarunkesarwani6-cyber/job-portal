const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "60d" }
  );
};

// Register User
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      skills,
      experience,
      resume,
      companyName,
      companyWebsite,
      companyDescription,
    } = req.body;

    // Check existing user
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
      skills,
      experience,
      resume,
      companyName,
      companyWebsite,
      companyDescription,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      companyDescription: user.companyDescription,
      companyName: user.companyName,
      resume: user.resume || '',
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Login User
exports.login = async (req, res) => {
  console.log("LOGIN HIT");
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (
      user &&
      (await user.matchPassword(password))
    ) {
      res.json({
        token: generateToken(user._id),

        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyDescription:
            user.companyDescription || "",
          companyName:
            user.companyName || "",
          resume:
            user.resume || "",
        },
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Current User
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};