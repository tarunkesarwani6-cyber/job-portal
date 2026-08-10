import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Briefcase,
  Target,
} from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      icon: Users,
      title: "Active Users",
      value: "170K+",
      growth: "+15%",
      color: "cyan",
    },
    {
      icon: Briefcase,
      title: "Jobs Posted",
      value: "10K+",
      growth: "+22%",
      color: "blue",
    },
    {
      icon: Target,
      title: "Successful Hires",
      value: "89K+",
      growth: "+18%",
      color: "emerald",
    },
    {
      icon: TrendingUp,
      title: "Match Rate",
      value: "94%",
      growth: "+8%",
      color: "orange",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Platform
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              {" "}Analytics
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real-time insights and performance metrics showcasing the growth
            of our AI-powered hiring ecosystem.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-6">
                <div
                  className="
                  w-12 h-12
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  via-cyan-500
                  to-emerald-500
                  flex items-center justify-center
                "
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>

                <span className="text-green-600 font-semibold text-sm">
                  {stat.growth}
                </span>
              </div>

              <h3 className="text-4xl font-bold text-slate-900 mb-2">
                {stat.value}
              </h3>

              <p className="text-slate-600">
                {stat.title}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Analytics;