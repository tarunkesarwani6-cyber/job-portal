import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";

const ApplicationViewer = () => {
  const { state } = useLocation();

  console.log("LOCATION STATE =", state);
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [interviewDate, setInterviewDate] = useState("");

  const [interviewTime, setInterviewTime] = useState("");

  const [meetingLink, setMeetingLink] = useState("");

  const [recruiterMessage, setRecruiterMessage] = useState("");
  const jobId = state?.jobId;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  if (!state) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <h2>No Job Selected</h2>
        </div>
      </DashboardLayout>
    );
  }

  const getApplicants = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.APPLICATIONS.GET_ALL_APPLICATIONS(jobId),
      );

      setApplications(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplicants();
  }, []);
  const updateStatus = async (applicationId, status) => {
    try {
      await axiosInstance.put(
        API_PATHS.APPLICATIONS.UPDATE_STATUS(applicationId),
        {
          status,
          interviewDate,
          interviewTime,
          meetingLink,
          recruiterMessage,
        },
      );

      toast.success("Status Updated");

      getApplicants();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  const job = applications[0]?.job;
  return (
    <DashboardLayout activeMenu="manage-jobs">
      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-6 mb-6">
          <h1 className="text-3xl font-bold">{job?.title}</h1>

          <div className="flex gap-4 mt-3 text-sm">
            <span>{job?.location}</span>
            <span>{job?.type}</span>
            <span>{job?.category}</span>
          </div>

          <div className="mt-4 bg-white/20 rounded-xl px-4 py-2 inline-block">
            {applications.length} Application(s)
          </div>
        </div>
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{app.applicant?.name}</h3>

                  <p className="text-gray-500">{app.applicant?.email}</p>
                  <div className="mt-3">
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                    >
                      📄 View Resume
                    </a>
                  </div>

                  <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                    {app.status}
                  </span>
                </div>

                <div className="flex gap-2">
                  {(app.status === "Pending" ||
  app.status === "Applied") && (
                    <>
                      <button
                        onClick={() => updateStatus(app._id, "Reviewed")}
                        className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg"
                      >
                        Review
                      </button>

                      <button
                        onClick={() => {
                          setSelectedApplication(app);
                          setShowInterviewModal(true);
                        }}
                        className="px-3 py-2 bg-green-100 text-green-700 rounded-lg"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => updateStatus(app._id, "Rejected")}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {app.status === "Reviewed" && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedApplication(app);
                          setShowInterviewModal(true);
                        }}
                        className="px-3 py-2 bg-green-100 text-green-700 rounded-lg"
                      >
                        Accept Now
                      </button>

                      <button
                        onClick={() => updateStatus(app._id, "Rejected")}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg"
                      >
                        Reject Now
                      </button>
                    </>
                  )}
                  {app.status === "Accepted" && (
                    <div className="px-4 py-2 rounded-xl bg-green-50 text-green-600 font-semibold justify-center items-center flex">
                      ✓ Candidate Accepted
                    </div>
                  )}
                  {app.status === "Rejected" && (
                    <div className="px-4 py-2 rounded-xl bg-red-50 text-red-600 font-semibold justify-center items-center flex">
                      ✕ Candidate Rejected
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
        {showInterviewModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div
              className="
bg-white/90
backdrop-blur-xl
border border-white/20
rounded-3xl
p-8
shadow-2xl
w-[600px]
"
            >
              <h2 className="text-2xl font-bold text-slate-800">
                Schedule Interview
              </h2>

              <p className="text-slate-500 text-sm mb-6">
                Send interview details directly to the candidate.
              </p>

              <input
                type="date"
                className="
w-full
bg-slate-50
border
border-slate-200
focus:border-cyan-400
rounded-xl
px-4
py-3
text-sm
outline-none
transition
"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
              />

              <input
                type="time"
                className="
w-full
bg-slate-50
border
border-slate-200
focus:border-cyan-400
rounded-xl
px-4
py-3
text-sm
outline-none
transition
"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
              />

              <input
                type="text"
                placeholder="Google Meet Link"
                className="
w-full
bg-slate-50
border
border-slate-200
focus:border-cyan-400
rounded-xl
px-4
py-3
text-sm
outline-none
transition
"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
              />

              <textarea
                placeholder="Additional Message"
                className="
w-full
bg-slate-50
border
border-slate-200
focus:border-cyan-400
rounded-xl
px-4
py-3
text-sm
outline-none
transition
"
                rows={4}
                value={recruiterMessage}
                onChange={(e) => setRecruiterMessage(e.target.value)}
              />

              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowInterviewModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    if (!selectedApplication) return;
                    if (!interviewDate || !interviewTime || !meetingLink) {
                      toast.error("Please fill all interview details");
                      return;
                    }
                    await updateStatus(selectedApplication._id, "Accepted");

                    setShowInterviewModal(false);

                    setInterviewDate("");
                    setInterviewTime("");
                    setMeetingLink("");
                    setRecruiterMessage("");
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ApplicationViewer;
