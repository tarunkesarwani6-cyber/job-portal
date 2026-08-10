import { Search, MapPin, Sparkles } from "lucide-react";

const SearchHeader = ({ searchTerm, setSearchTerm, location, setLocation }) => {
  return (
    <div className="relative bg-white rounded-3xl overflow-hidden p-8 md:p-10 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] mb-10">
      {/* Soft gradient blobs matching image_75aa5d.png */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-cyan-300/10 to-blue-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-3xl">
        
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Dream Job</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base mt-2 font-medium">
          Discover opportunities that match your true passion and unlock your future.
        </p>
      </div>

      {/* Integrated Search Capsule */}
      <div className="mt-8 bg-white p-2 rounded-2xl md:rounded-full shadow-lg flex flex-col md:flex-row gap-2 items-stretch border border-slate-100 focus-within:border-cyan-300 transition-all duration-300">
        
        {/* Keyword Search */}
        <div className="flex-1 relative flex items-center">
          <Search size={20} className="absolute left-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Job title, company, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="hidden md:block w-px bg-slate-100 my-2"></div>

        {/* Location Search */}
        <div className="w-full md:w-64 relative flex items-center">
          <MapPin size={20} className="absolute left-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Cyan/Blue Gradient Button matching image_75aa5d.png */}
        <button className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-95 text-white rounded-xl md:rounded-full font-semibold text-sm transition-all duration-300 shadow-md shadow-cyan-100 flex items-center justify-center gap-2">
          <Search size={16} />
          Search Jobs
        </button>
      </div>
    </div>
  );
};

export default SearchHeader;