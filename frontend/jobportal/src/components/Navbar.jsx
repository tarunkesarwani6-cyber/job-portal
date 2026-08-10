import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Briefcase,
  Bookmark,
  LogOut,
  User,
  LayoutDashboard,
  ChevronDown,
  Bell,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import moment from "moment";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const { user } = useAuth();
  const getNotifications = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.NOTIFICATIONS.GET_MY_NOTIFICATIONS,
      );

      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const navLinks = [
    { path: "/jobs", label: "Find Jobs" },
    { path: "/dashboard", label: "Dashboard" },
  ];
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";
  const { logout } = useAuth();
  useEffect(() => {
    getNotifications();
  }, []);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 h-20 flex items-center justify-between">
      {/* 1. Left Section */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-cyan-200/50 group-hover:scale-105 transition-transform duration-300">
          <Briefcase size={20} className="stroke-[2.5]" />
        </div>
       
          <span className="text-transparent text-2xl bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Hirely
          </span>
        
      </Link>

      {/* 2. Middle Section */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold relative py-2 transition-colors duration-200 ${
                isActive
                  ? "text-blue-600"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <span>{link.label}</span>
              {isActive && (
                <motion.div
                  layoutId="navUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* 3. Right Section */}
      <div className="flex items-center gap-4 relative">
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="relative p-2 rounded-xl hover:bg-slate-50"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span
                className="
        absolute
        -top-1
        -right-1
        bg-red-500
        text-white
        text-[10px]
        px-1.5
        rounded-full
      "
              >
                {unreadCount}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div
              className="
      absolute
      right-0
      mt-2
      w-96
      bg-white
      border
      border-slate-100
      rounded-2xl
      shadow-xl
      z-[999]
    "
            >
              <div className="p-4 border-b">
                <h3 className="font-bold">Notifications</h3>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-slate-400">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className="p-4 border-b hover:bg-slate-50"
                    >
                      <h4 className="font-semibold text-sm">
                        {notification.title}
                      </h4>

                      <p className="text-xs text-slate-500 mt-1">
                        {notification.message}
                      </p>

                      <p className="text-[11px] text-slate-400 mt-2">
                        {moment(notification.createdAt).fromNow()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <Link
          to="/saved-jobs"
          className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors py-2 px-3 rounded-xl hover:bg-slate-50"
        >
          <Bookmark size={16} />
          <span className="hidden sm:inline">Saved Jobs</span>
        </Link>

        <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-50 border border-slate-100 transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md shadow-cyan-100/60 text-sm">
              {initial}
            </div>
            <span className="text-sm font-bold text-slate-700 max-w-[80px] truncate pl-0.5 hidden sm:inline">
              {user?.name}
            </span>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform duration-200 hidden sm:inline ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </motion.button>

          <AnimatePresence>
            {dropdownOpen && (
              <>
                {/* 🌟 FIXED: Bumped background overlay to z-[100] */}
                <div
                  className="fixed inset-0 z-[100]"
                  onClick={() => setDropdownOpen(false)}
                />

                {/* 🌟 FIXED: Bumped interactive dropdown box to z-[101] */}
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 z-[101]"
                >
                  <div className="px-3 py-2.5 border-b border-slate-50 mb-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Signed in as
                    </p>
                    <p className="text-sm font-bold text-slate-700 truncate">
                      {user?.name}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
                  >
                    <User size={16} />
                    My Profile
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/find-jobs");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </button>

                  <div className="border-t border-slate-50 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl transition-all font-semibold"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
