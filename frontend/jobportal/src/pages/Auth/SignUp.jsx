import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader,
  Camera,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import uploadResume from "../../utils/uploadResume";
const Signup = () => {
  const navigate = useNavigate();
const { login } = useAuth();
  const [formData, setFormData] = useState({
    role: "jobseeker",

    profileImage: null,

    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Job Seeker
    skills: "",
    experience: "",
    resume: null,

    // Employer
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
  });

  const [formState, setFormState] = useState({
    loading: false,

    showPassword: false,
    showConfirmPassword: false,

    errors: {},
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: {
          ...prev.errors,
          [name]: "",
        },
      }));
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));
  };
  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };
  const validateForm = () => {
    const errors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (formData.role === "jobseeker") {
      if (!formData.skills.trim()) {
        errors.skills = "Skills are required";
      }

      if (!formData.experience.trim()) {
        errors.experience = "Experience is required";
      }

      if (!formData.resume) {
        errors.resume = "Resume is required";
      }
    }
    if (formData.role === "employer") {
      if (!formData.companyName.trim()) {
        errors.companyName = "Company name is required";
      }

      if (!formData.companyWebsite.trim()) {
        errors.companyWebsite = "Website is required";
      }

      if (!formData.companyDescription.trim()) {
        errors.companyDescription = "Description is required";
      }
    }

    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormState((prev) => ({
        ...prev,
        errors,
      }));
      return;
    }

    setFormState((prev) => ({
      ...prev,
      loading: true,
      errors: {},
    }));

    try {
  let profileImageUrl = "";

  if (formData.profileImage) {
    const uploadResponse = await uploadImage(
      formData.profileImage
    );

    profileImageUrl =
      uploadResponse.imageUrl;
  }
let resumeUrl = "";

if (formData.resume) {
  const resumeResponse =
    await uploadResume(formData.resume);
console.log("RESUME RESPONSE", resumeResponse);
  resumeUrl = resumeResponse.resumeUrl;
}
  const response =
    await axiosInstance.post(
      API_PATHS.AUTH.REGISTER,
      
      {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,

        avatar: profileImageUrl,

        skills: formData.skills,
        experience: formData.experience,
        resume: resumeUrl,

        companyName:
          formData.companyName,

        companyWebsite:
          formData.companyWebsite,

        companyDescription:
          formData.companyDescription,
      }
    );

  const { token, user } =
    response.data;

  login(user, token);

  setFormState((prev) => ({
    ...prev,
    loading: false,
  }));

  navigate("/find-jobs");

} catch (error) {
  setFormState((prev) => ({
    ...prev,
    loading: false,
    errors: {
      submit:
        error?.response?.data
          ?.message ||
        "Registration failed",
    },
  }));
}
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  role: "jobseeker",
                }))
              }
              className={`p-3 rounded-xl border font-semibold transition-all
      ${
        formData.role === "jobseeker"
          ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white"
          : "border-slate-300 text-slate-700"
      }`}
            >
              Job Seeker
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  role: "employer",
                }))
              }
              className={`p-3 rounded-xl border font-semibold transition-all
      ${
        formData.role === "employer"
          ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white"
          : "border-slate-300 text-slate-700"
      }`}
            >
              Employer
            </button>
          </div>
          <div className="flex flex-col items-center mb-8">
            <label className="cursor-pointer">
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-cyan-400 overflow-hidden flex items-center justify-center">
                {formData.profileImage ? (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-cyan-500" />
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <p className="text-sm text-slate-500 mt-3">
              Upload Profile Picture
            </p>
          </div>

          <p className="text-slate-600 mt-2">
            Join our AI-powered hiring platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name</label>

            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300"
              />
            </div>
            {formState.errors.fullName && (
              <p className="text-red-500 text-sm mt-2">
                {formState.errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300"
              />
            </div>
            {formState.errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {formState.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create password"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300"
              />

              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-3"
              >
                {formState.showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {formState.errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {formState.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

              <input
                type={formState.showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-slate-300"
              />

              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showConfirmPassword: !prev.showConfirmPassword,
                  }))
                }
                className="absolute right-3 top-3"
              >
                {formState.showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {formState.errors.confirmPassword}
              </p>
            )}
          </div>
          {formData.role === "jobseeker" && (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium">Skills</label>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="React, Node.js, Python..."
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
                {formState.errors.skills && (
  <p className="text-red-500 text-sm mt-2">
    {formState.errors.skills}
  </p>
)}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Experience
                </label>

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Fresher / 1 Year / 2 Years"
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
                {formState.errors.experience && (
  <p className="text-red-500 text-sm mt-2">
    {formState.errors.experience}
  </p>
)}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Resume</label>

                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
                {formState.errors.resume && (
  <p className="text-red-500 text-sm mt-2">
    {formState.errors.resume}
  </p>
)}

                {formData.resume && (
                  <p className="text-green-600 text-sm mt-2">
                    ✓ {formData.resume.name}
                  </p>
                )}
              </div>
            </>
          )}
          {formData.role === "employer" && (
            <>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Google"
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
                {formState.errors.companyName && (
  <p className="text-red-500 text-sm mt-2">
    {formState.errors.companyName}
  </p>
)}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Company Website
                </label>

                <input
                  type="url"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                  placeholder="https://company.com"
                  className="w-full p-3 rounded-xl border border-slate-300"
                />
                {formState.errors.companyWebsite && (
  <p className="text-red-500 text-sm mt-2">
    {formState.errors.companyWebsite}
  </p>
)}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Company Description
                </label>

                <textarea
                  rows="4"
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleInputChange}
                  placeholder="Tell us about your company..."
                  className="w-full p-3 rounded-xl border border-slate-300 resize-none"
                />
                {formState.errors.companyDescription && (
  <p className="text-red-500 text-sm mt-2">
    {formState.errors.companyDescription}
  </p>
)}
              </div>
            </>
          )}
{formState.errors.submit && (
  <p className="text-red-500 text-sm">
    {formState.errors.submit}
  </p>
)}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500"
          >
            {formState.loading ? (
              <Loader className="animate-spin mx-auto" />
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center">
            <p className="text-slate-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
