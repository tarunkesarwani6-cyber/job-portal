import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import JobCard from "../../components/JobCard";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const getSavedJobs = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SAVED_JOBS.GET_SAVED_JOBS
      );

      setSavedJobs(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };
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
  const removeSavedJob = async (jobId) => {
    try {
      await axiosInstance.delete(
        API_PATHS.SAVED_JOBS.UNSAVE_JOB(jobId)
      );

      toast.success("Job removed");

      getSavedJobs();
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {
  getSavedJobs();
  fetchAppliedJobs();
}, []);
  return (
    <DashboardLayout activeMenu="saved-jobs">
      <div className="p-6">
        {savedJobs.length === 0 ? (
  <div className="bg-white rounded-2xl p-10 text-center">
    <h2 className="text-xl font-semibold">
      No Saved Jobs
    </h2>

    <p className="text-gray-500 mt-2">
      Save jobs to view them later.
    </p>
  </div>
  
) : (
  
  // Grid here
          
         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
  {savedJobs.map((saved) => (
    <JobCard
  key={saved._id}
  job={saved.job}
  isApplied={appliedJobs.includes(saved.job._id)}
  hideBookmark={true}
  isSavedPage={true}
/>
  ))}
</div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SavedJobs;