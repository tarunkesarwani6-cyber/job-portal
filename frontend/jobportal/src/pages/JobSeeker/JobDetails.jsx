import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { 
  MapPin, 
  Briefcase, 
  Calendar, 
  IndianRupee, 
  ArrowLeft, 
  Building, 
  CheckCircle2, 
  FileText, 
  Send 
} from "lucide-react";
import { motion } from "framer-motion";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
const [hasApplied, setHasApplied] = useState(false);
  const fetchJob = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOB_BY_ID(id));
      setJob(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };
const checkIfApplied = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.APPLICATIONS.GET_MY_APPLICATIONS
    );

    const alreadyApplied = response.data.some(
      (application) =>
        application.job?._id === id
    );

    setHasApplied(alreadyApplied);

  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  if (id) {
    fetchJob();
    checkIfApplied();
  }
}, [id]);

  const applyToJob = async (jobId) => {
    setIsApplying(true);
    try {
  await axiosInstance.post(
    API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId)
  );

  setHasApplied(true);

  toast.success(
    "Applied Successfully!"
  );
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to apply");
    } finally {
      setIsApplying(false);
    }
  };

  // Modern Shimmer Loading Shell state matching your theme layout
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/40">
        <Navbar />
        <div className="max-w-7xl mx-auto p-6 md:p-8 animate-pulse space-y-6">
          <div className="h-6 w-24 bg-slate-200 rounded-xl" />
          <div className="h-40 bg-white border border-slate-100 rounded-3xl" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 bg-white border border-slate-100 rounded-3xl" />
            <div className="h-64 bg-white border border-slate-100 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50/40 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-slate-700">Job position not found</h3>
        <button onClick={() => navigate("/jobs")} className="mt-4 text-blue-600 font-semibold flex items-center gap-2">
          <ArrowLeft size={16} /> Back to jobs
        </button>
      </div>
    );
  }

  const companyName = job.company?.companyName || "Anonymous Recruiter";
  const initial = companyName[0]?.toUpperCase() || "C";

  return (
    <div className="min-h-screen bg-slate-50/40 pb-16">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        
        {/* Back Link Nav Header */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors group mb-2"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Listings
        </button>

        {/* --- HERO HEADER CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-300/10 to-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex items-center gap-5 relative z-10">
            {/* Branding Logo Avatar Container */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 shadow-inner flex items-center justify-center overflow-hidden flex-shrink-0">
              {job.company?.companyLogo ? (
                <img src={job.company.companyLogo} alt={companyName} className="w-full h-full object-contain p-1" />
              ) : (
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 text-2xl">
                  {initial}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{job.title}</h1>
              <p className="text-base font-semibold text-cyan-600 flex items-center gap-1.5 mt-1">
                <Building size={16} className="text-cyan-500" />
                {companyName}
              </p>
            </div>
          </div>
        </motion.div>

        {/* --- MAIN SPLIT CONTAINER LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT PANEL COLUMN: In-depth Job Content documentation specs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Job Description Card Wrapper */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-50">
                <FileText size={20} className="text-blue-500" />
                Job Description
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium">
                {job.description || "No description overview provided for this role position."}
              </p>
            </div>

            {/* Core Candidate Requirements Card Wrapper */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-50">
                <CheckCircle2 size={20} className="text-emerald-500" />
                Key Requirements
              </h2>
              <div className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
                {job.requirements || "Basic technical competency profiles apply for this track role position listing."}
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL COLUMN: Persistent Meta Specs Box Sticky Hub Component */}
          <motion.aside 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-28 space-y-6"
          >
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md space-y-6">
              <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Position Overview</h3>
              
              {/* Informative Specs Fact Sheets List Node Layout Grid */}
              <div className="space-y-4">
                
                {/* Location Fact Box */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Location</p>
                    <p className="text-sm font-bold text-slate-700">{job.location}</p>
                  </div>
                </div>

                {/* Job Type Fact Box */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Job Type</p>
                    <p className="text-sm font-bold text-slate-700">{job.type}</p>
                  </div>
                </div>

                {/* Salary Range Fact Box */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                    <IndianRupee size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Salary Package</p>
                    <p className="text-sm font-extrabold text-slate-800">
                      ₹{job.salaryMin?.toLocaleString("en-IN")} - ₹{job.salaryMax?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Date Posted Fact Box */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Date Posted</p>
                    <p className="text-sm font-bold text-slate-700">
                      {job.createdAt ? new Date(job.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Recently"}
                    </p>
                  </div>
                </div>

              </div>

              <div className="border-t border-slate-100 my-2"></div>

              {/* Master Theme-matched Primary Submission Button Capsule */}
              <motion.button
  whileHover={{ scale: 1.01 }}
  whileTap={{ scale: 0.99 }}
  disabled={isApplying || hasApplied}
  onClick={() => applyToJob(job._id)}
  className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition flex items-center justify-center gap-2

    ${
      hasApplied
        ? "bg-green-500 text-white"
        : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
    }

    disabled:opacity-80
  `}
>
  <Send size={16} />

  {isApplying
    ? "Submitting..."
    : hasApplied
    ? "Applied"
    : "Apply For Position"}
</motion.button>
            </div>
          </motion.aside>

        </div>
      </main>
    </div>
  );
};

export default JobDetails;