import { Briefcase, Layers, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES, JOB_TYPES } from "../utils/data.js"; 

const FilterContent = ({ jobType, setJobType, category, setCategory }) => {
  
  const handleClearAll = () => {
    setJobType("All");
    setCategory("All");
  };

  const isFiltered = jobType !== "All" || category !== "All";

  return (
    <div className="space-y-6">
      {/* Header Container */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Filters</h3>
        {isFiltered && (
          <button
            onClick={handleClearAll}
            className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} /> Clear
          </button>
        )}
      </div>

      {/* 2. Job Type Dynamic Mapping Segment */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
          <Briefcase size={14} /> Job Type
        </label>
        <div className="flex flex-col gap-1 relative">
          {/* Dynamic 'All' Option */}
          <button
            onClick={() => setJobType("All")}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200 relative isolate ${
              jobType === "All" ? "text-white font-semibold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {jobType === "All" && (
              <motion.div
                layoutId="activeTypeBg"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl -z-10 shadow-md shadow-cyan-200/50"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">All Types</span>
          </button>

          {/* Mapping over imported JOB_TYPES arrays */}
          {JOB_TYPES.map((type) => {
            const isActive = jobType === type.value;
            return (
              <button
                key={type.value}
                onClick={() => setJobType(type.value)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200 relative isolate ${
                  isActive ? "text-white font-semibold" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTypeBg"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl -z-10 shadow-md shadow-cyan-200/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Category Dynamic Mapping Segment with maximum height restriction scroll boundaries */}
      <div className="space-y-2 pt-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
          <Layers size={14} /> Category
        </label>
        
        {/* Custom premium scroll frame bar */}
        <div className="flex flex-col gap-1 relative max-h-[340px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-100">
          
          {/* Dynamic 'All' Option */}
          <button
            onClick={() => setCategory("All")}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200 relative isolate ${
              category === "All" ? "text-white font-semibold" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            {category === "All" && (
              <motion.div
                layoutId="activeCategoryBg"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl -z-10 shadow-md shadow-cyan-200/50"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">All Categories</span>
          </button>

          {/* Mapping over imported CATEGORIES arrays */}
          {CATEGORIES.map((cat) => {
            const isActive = category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200 relative isolate ${
                  isActive ? "text-white font-semibold" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl -z-10 shadow-md shadow-cyan-200/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterContent;