import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import JobCard from "../../components/JobCard";
import Navbar from "../../components/Navbar";
import SearchHeader from "../../components/SearchHeader";
import FilterContent from "../../components/FilterContent";
import { LayoutGrid, List, Briefcase } from "lucide-react";
import JobCardSkeleton from "../../components/JobCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";

const JobSeekerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [jobType, setJobType] = useState("All");
  const [category, setCategory] = useState("All");
const [appliedJobs, setAppliedJobs] = useState([]);
  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOBS);
      setJobs(response.data);
    } catch (error) {
      console.error("Dashboard job fetch failure:", error);
    } finally {
      setLoading(false);
    }
  };
  const [applicationStatuses, setApplicationStatuses] = useState({});
const fetchAppliedJobs = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.APPLICATIONS.GET_MY_APPLICATIONS
    );

    const appliedIds = response.data.map(
      (application) => application.job?._id
    );

    setAppliedJobs(appliedIds);
  } catch (error) {
    console.log(error);
  }
};
  useEffect(() => {
  fetchJobs();
  fetchAppliedJobs();
}, []);

  // 1. RE-ADDED: The missing array filter computation logic block
  const filteredJobs = jobs.filter((job) => {
    const matchesType = jobType === "All" ? true : job.type === jobType;
    const matchesCategory = category === "All" ? true : job.category === category;

    const matchesSearch =
      searchTerm === ""
        ? true
        : job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company?.companyName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      location === ""
        ? true
        : job.location?.toLowerCase().includes(location.toLowerCase());

    return matchesType && matchesCategory && matchesSearch && matchesLocation;
  });

  // 2. Loading Shimmer Skeletons State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/40">
        <Navbar />
        <main className="max-w-7xl mx-auto p-6">
          <div className="h-48 bg-slate-200 rounded-3xl animate-pulse mb-10" />
          <div className="flex gap-8">
            <div className="w-64 h-96 bg-slate-100 rounded-2xl animate-pulse hidden lg:block" />
            <div className="flex-1 grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <JobCardSkeleton key={n} />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/40">
      <Navbar />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <SearchHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          location={location}
          setLocation={setLocation}
        />

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Static Filter Column */}
          <aside className="w-full lg:w-68 flex-shrink-0 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <FilterContent
              jobType={jobType}
              setJobType={setJobType}
              category={category}
              setCategory={setCategory}
            />
          </aside>

          {/* Job Postings Area */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Available Opportunities</h2>
                <p className="text-sm font-medium text-slate-400 mt-0.5">
                  Showing {filteredJobs.length} matches based on your criteria
                </p>
              </div>

              {/* Grid/List Layout Toggles */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto border border-slate-200/40">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {/* Empty State vs Card Mapping Section */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center justify-center max-w-xl mx-auto mt-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-base font-bold text-slate-700">No matching items found</h3>
                <p className="text-sm text-slate-400 mt-1 max-w-xs">
                  We couldn't locate active matches. Try loosening your filter criteria or adjusting keyword phrases.
                </p>
              </div>
            ) : (
              // 3. CLEANED UP: Merged structural duplicates into a singular springy layout animation loop
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-1 md:grid-cols-2 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                <AnimatePresence mode="popLayout">
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job._id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                        delay: index * 0.04,
                      }}
                    >
                      <JobCard
  job={job}
  isApplied={appliedJobs.includes(job._id)}
/>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobSeekerDashboard;