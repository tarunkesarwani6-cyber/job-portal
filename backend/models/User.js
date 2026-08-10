const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    // Job Seeker Fields
    skills: [{
  type: String,
}],

    experience: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    // Employer Fields
    companyName: {
      type: String,
      default: "",
    },

    companyWebsite: {
      type: String,
      default: "",
    },

    companyDescription: {
      type: String,
      default: "",
    },
    companyLogo: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

// Compare password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(
    enteredPassword,
    this.password
  );
};

module.exports = mongoose.model(
  "User",
  userSchema
);