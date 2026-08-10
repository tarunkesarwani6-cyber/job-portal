
const JobCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 w-full flex flex-col justify-between animate-pulse">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            {/* Logo Placeholder */}
            <div className="w-12 h-12 rounded-xl bg-slate-200 flex-shrink-0" />
            <div className="space-y-2 w-32">
              {/* Title Placeholder */}
              <div className="h-4 bg-slate-200 rounded w-full" />
              {/* Company Placeholder */}
              <div className="h-3 bg-slate-200 rounded w-2/3" />
            </div>
          </div>
          <div className="w-8 h-8 bg-slate-100 rounded-xl" />
        </div>
        {/* Badges Placeholder */}
        <div className="flex gap-2 mt-5">
          <div className="h-6 bg-slate-100 rounded-xl w-16" />
          <div className="h-6 bg-slate-100 rounded-xl w-20" />
        </div>
      </div>
      <div>
        <div className="border-t border-slate-100 my-4 pt-4 flex justify-between items-center">
          <div className="space-y-1">
            <div className="h-2 bg-slate-100 rounded w-10" />
            <div className="h-4 bg-slate-200 rounded w-24" />
          </div>
          <div className="w-16 h-8 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
export default JobCardSkeleton;
