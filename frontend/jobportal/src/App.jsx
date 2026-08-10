import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { LogIn } from "lucide-react";
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage";
import ManageJobs from "./pages/Employer/ManageJobs";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import JobSeekerDashboard from "./pages/JobSeeker/JobSeekerDashboard";
import JobDetails from "./pages/JobSeeker/JobDetails";
import SavedJobs from "./pages/JobSeeker/SavedJobs";
import UserProfile from "./pages/JobSeeker/UserProfile";
import ApplicationViewer from "./pages/Employer/ApplicationViewer";
import ProtectedRoute from "./routes/ProtectedRoute";
import JobPostingForm from "./pages/Employer/JobPostingForm";
import MyApplications from "./pages/JobSeeker/MyApplications";
import EditProfileDetails from "./pages/Employer/EditProfileDetails";
import EditProfile from "./pages/JobSeeker/EditProfile";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* JOB SEEKER */}
          <Route element={<ProtectedRoute requiredRole="jobseeker" />}>
            <Route path="/find-jobs" element={<JobSeekerDashboard />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/saved-jobs" element={<SavedJobs />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>

          {/* EMPLOYER */}
          <Route element={<ProtectedRoute requiredRole="employer" />}>
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/post-job" element={<JobPostingForm />} />
            <Route path="/manage-jobs" element={<ManageJobs />} />
            <Route path="/applicants" element={<ApplicationViewer />} />
            <Route path="/company-profile" element={<EmployerProfilePage />} />
            <Route
              path="/edit-company-profile"
              element={<EditProfileDetails />}
            />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
};

export default App;
