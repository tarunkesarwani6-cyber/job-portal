import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";
import moment from "moment";
import {
  MapPin,
  Briefcase,
  Calendar,
  FileText,
  IndianRupee,
  Inbox,
  ExternalLink,
  Building,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const getMyApplications = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_MY_APPLICATIONS,
      );
      setApplications(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMyApplications();
  }, []);

  // Soft theme-matched color styles for the top application status badge
  const getStatusStyles = (status) => {
  switch (status) {
    case "Applied":
      return "bg-cyan-50 text-cyan-700 border border-cyan-100";

    case "Under Review":
      return "bg-amber-50 text-amber-700 border border-amber-100";

    case "Shortlisted":
      return "bg-purple-50 text-purple-700 border border-purple-100";

    case "Interview Scheduled":
      return "bg-indigo-50 text-indigo-700 border border-indigo-100";

    case "Accepted":
      return "bg-emerald-50 text-emerald-700 border border-emerald-100";

    case "Rejected":
      return "bg-rose-50 text-rose-700 border border-rose-100";

    default:
      return "bg-slate-50 text-slate-700 border border-slate-100";
  }
};
const statusIcons = {
  "Applied": "📨",
  "Under Review": "👀",
  "Shortlisted": "⭐",
  "Interview Scheduled": "🎤",
  "Accepted": "✅",
  "Rejected": "❌",
};

  return (
    <DashboardLayout activeMenu="my-applications">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        {/* Page Header */}
        <div>
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-500 font-bold">
              Career Hub
            </span>

            <h1 className="text-4xl font-black mt-2">
              <span className="text-slate-800">My</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Applications
              </span>
            </h1>

            <p className="text-slate-400 mt-2 max-w-lg">
              Monitor application progress, review submitted resumes, and stay
              updated with recruiter decisions.
            </p>
          </div>
        </div>

        {/* Loading / Content States */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-44 bg-white border border-slate-100 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm flex flex-col items-center justify-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Inbox size={24} />
            </div>
            <h3 className="text-base font-bold text-slate-700">
              No applications found
            </h3>
            <p className="text-sm text-slate-400 mt-1 max-w-xs">
              You haven't submitted any job applications yet. Head over to the
              Find Jobs section to begin your search!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {applications.map((application, index) => {
                const companyName =
                  application.job?.company?.companyName ||
                  "Anonymous Recruiter";
                const initial = companyName[0]?.toUpperCase() || "C";

                return (
                  <motion.div
                    key={application._id}
                    initial={{ opacity: 0, y: 15, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98, y: 10 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      delay: index * 0.04,
                    }}
                    className="group bg-white border border-slate-100 hover:border-cyan-200 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-5 relative overflow-hidden"
                  >
                    {/* Visual subtle ambient element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/5 to-transparent rounded-full pointer-events-none" />

                    {/* Top Row: Company Info & Status Badge */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                        {/* Integrated Logo / Initial Fallback Box */}
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/80 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-300">
                          {application.job?.company?.companyLogo ? (
                            <img
                              src={application.job.company.companyLogo}
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
                          <h2
                            className="text-lg font-bold text-slate-800 group-hover:text-transparent
group-hover:bg-clip-text
group-hover:bg-gradient-to-r
group-hover:from-blue-600
group-hover:to-cyan-500 transition-colors duration-300"
                          >
                            {application.job?.title || "Untitled Position"}
                          </h2>
                          <p className="text-sm font-semibold text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <Building size={14} className="text-slate-300" />
                            {companyName}
                          </p>
                        </div>
                      </div>

                     <span className={`px-3 py-1 rounded-xl ${getStatusStyles(application.status)}`}>
  {statusIcons[application.status]} {application.status}
</span>
                    </div>

                    {/* --- DYNAMIC COLOURFUL METRICS GRID --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Location: Cyan Accent */}
                      <div className="bg-cyan-50/50 border border-cyan-100 rounded-2xl p-4 flex items-center gap-3 transition-colors group-hover:bg-cyan-50">
                        <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-cyan-100 flex items-center justify-center text-cyan-600 flex-shrink-0">
                          <MapPin size={15} />
                        </div>
                        <div className="truncate">
                          <p className="text-[10px] uppercase font-bold text-cyan-500/90 tracking-wider">
                            Location
                          </p>
                          <p className="text-xs font-bold text-slate-700 truncate">
                            {application.job?.location || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Job Type: Purple Accent */}
                      <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex items-center gap-3 transition-colors group-hover:bg-purple-50">
                        <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                          <Briefcase size={15} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-purple-500/90 tracking-wider">
                            Job Type
                          </p>
                          <p className="text-xs font-bold text-slate-700">
                            {application.job?.type || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Salary: Emerald Accent */}
                      <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 transition-colors group-hover:bg-emerald-50">
                        <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0">
                          <IndianRupee size={14} />
                        </div>
                        <div className="truncate">
                          <p className="text-[10px] uppercase font-bold text-emerald-500/90 tracking-wider">
                            Salary
                          </p>
                          <p className="text-xs font-extrabold text-slate-800 truncate">
                            {application.job?.salaryMin &&
                            application.job?.salaryMax
                              ? `₹${application.job.salaryMin.toLocaleString("en-IN")} - ₹${application.job.salaryMax.toLocaleString("en-IN")}`
                              : "Competitive"}
                          </p>
                        </div>
                      </div>

                      {/* Applied On: Blue Accent */}
                      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center gap-3 transition-colors group-hover:bg-blue-50">
                        <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                          <Calendar size={15} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-blue-500/90 tracking-wider">
                            Applied On
                          </p>
                          <p className="text-xs font-bold text-slate-700">
                            {application.createdAt
                              ? moment(application.createdAt).format(
                                  "DD MMM YYYY",
                                )
                              : "Recently"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row: Masked Resume URL Link Container */}
                    {application.resume && (
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-400 font-medium">
                          <FileText size={14} className="text-slate-300" />
                          <span>Submitted Document:</span>
                          <span className="text-slate-500 font-semibold truncate max-w-xs md:max-w-md">
                            {application.resume.split("/").pop() ||
                              "resume.pdf"}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              navigate(`/job/${application.job._id}`)
                            }
                            className="
    inline-flex items-center gap-1.5
    px-3 py-1.5
    bg-gradient-to-r
    from-blue-600
    to-cyan-500
    text-white
    rounded-xl
    font-bold
    shadow-sm
    hover:opacity-95
    transition-all
  "
                          >
                            View Job
                          </button>
                          <a
                            href={application.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-100 rounded-xl font-bold transition-all group"
                          >
                            View Resume
                            <ExternalLink
                              size={12}
                              className="opacity-70 group-hover:translate-x-0.5 transition-transform"
                            />
                          </a>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyApplications;
