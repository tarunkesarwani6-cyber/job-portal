import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Lock, Unlock, ArrowUp, ArrowDown, Search, Filter, Users, Briefcase, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const jobsPerPage = 5;
  const navigate = useNavigate();

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(API_PATHS.JOBS.DELETE_JOB(jobId));
      toast.success("Job deleted");
      getPostedJobs();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete job");
    }
  };

  const handleEditJob = (jobId) => {
    navigate("/post-job", {
      state: { jobId },
    });
  };

  const handleStatusChange = async (jobId) => {
    try {
      await axiosInstance.put(API_PATHS.JOBS.TOGGLE_CLOSE_JOB(jobId));
      toast.success("Job status updated");
      getPostedJobs();
    } catch (error) {
      console.log(error);
    }
  };

  const getPostedJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.JOBS.GET_EMPLOYER_JOBS,
      );
      setJobs(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostedJobs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All"
        ? true
        : statusFilter === "Active"
          ? !job.isClosed
          : job.isClosed;

    return matchesSearch && matchesStatus;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortField === "title") {
      return sortDirection === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    if (sortField === "status") {
      const aVal = a.isClosed ? 1 : 0;
      const bVal = b.isClosed ? 1 : 0;
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    if (sortField === "applicants") {
      const aVal = a.applicationCount || 0;
      const bVal = b.applicationCount || 0;
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / jobsPerPage));

  return (
    <DashboardLayout activeMenu="manage-jobs">
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
        
        {/* --- PAGE HEADER --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-2">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Job Management</h1>
            <p className="text-slate-400 text-sm font-medium mt-1">
              Manage your job postings and track candidate applications.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/post-job")}
            className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-sm shadow-md shadow-cyan-100/60 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Plus size={16} className="stroke-[2.5]" />
            Post New Job
          </motion.button>
        </div>

        {/* --- FILTER & SORT CONTROL HUBS --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
          
          {/* Search Field */}
          <div className="relative md:col-span-5">
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/60 focus:border-cyan-400 text-sm font-medium text-slate-700 placeholder-slate-400 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none transition-colors"
            />
          </div>

          {/* Status Select Filter */}
          <div className="relative md:col-span-3">
            <Filter size={14} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/60 focus:border-cyan-400 text-sm font-bold text-slate-600 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none transition-colors cursor-pointer appearance-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Stream</option>
              <option value="Closed">Closed Slots</option>
            </select>
          </div>

          {/* Sort Selection Toolbar */}
          <div className="md:col-span-4 flex items-center justify-end gap-1 text-xs font-bold text-slate-400 uppercase tracking-wider pl-2">
            <span className="mr-1 text-[11px]">Sort By:</span>
            <button
              onClick={() => handleSort("title")}
              className={`px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 ${sortField === "title" ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50"}`}
            >
              Title {sortField === "title" && (sortDirection === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
            </button>
            <button
              onClick={() => handleSort("applicants")}
              className={`px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 ${sortField === "applicants" ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50"}`}
            >
              Applicants {sortField === "applicants" && (sortDirection === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
            </button>
          </div>
        </div>

        {/* --- DYNAMIC CARD LIST MATRIX --- */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
            Showing {currentJobs.length === 0 ? 0 : indexOfFirstJob + 1} - {Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} Positions
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-32 bg-white border border-slate-100 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : currentJobs.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center text-sm font-semibold text-slate-400 uppercase tracking-wider shadow-sm">
              No job postings matched your criteria.
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {currentJobs.map((job) => {
                  const companyName = job.company?.companyName || "Anonymous Studio";
                  const initial = companyName[0]?.toUpperCase() || "C";

                  return (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="group bg-white border border-slate-100 hover:border-cyan-200 rounded-3xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-5"
                    >
                      {/* Left: Job Core Identifiers */}
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 flex items-center justify-center shadow-inner">
  {job.company?.companyLogo ? (
    <img
      src={job.company.companyLogo}
      alt={companyName}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 text-xl">
      {initial}
    </span>
  )}
</div>
                        <div>
                        <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
  {job.title}
</h2>
                          <p className="text-xs font-semibold text-black flex items-center gap-1.5 mt-0.5">
                            <Briefcase size={12} className="text-black" />
                            {companyName}
                          </p>
                        </div>
                      </div>

                      {/* Right: Metrics Badges & Admin Operations Toolbelts */}
                      <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 md:gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-50">
                        
                        {/* Status Label */}
                        <span className={`px-3 py-1 rounded-xl text-xs font-bold tracking-wide uppercase ${
                          job.isClosed
                            ? "bg-rose-50 text-rose-600 border border-rose-100"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        }`}>
                          {job.isClosed ? "Closed" : "Active"}
                        </span>

                        {/* Applicants Counter Navigation Link Badge */}
                        <button
                          onClick={() => navigate("/applicants", { state: { jobId: job._id } })}
                          className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 border border-slate-200/60 hover:border-blue-200 rounded-xl text-xs font-bold transition-all shadow-sm group/btn"
                        >
                          <Users size={14} className="text-slate-400 group-hover/btn:text-blue-500" />
                          <span>{job.applicationCount || 0} Applicants</span>
                        </button>

                        {/* Action Operations Panel Buttons */}
                        <div className="flex gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                          <button
                            onClick={() => handleEditJob(job._id)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-white rounded-lg hover:shadow-sm transition-all"
                            title="Edit Post"
                          >
                            <Pencil size={15} className="stroke-[2.5]" />
                          </button>

                          <button
                            onClick={() => handleStatusChange(job._id)}
                            className={`p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all ${job.isClosed ? "text-slate-400 hover:text-emerald-600" : "text-amber-500"}`}
                            title={job.isClosed ? "Unlock / Reopen" : "Lock / Close Slots"}
                          >
                            {job.isClosed ? <Unlock size={15} className="stroke-[2.5]" /> : <Lock size={15} className="stroke-[2.5]" />}
                          </button>

                          <button
                            onClick={() => handleDeleteJob(job._id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg hover:shadow-sm transition-all"
                            title="Delete Post"
                          >
                            <Trash2 size={15} className="stroke-[2.5]" />
                          </button>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* --- PAGINATION FOOTER ROW --- */}
        <div className="flex justify-between items-center bg-white border border-slate-100 rounded-2xl px-5 py-3.5 shadow-sm">
          <p className="text-xs font-bold text-slate-400">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-1.5 border border-slate-200 disabled:opacity-40 text-slate-600 hover:bg-slate-50 rounded-xl transition flex items-center justify-center"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-1.5 border border-slate-200 disabled:opacity-40 text-slate-600 hover:bg-slate-50 rounded-xl transition flex items-center justify-center"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ManageJobs;