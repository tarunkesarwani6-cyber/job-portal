import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
const Header = () => {
  const {user,isAuthenticated} = useAuth();
  const navigate = useNavigate();
  return (
    <motion.header
  initial={{ y: -80, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{
    duration: 0.8,
    ease: "easeOut"
  }}
  className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 border-b border-cyan-100"
>
  <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200">
              {" "}
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              {" "}
              Hirely
            </span>
          </div>
          {/* navigation links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              onClick={() => navigate("/find-jobs")}
              className="text-slate-600 hover:text-cyan-600 transition-all duration-300 font-medium cursor-pointer"
            >
              Find Jobs
            </a>
            <a
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              onClick={() => {
                navigate(
                  isAuthenticated && user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login",
                );
              }}
            >
              For Employers
            </a>
          </nav>
          {/* auth buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-slate-600 font-medium">
                  Welcome,{user?.name}
                  <span className="text-cyan-600">{user?.fullName}</span>
                </span>
                <a
                  href={
                    user?.role === "employer"
                      ? "/employer-dashboard"
                      : "/find-jobs"
                  }
                  className="
bg-gradient-to-r
from-blue-600
via-cyan-500
to-emerald-500
text-white
rounded-xl
px-6
py-2.5
font-semibold
transition-all
duration-300
hover:scale-105
hover:shadow-lg
hover:shadow-cyan-200
"
                >
                  Dashboard
                </a>
              </div>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-4"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-lg px-6 py-2 font-medium hover:from-blue-600 hover:via-cyan-500 hover:to-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
