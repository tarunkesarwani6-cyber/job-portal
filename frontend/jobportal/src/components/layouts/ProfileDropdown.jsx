import React from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  userRole,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
      >
        {avatar ? (
          <img
            src={avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-semibold">
              {companyName?.charAt(0)?.toUpperCase()}
            </span>
          </div>
        )}

        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-gray-900">
            {companyName}
          </p>

          <p className="text-xs text-gray-500">
  {userRole === "jobseeker"
    ? "Job Seeker"
    : "Employer"}
</p>
        </div>

        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {companyName}
            </p>

            <p className="text-xs text-gray-500">
              {email}
            </p>
          </div>

          <button
            onClick={() =>
              navigate(
                userRole === "jobseeker"
                  ? "/profile"
                  : "/company-profile"
              )
            }
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            View Profile
          </button>

          <div className="border-t border-gray-100">
            <button
              onClick={onLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;