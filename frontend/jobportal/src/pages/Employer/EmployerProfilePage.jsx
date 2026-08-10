import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { 
  Building2, 
  Globe, 
  FileText, 
  Settings, 
  ExternalLink, 
  ShieldCheck, 
  Activity 
} from "lucide-react";
import { motion } from "framer-motion";

const EmployerProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_ME);
      setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (!profile) {
    return (
      <DashboardLayout activeMenu="company-profile">
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 animate-pulse">
          <div className="h-44 bg-slate-200 rounded-3xl" />
          <div className="h-64 bg-white border border-slate-100 rounded-3xl" />
        </div>
      </DashboardLayout>
    );
  }

  const initialLetter = profile.companyName?.[0]?.toUpperCase() || "C";

  return (
    <DashboardLayout activeMenu="company-profile">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 bg-[#f8fafc] min-h-screen relative isolate"
      >
        {/* Ambient background blur elements */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/5 to-cyan-400/5 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* --- 🌟 FIX 1: HERO BANNER DESIGNED FOR MOBILE + DESKTOP --- */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 min-h-[14px] md:h-48 rounded-3xl shadow-xl p-6 md:p-8 overflow-hidden flex items-center">
          <div className="absolute inset-0 bg-white/5 opacity-20 pointer-events-none mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-300/10 rounded-full blur-3xl pointer-events-none" />

          {/* flex-col on mobile, flex-row on desktop layout */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-6 relative z-20 pt-4 md:pt-0">
            
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-4 md:gap-5 w-full md:w-auto">
              {/* Logo Box */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 border-white/30 backdrop-blur-md bg-white shadow-2xl flex items-center justify-center overflow-hidden flex-shrink-0">
                {profile.companyLogo ? (
                  <img
                    src={profile.companyLogo}
                    alt=""
                    className="w-full h-full object-contain p-1.5"
                  />
                ) : (
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 text-3xl">
                    {initialLetter}
                  </span>
                )}
              </div>

              {/* Text Area */}
              <div className="text-white min-w-0 max-w-full">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight truncate px-1">
                  {profile.companyName}
                </h1>
                {profile.companyWebsite && (
                  <a
                    href={profile.companyWebsite.startsWith("http") ? profile.companyWebsite : `https://${profile.companyWebsite}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-100/90 text-xs md:text-sm font-semibold hover:text-white transition-colors flex items-center justify-center md:justify-start gap-1.5 mt-1.5 px-2 py-1 bg-white/10 rounded-xl md:bg-transparent md:p-0 max-w-full"
                  >
                    <Globe size={14} className="flex-shrink-0 opacity-80" />
                    {/* 🌟 FIX 2: Added break-all and truncate behaviors to keep massive URLs contained */}
                    <span className="truncate break-all max-w-[240px] sm:max-w-sm md:max-w-xs block">
                      {profile.companyWebsite}
                    </span>
                    <ExternalLink size={12} className="flex-shrink-0 opacity-60" />
                  </a>
                )}
              </div>
            </div>

            {/* Edit Button adapts cleanly across break-points */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/edit-company-profile")}
              className="w-full md:w-auto px-5 py-2.5 bg-white backdrop-blur-md text-slate-800 md:bg-white/10 md:text-white hover:bg-white/20 border border-slate-200 md:border-white/20 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Settings size={15} />
              Edit Profile
            </motion.button>
          </div>
        </div>

        {/* --- GRID SYSTEM DOWN FROM 3 TO 1 COLUMN FOR MOBILE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Standing side box */}
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-50">
                Company Standing
              </h3>
              
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Verification</p>
                  <p className="text-xs font-bold text-emerald-600">Verified Recruiter</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Activity size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Account Tier</p>
                  <p className="text-xs font-bold text-slate-700">Premium Employer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-50">
                <FileText size={18} className="text-blue-500" />
                Company Description
              </h2>
              
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium whitespace-pre-line bg-slate-50/40 rounded-2xl p-5 border border-slate-100/50 break-words">
                {profile.companyDescription || "No company description listed."}
              </p>
            </div>
          </div>

        </div>

      </motion.div>
    </DashboardLayout>
  );
};

export default EmployerProfilePage;