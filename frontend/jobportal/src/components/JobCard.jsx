import { MapPin, Bookmark, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const JobCard = ({ job, isApplied,  hideBookmark = false,  isSavedPage = false,}) => {
  const navigate = useNavigate();
  if (!job) return null;
  const saveJob = async (e, jobId) => {
    e.stopPropagation();
    try {
      await axiosInstance.post(API_PATHS.SAVED_JOBS.SAVE_JOB(jobId));
      toast.success("Job Saved Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save job");
    }
  };
 
  const getJobTypeStyles = (type) => {
    const lowerType = type?.toLowerCase() || "";
    if (lowerType.includes("remote"))
      return "bg-purple-50 text-purple-600 border border-purple-100";
    if (lowerType.includes("full"))
      return "bg-cyan-50 text-cyan-700 border border-cyan-100";
    return "bg-slate-50 text-slate-600 border border-slate-100";
  };

  const companyName = job.company?.companyName || "Anonymous";
  const initial = companyName[0] ? companyName[0].toUpperCase() : "C";

  return (
    <div
      onClick={() => navigate(`/job/${job._id}`)}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-cyan-200 hover:-translate-y-1.5 transition-all duration-300 p-6 w-full flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            {/* Dynamic Avatar Container matching the theme logo style */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-300">
              {job.company?.companyLogo ? (
                <img
                  src={job.company.companyLogo}
                  alt={companyName}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 text-xl">
                  {initial}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800 group-hover:text-cyan-600 transition-colors duration-200 line-clamp-1">
                {job.title || "Untitled Position"}
              </h2>
              <p className="text-sm font-medium text-slate-400 mt-0.5">
                {companyName}
              </p>
            </div>
          </div>

       {!hideBookmark && (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={(e) => saveJob(e, job._id)}
    className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-cyan-500 transition-colors"
  >
    <Bookmark size={18} />
  </motion.button>
)}
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-500 text-xs font-medium">
            <MapPin size={12} />
            {job.location}
          </span>
          <span
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${getJobTypeStyles(job.type)}`}
          >
            {job.type}
          </span>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 mt-5 text-xs font-medium text-slate-400">
          <Calendar size={14} />
          <span>
            {job.createdAt
              ? new Date(job.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })
              : "Recently"}
          </span>
        </div>

        <div className="border-t border-slate-100 my-4"></div>

        <div className="flex justify-between items-center gap-2">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
              Salary
            </p>
            <h3 className="text-slate-800 font-extrabold text-lg tracking-tight">
              {job.salaryMin && job.salaryMax
                ? `₹${job.salaryMin.toLocaleString("en-IN")} - ₹${job.salaryMax.toLocaleString("en-IN")}`
                : "Competitive"}
            </h3>
          </div>

          {/* Theme matched gradient call-to-action */}
         <div className="flex gap-2 items-center">

  {isSavedPage && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/job/${job._id}`);
      }}
      className="px-4 py-2 rounded-xl border border-cyan-200 text-cyan-600 text-xs font-bold hover:bg-cyan-50 transition"
    >
      View Job
    </button>
  )}

  <button
    disabled={isApplied}
    className={`px-4 py-2 rounded-xl text-xs font-bold
    ${
      isApplied
        ? "bg-green-500 text-white"
        : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
    }`}
  >
    {isApplied ? "Applied" : "Apply"}
  </button>

</div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
