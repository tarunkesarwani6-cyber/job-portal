import { MapPin, Clock, DollarSign, ArrowLeft, Briefcase } from "lucide-react";
import JobCard from "./JobCard";

const JobPostingPreview = ({ formData, setIsPreview, handleSubmit }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Job Preview</h1>

          <button
            onClick={() => setIsPreview(false)}
            className="flex items-center gap-2 px-5 py-3 border rounded-xl hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Edit
          </button>
        </div>

        {/* Top Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              {formData.jobTitle}
            </h2>

            <div className="flex items-center text-gray-500 mb-5">
              <MapPin className="h-4 w-4 mr-2" />
              {formData.location}
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                {formData.category}
              </span>

              <span className="px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                {formData.jobType}
              </span>

              <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Posted Today
              </span>
            </div>
          </div>

          {/* Company Placeholder */}
          <div className="h-24 w-24 rounded-2xl border flex items-center justify-center bg-gray-50">
            <Briefcase className="h-10 w-10 text-gray-400" />
          </div>
        </div>

        {/* Salary Card */}
        <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500 text-white p-4 rounded-xl">
                <DollarSign className="h-6 w-6" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Compensation</p>

                <h3 className="text-2xl font-bold text-gray-900">
                  ₹{formData.salaryMin} - ₹{formData.salaryMax}
                </h3>
              </div>
            </div>

            <div className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              Competitive
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Job Description</h3>

          <div className="bg-gray-50 p-5 rounded-xl">
            {formData.description}
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Requirements</h3>

          <div className="bg-gray-50 p-5 rounded-xl">
            {formData.requirements}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            onClick={() => setIsPreview(false)}
            className="px-6 py-3 border rounded-xl hover:bg-gray-50"
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Publish Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostingPreview;
