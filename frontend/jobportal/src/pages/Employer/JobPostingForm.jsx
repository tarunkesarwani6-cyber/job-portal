import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  MapPin,
  DollarSign,
  Briefcase,
  Users,
  Eye,
  Send,
  IndianRupee,
} from "lucide-react";
import JobPostingPreview from "../../components/JobPostingPreview";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import toast from "react-hot-toast";
import InputField from "../../components/Input/InputField";
import SelectField from "../../components/Input/SelectField";
import TextareaField from "../../components/Input/TextareaField";

const JobPostingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const jobId = location.state?.jobId || null;

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.jobTitle.trim()) {
      errors.jobTitle = "Job title is required";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.jobType) {
      errors.jobType = "Job type is required";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!formData.requirements.trim()) {
      errors.requirements = "Requirements are required";
    }
    return errors;
  };
  const fetchJobDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_JOB_BY_ID(jobId),
      );

      const job = response.data;

      setFormData({
        jobTitle: job.title || "",
        location: job.location || "",
        category: job.category || "",
        jobType: job.type || "",
        description: job.description || "",
        requirements: job.requirements || "",
        salaryMin: job.salaryMin || "",
        salaryMax: job.salaryMax || "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to load job");
    }
  };
  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);
  const isFormValid = () => {
    const validationErrors = validateForm(formData);

    return Object.keys(validationErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      const jobPayload = {
        title: formData.jobTitle,
        description: formData.description,
        requirements: formData.requirements,
        location: formData.location,
        category: formData.category,
        type: formData.jobType,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
      };

      if (jobId) {
        await axiosInstance.put(API_PATHS.JOBS.UPDATE_JOB(jobId), jobPayload);

        toast.success("Job Updated Successfully");
      } else {
        await axiosInstance.post(API_PATHS.JOBS.CREATE_JOB, jobPayload);

        toast.success("Job Posted Successfully");
      }

      navigate("/manage-jobs");
    } catch (error) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Failed to save job");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isPreview) {
    return (
      <DashboardLayout activeMenu="post-job">
        <JobPostingPreview formData={formData} setIsPreview={setIsPreview} />
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout activeMenu="post-job">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2>{jobId ? "Edit Job" : "Post a New Job"}</h2>

                <p>
                  {jobId
                    ? "Update your job details"
                    : "Fill out the form below to create your job posting"}
                </p>
              </div>

              <button
                onClick={() => {
                  setIsPreview(true);
                }}
                disabled={!isFormValid()}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-100"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <InputField
                label="Job Title"
                id="jobTitle"
                placeholder="e.g., Senior Frontend Developer"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                error={errors.jobTitle}
                required
                icon={Briefcase}
              />
            </div>
            {/* Location */}
            <div className="space-y-4">
              <InputField
                label="Location"
                id="location"
                placeholder="e.g., New York, NY"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                error={errors.location}
                icon={MapPin}
              />
            </div>

            {/* Category & Job Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Category"
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                options={CATEGORIES}
                placeholder="Select a category"
                error={errors.category}
                required
                icon={Users}
              />

              <SelectField
                label="Job Type"
                id="jobType"
                value={formData.jobType}
                onChange={(e) => handleInputChange("jobType", e.target.value)}
                options={JOB_TYPES}
                placeholder="Select job type"
                error={errors.jobType}
                required
                icon={Briefcase}
              />
            </div>
            <TextareaField
              label="Job Description"
              id="description"
              placeholder="Describe the role and responsibilities..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              error={errors.description}
              helperText="Include key responsibilities and day-to-day tasks"
              required
            />

            <TextareaField
              label="Requirements"
              id="requirements"
              placeholder="List key qualifications and skills..."
              value={formData.requirements}
              onChange={(e) =>
                handleInputChange("requirements", e.target.value)
              }
              error={errors.requirements}
              helperText="Include required skills, experience level and education"
              required
            />
            {/* Salary Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Salary Range
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    type="number"
                    placeholder="Min"
                    value={formData.salaryMin}
                    onChange={(e) =>
                      handleInputChange("salaryMin", e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-5 w-5 text-gray-400" />
                  </div>

                  <input
                    type="number"
                    placeholder="Max"
                    value={formData.salaryMax}
                    onChange={(e) =>
                      handleInputChange("salaryMax", e.target.value)
                    }
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {errors.salary && (
                <div className="flex items-center gap-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.salary}</span>
                </div>
              )}
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !isFormValid()}
                className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Publishing Job...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Publish Job
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobPostingForm;
