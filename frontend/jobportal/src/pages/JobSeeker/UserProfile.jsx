import { useState } from "react";
import { Camera, Mail, Briefcase, FileText, Sparkles, ExternalLink, User, Bookmark, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const skillsArray = Array.isArray(user?.skills)
    ? user.skills
    : user?.skills?.split(",").map((s) => s.trim()).filter(Boolean) || [];

  // ✅ Aligned perfectly to your real app infrastructure endpoints
  const sidebarLinks = [
    { icon: <User size={16} />, label: "Personal Profile", path: "/profile" },
    { icon: <Briefcase size={16} />, label: "My Applications", path: "/my-applications" },
    { icon: <Bookmark size={16} />, label: "Saved Jobs", path: "/saved-jobs" },
    { icon: <Search size={16} />, label: "Find Jobs", path: "/find-jobs" }, // Points to dashboard listings stream
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-16 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/10 to-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 pt-8 relative z-10 space-y-6">
        
        {/* --- BANNER --- */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 h-48 rounded-3xl shadow-xl flex items-end p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 mt-12 relative z-20">
            <div className="flex items-center gap-5">
              <img
                src={avatar || user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || "User"}&background=0EA5E9&color=fff`}
                alt="Profile"
                className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border-4 border-white/30 backdrop-blur-md object-cover shadow-2xl bg-slate-50"
              />
              <div className="text-white">
                <h1 className="text-2xl md:text-3xl font-black tracking-tight">{user?.name}</h1>
                <p className="text-blue-100/80 text-sm font-medium mt-1 flex items-center gap-1.5">
                  <Mail size={14} />
                  {user?.email}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/edit-profile")}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-sm shadow-lg transition-all"
            >
              Edit Profile
            </motion.button>
          </div>
        </div>

        {/* --- MAIN DASHBOARD SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* LEFT SIDEBAR LINKS HUB */}
          <aside className="bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl p-3 shadow-sm space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 pt-2 pb-1.5">Navigation</p>
            {sidebarLinks.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={idx}
                  to={link.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-100/50"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </aside>

          {/* RIGHT PANELS */}
          <div className="lg:col-span-3 bg-white border border-slate-100 shadow-sm rounded-3xl p-6 md:p-8 space-y-8">
            {/* Stats Summary Panel Row Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0"><Briefcase size={18} /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience</p>
                  <p className="text-sm font-extrabold text-slate-700 mt-0.5">{user?.experience || "Not Added"}</p>
                </div>
              </div>
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center flex-shrink-0"><Sparkles size={18} /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skills</p>
                  <p className="text-sm font-extrabold text-slate-700 mt-0.5">{skillsArray.length} Stacked</p>
                </div>
              </div>
              <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0"><FileText size={18} /></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resume Profile</p>
                  <p className={`text-xs font-bold mt-0.5 ${user?.resume ? "text-emerald-600" : "text-amber-500"}`}>{user?.resume ? "Uploaded & Active" : "Missing"}</p>
                </div>
              </div>
            </div>

            {/* Skills Content Block */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-500" />
                Skills Profile
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillsArray.length === 0 ? (
                  <p className="text-xs text-slate-400 font-medium">No professional skills loaded.</p>
                ) : (
                  skillsArray.map((skill, index) => (
                    <span key={index} className="px-3.5 py-1.5 bg-slate-50 border border-slate-200/50 text-slate-700 text-xs font-bold rounded-xl shadow-sm">
                      {skill}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Resume Document Link */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <FileText size={16} className="text-blue-500" />
                Attached Document
              </h3>
              {user?.resume ? (
                <a
                  href={`${user.resume}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50/30 border border-blue-100 rounded-xl px-4 py-2.5 group"
                >
                  <FileText size={14} />
                  View Document File
                  <ExternalLink size={12} className="opacity-60 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ) : (
                <p className="text-sm font-medium text-slate-400">No active files attached.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;