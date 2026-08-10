import React from "react";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
}) => {
  // 🎨 Fixed lookup configurations mapping perfectly to premium dashboard styles
  const colorClasses = {
    blue: {
      bg: "bg-blue-50/50 border-blue-100/70 text-blue-700",
      iconContainer: "bg-blue-600 text-white shadow-md shadow-blue-200",
      trendText: "text-blue-600",
    },
    cyan: {
      bg: "bg-cyan-50/50 border-cyan-100/70 text-cyan-700",
      iconContainer: "bg-cyan-500 text-white shadow-md shadow-cyan-200",
      trendText: "text-cyan-600",
    },
    emerald: {
      bg: "bg-emerald-50/50 border-emerald-100/70 text-emerald-700",
      iconContainer: "bg-emerald-500 text-white shadow-md shadow-emerald-200",
      trendText: "text-emerald-600",
    },
    purple: {
      bg: "bg-purple-50/50 border-purple-100/70 text-purple-700",
      iconContainer: "bg-purple-500 text-white shadow-md shadow-purple-200",
      trendText: "text-purple-600",
    }
  };

  // Safe fallback if an undefined color string is passed
  const styles = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-md transition-all duration-200 flex items-center justify-between relative overflow-hidden group`}
    >
      
      {/* Dynamic Background Tint Block on Hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${styles.bg}`} />

      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="space-y-1">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            {title}
          </p>

          <h3 className="text-3xl font-black text-slate-800 tracking-tight">
            {value?.toLocaleString() || 0}
          </h3>

          {trend && (
            <div className={`flex items-center pt-1 text-xs font-bold ${styles.trendText}`}>
              <TrendingUp className="h-3.5 w-3.5 mr-1 stroke-[2.5]" />
              <span>{trendValue} Up today</span>
            </div>
          )}
        </div>

        {/* --- PREMIUM STYLED ICON NODE --- */}
        {Icon && (
          <div className={`p-3.5 rounded-2xl transition-transform duration-300 group-hover:scale-105 ${styles.iconContainer}`}>
            <Icon className="h-5 w-5 stroke-[2.5]" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;