const Application = require("../models/Application");
const Job = require("../models/Job");
const sendEmail = require("../utils/sendEmail");
const Notification = require(
  "../models/Notification"
);

const createNotification = require("../utils/createNotification");
// Apply to a Job
exports.applyToJob = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        message: "Only job seekers can apply",
      });
    }

    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (job.isClosed) {
      return res.status(400).json({
        message: "This job is closed",
      });
    }

    const existing = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user._id,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already applied to this job",
      });
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user._id,
      resume: req.user.resume,
    });

    res.status(201).json(application);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Get logged-in user's applications
exports.getMyApplications = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({
        message: "Only job seekers can view applications",
      });
    }

    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate({
        path: "job",
        populate: {
          path: "company",
          select:
            "name companyName companyWebsite avatar companyLogo",
        },
      })
      .sort({ createdAt: -1 });

    res.json(applications);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getApplicantsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (
      !job ||
      job.company.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to view applicants",
      });
    }

    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate(
        "job",
        "title location category type"
      )
      .populate(
        "applicant",
        "name email avatar resume"
      );

    res.json(applications);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(
      req.params.id
    )
      .populate("job", "title")
      .populate(
        "applicant",
        "name email avatar resume"
      );

    if (!app) {
      return res.status(404).json({
        message: "Application not found.",
        id: req.params.id,
      });
    }

    const isOwner =
      app.applicant._id.toString() ===
        req.user._id.toString() ||
      app.job.company?.toString() ===
        req.user._id.toString();

    if (!isOwner) {
      return res.status(403).json({
        message: "Not authorized to view application",
      });
    }

    res.json(app);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.updateStatus = async (req, res) => {
  try {
    const {
  status,
  interviewDate,
  interviewTime,
  meetingLink,
  recruiterMessage,
} = req.body;

   const app = await Application.findById(
  req.params.id
)
.populate("job")
.populate("applicant");

    if (
      !app ||
      app.job.company.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Not authorized to update this application",
      });
    }

    app.status = status;
app.interviewDate = interviewDate;
app.interviewTime = interviewTime;
app.meetingLink = meetingLink;
app.recruiterMessage = recruiterMessage;
await app.save();
await Notification.create({
  user: app.applicant._id,

  title: `Application ${status}`,

  message: `Your application for ${app.job.title} is now ${status}.`,
});
if (status === "Accepted") {
 await sendEmail({
  to: app.applicant.email,
  subject: "Interview Invitation - Hirely",
  html: `
    <h2>Congratulations ${app.applicant.name}! 🎉</h2>

    <p>
      Your application for
      <strong>${app.job.title}</strong>
      has been shortlisted.
    </p>

    <hr/>

    <h3>Interview Details</h3>

    <p>
      📅 Date: ${interviewDate}
    </p>

    <p>
      ⏰ Time: ${interviewTime}
    </p>

    <p>
      🔗 Meeting Link:
      <a href="${meetingLink}">
        Join Interview
      </a>
    </p>

    <hr/>

    <p>
      ${recruiterMessage || ""}
    </p>

    <br/>

    <p>
      Best Regards,
      <br/>
      Hirely Recruitment Team
    </p>
  `,
});
await createNotification(
  app.applicant._id,
  "Application Accepted",
  `Your application for ${app.job.title} has been accepted.`
);
}
if (status === "Rejected") {
  await sendEmail({
    to: app.applicant.email,
    subject: "Application Rejected",
    html: `
      <h2>Hello ${app.applicant.name}</h2>
      <p>Thank you for applying for ${app.job.title}.</p>
    `,
  });
  await createNotification(
  app.applicant._id,
  "Application Rejected",
  `Your application for ${app.job.title} was not selected.`
);
}

res.json({
  message: "Application status updated",
  status,
});

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};