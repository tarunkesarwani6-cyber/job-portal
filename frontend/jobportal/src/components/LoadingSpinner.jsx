import React from "react";
import { Briefcase } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center">
        
        {/* Spinner */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="animate-spin rounded-full h-24 w-24 border-4 border-blue-100 border-t-blue-600"></div>

          <div className="absolute inset-0 flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        {/* Text */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Loading Dashboard
        </h3>

        <p className="text-gray-500 font-medium">
          Finding amazing opportunities...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;