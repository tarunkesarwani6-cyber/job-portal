const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resume: {
      type: String,
      default: "",
    },

status: {
  type: String,
  enum: [
    "Applied",
    "Under Review",
    "Shortlisted",
    "Interview Scheduled",
    "Accepted",
    "Rejected"
  ],
  default: "Applied"
},

interviewDate: {
  type: String,
},

interviewTime: {
  type: String,
},

meetingLink: {
  type: String,
},

recruiterMessage: {
  type: String,
},
  },
  {
    timestamps: true,
  }
);
applicationSchema.index(
  {
    job: 1,
    applicant: 1,
  },
  {
    unique: true,
  }
);
module.exports = mongoose.model(
  "Application",
  applicationSchema
);