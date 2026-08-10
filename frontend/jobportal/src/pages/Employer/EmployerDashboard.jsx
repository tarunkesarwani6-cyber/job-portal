import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import LoadingSpinner from "../../components/LoadingSpinner";
import Card from "../../components/cards/Card";
import StatCard from "../../components/cards/StatCard";
import JobDashboardCard from "../../components/cards/JobDashboardCard";
import {
  Users,
  Briefcase,
  Building2,
  CheckCircle2,
  Plus,
  ArrowRight,
  Sparkles,
  Inbox
} from "lucide-react";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import ApplicantDashboardCard from "../../components/cards/ApplicantDashboardCard";
import { motion } from "framer-motion";

const EmployerDashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardOverview = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.ANALYTICS.GET_EMPLOYER_ANALYTICS
      );
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDashboardOverview();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout activeMenu="employer-dashboard">
        {/* Modern Shimmer Layout Skeleton while loading */}
        <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto animate-pulse">
          <div className="h-44 bg-slate-200 rounded-3xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-28 bg-slate-100 rounded-2xl" />
            ))}
          </div>
          <div className="h-64 bg-slate-100 rounded-3xl" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="employer-dashboard">
      {/* Viewport Frame Container */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="p-4 md:p-8 bg-[#f8fafc] min-h-screen space-y-8 max-w-7xl mx-auto relative isolate"
      >
        {/* Soft Background Accents */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-cyan-400/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* --- WELCOME HERO BANNER MODULE --- */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 p-6 md:p-8 text-white relative overflow-hidden shadow-lg shadow-indigo-100">
          <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none mix-blend-overlay" />
          <div className="absolute right-0 top-0 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-cyan-200 text-xs font-semibold tracking-wide uppercase mb-1 backdrop-blur-md">
              <Sparkles size={12} />
              Recruiter Workspace
            </span>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Welcome back, Tarun 👋
            </h1>
            <p className="text-blue-100/90 text-sm md:text-base font-medium max-w-xl">
              You currently have <span className="text-white font-extrabold">{dashboardData?.counts?.totalActiveJobs || 0} active jobs</span> and{" "}
              <span className="text-white font-extrabold">{dashboardData?.counts?.totalApplications || 0} applications</span> pending review.
            </p>
          </div>
        </div>

        {dashboardData && (
          <>
            {/* --- CORE METRICS OVERVIEW GRID --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Active Jobs"
                value={dashboardData?.counts?.totalActiveJobs || 0}
                icon={Briefcase}
                trend={true}
                trendValue={`${dashboardData?.trends?.activeJobs || 0}%`}
                color="blue"
              />

              <StatCard
                title="Applications"
                value={dashboardData?.counts?.totalApplications || 0}
                icon={Users}
                trend={true}
                trendValue={`${dashboardData?.trends?.totalApplicants || 0}%`}
                color="cyan"
              />

              <StatCard
                title="Hired"
                value={dashboardData?.counts?.totalHired || 0}
                icon={CheckCircle2}
                trend={true}
                trendValue={`${dashboardData?.trends?.totalHired || 0}%`}
                color="emerald"
              />
            </div>

            {/* --- MAIN SPLIT ACTIONS SHEETS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Left Segment: Active Streams (Listings & Submissions) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Recent Job Posts Card Section */}
                <Card
                  title="Recent Job Posts"
                  subtitle="Your latest active career openings"
                  headerAction={
                    <button
                      onClick={() => navigate("/manage-jobs")}
                      className="text-xs font-bold text-blue-600 hover:text-cyan-600 transition-colors bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100"
                    >
                      View all
                    </button>
                  }
                >
                  <div className="space-y-3 pt-2">
                    {dashboardData?.data?.recentJobs?.length > 0 ? (
                      dashboardData.data.recentJobs
                        .slice(0, 3)
                        .map((job, index) => <JobDashboardCard key={index} job={job} />)
                    ) : (
                      <p className="text-xs font-medium text-slate-400 text-center py-4">No positions posted yet.</p>
                    )}
                  </div>
                </Card>

                {/* Recent Candidate Submissions Section */}
                <Card
                  title="Recent Applications"
                  subtitle="Latest incoming candidate profiles"
                >
                  <div className="space-y-3 pt-2">
                    {dashboardData?.data?.recentApplications?.length > 0 ? (
                      dashboardData.data.recentApplications
                        .slice(0, 3)
                        .map((data, index) => (
                          <ApplicantDashboardCard
                            key={index}
                            applicant={data?.applicant}
                            position={data?.job?.title}
                            time={moment(data?.updatedAt).fromNow()}
                          />
                        ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center text-slate-400">
                        <Inbox size={20} className="stroke-[1.5] mb-1.5 text-slate-300" />
                        <p className="text-xs font-medium">No candidate submittals yet.</p>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Right Segment: Administrative Action Tools Menu */}
              <div className="space-y-6">
                <Card
                  title="Quick Actions"
                  subtitle="Common administrative workspace tasks"
                >
                  <div className="flex flex-col gap-3 pt-2">
                    {[
                      {
                        title: "Post New Job",
                        icon: Plus,
                        color: "bg-blue-50 text-blue-600 border border-blue-100",
                        path: "/post-job",
                      },
                      {
                        title: "Review Applications",
                        icon: Users,
                        color: "bg-cyan-50 text-cyan-600 border border-cyan-100",
                        path: "/manage-jobs",
                      },
                      {
                        title: "Company Settings",
                        icon: Building2,
                        color: "bg-emerald-50 text-emerald-600 border border-emerald-100",
                        path: "/company-profile",
                      },
                    ].map((action, index) => (
                      <button
                        key={index}
                        onClick={() => navigate(action.path)}
                        className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-cyan-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left w-full"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-105 ${action.color}`}>
                            <action.icon className="h-5 w-5" />
                          </div>
                          <span className="font-bold text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                            {action.title}
                          </span>
                        </div>
                        
                        {/* ✅ Fixed Stacking Context positioning for the action indicator arrow arrow icon */}
                        <ArrowRight
                          size={16}
                          className="text-slate-400 opacity-40 group-hover:opacity-100 group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all duration-200"
                        />
                      </button>
                    ))}
                  </div>
                </Card>
              </div>

            </div>
          </>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default EmployerDashboard;