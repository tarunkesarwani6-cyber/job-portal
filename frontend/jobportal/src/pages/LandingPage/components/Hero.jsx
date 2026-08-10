import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { Search, ArrowRight, Users, Building2, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
const Hero = () => {
  
    const {user,isAuthenticated} = useAuth();
  const navigate = useNavigate();
const headingX = useMotionValue(0);
const headingY = useMotionValue(0);

const handleHeadingMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();

  headingX.set(e.clientX - rect.left);
  headingY.set(e.clientY - rect.top);
};
  const stats = [
    {
      icon: Users,
      label: "Active Users",
      value: "170K+",
    },
    {
      icon: Building2,
      label: "Companies",
      value: "5K+",
    },
    {
      icon: TrendingUp,
      label: "Jobs Posted",
      value: "10K+",
    },
  ];
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-slate-50 via-white to-cyan-50 min-h-screen flex items-center relative overflow-hidden">
      {" "}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
         <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  onMouseMove={handleHeadingMove}
  className="relative inline-block mb-6"
>
  {/* Base Heading */}
  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
    Where Talent Meets Opportunity
    <span className="block">
      Build Your Future
    </span>
  </h1>

  {/* Cursor Glow Heading */}
  <motion.h1
    className="
      absolute
      inset-0
      pointer-events-none
      text-4xl
      md:text-6xl
      font-black
      leading-tight
      text-transparent
      bg-clip-text
    "
    style={{
      backgroundImage: useMotionTemplate`
        radial-gradient(
          150px circle at ${headingX}px ${headingY}px,
          #06b6d4,
          #3b82f6,
          #10b981,
          transparent
        )
      `,
    }}
  >
    Where Talent Meets Opportunity
    <span className="block">
      Build Your Future
    </span>
  </motion.h1>
  <motion.div
  animate={{
    scale: [1, 1.1, 1],
  }}
  transition={{
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="
    absolute
    left-1/2
    top-20
    -translate-x-1/2
    w-[500px]
    h-[500px]
    bg-cyan-300/10
    blur-[120px]
    rounded-full
    -z-10
  "
/>
</motion.div>
          {/* subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Discover top companies, connect with the right opportunities, and
            accelerate your career with Hirely
          </motion.p>

          {/* cta buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ dealy: 0.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:via-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
              onClick={() => {
  if (!isAuthenticated) {
    navigate("/login");
  } else if (user?.role === "employer") {
    navigate("/employer-dashboard");
  } else {
    navigate("/find-jobs");
  }
}}
            >
              <Search className="w-5 h-5" />
              <span>Find Jobs</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-cyan-200 bg-white text-slate-800 px-8 py-4 rounded-xl font-semibold hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-300"
              onClick={() => {
                navigate(
                  isAuthenticated && user?.user?.role === "employer"
                    ? "/employer-dashboard"
                    : "/login",
                );
              }}
            >
              Post a Job
            </motion.button>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.6,
                }}
                className="flex flex-col items-center justify-center space-y-2 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl shadow-slate-100 border border-cyan-100 hover:border-cyan-300 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>

                <div className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </div>

                <div className="text-sm font-medium text-gray-600 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* subtle background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
  animate={{
    x: [0, 80, 0],
    y: [0, -50, 0],
  }}
  transition={{
    duration: 15,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20"
/>
        <div className="absolute top-40 right-10 w-80 h-80 bg-cyan-200 rounded-full blur-3xl opacity-20"></div>

        <div className="absolute top-1/2 left-0.5 transform-translate-x-1/2 -translate-0.5 w-96 h-96 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-full blur-3xl opacity-20"></div>
      </div>
    </section>
  );
};

export default Hero;
