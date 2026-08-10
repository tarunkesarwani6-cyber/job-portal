const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJob");

// Create Job (Employer Only)
exports.createJob = async (req, res) => {
  try {

    const { role, _id: userId } = req.user;

    if (role !== "employer") {
      return res.status(403).json({
        message: "Only employers can post jobs",
      });
    }

    const job = await Job.create({
      ...req.body,
      company: userId,
    });

    const createdJob = await Job.findById(job._id)
      .populate(
        "company",
        "name companyName avatar companyWebsite companyLogo"
      )
      .lean();

    res.status(201).json(createdJob);

  } catch (err) {

  res.status(500).json({
    message: err.message,
  });
}
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      isClosed: false,
    })
      .populate(
        "company",
        "name companyName companyWebsite companyLogo avatar"
      )
      .sort({ createdAt: -1 });

    res.json(jobs);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Jobs Posted By Logged-in Employer
exports.getJobsByEmployer = async (req, res) => {
  try {
    const userId = req.user._id;
    const { role } = req.user;

    if (role !== "employer") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    // Get jobs posted by this employer
    const jobs = await Job.find({
      company: userId,
    })
      .populate(
        "company",
        "name companyName companyLogo avatar"
      )
      .lean();

    // Count applications for each job
    const jobsWithApplicationCounts =
      await Promise.all(
        jobs.map(async (job) => {
          const applicationCount =
            await Application.countDocuments({
              job: job._id,
            });

          return {
            ...job,
            applicationCount,
          };
        })
      );

    res.json(jobsWithApplicationCounts);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Single Job
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate(
        "company",
        "name companyName companyDescription companyWebsite companyLogo avatar"
      )
      .lean();

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const applicationCount =
      await Application.countDocuments({
        job: job._id,
      });

    res.json({
      ...job,
      applicationCount,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const { role, _id: userId } = req.user;

    if (role !== "employer") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Ensure employer owns this job
    if (job.company.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this job",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "company",
      "name companyName avatar companyLogo"
    );

    res.json(updatedJob);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Job
exports.deleteJob = async (
  req,
  res
) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      job.company.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // Delete related applications
    await Application.deleteMany({
      job: job._id,
    });

    // Delete saved jobs
    await SavedJob.deleteMany({
      job: job._id,
    });

    await job.deleteOne();

    res.json({
      message: "Job deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Close / Reopen Job
exports.toggleCloseJob = async (
  req,
  res
) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (
      job.company.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    job.isClosed = !job.isClosed;

    await job.save();

    res.json({
      message: job.isClosed
        ? "Job closed successfully"
        : "Job reopened successfully",
      isClosed: job.isClosed,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};