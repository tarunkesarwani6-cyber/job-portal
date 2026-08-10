import React from "react";
import { employerFeatures, jobSeekerFeatures } from "../../../utils/data";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
const Features = () => {
    const navigate = useNavigate();
const headingX = useMotionValue(0);
const headingY = useMotionValue(0);

const handleHeadingMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();

  headingX.set(e.clientX - rect.left);
  headingY.set(e.clientY - rect.top);
};
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  onMouseMove={handleHeadingMove}
  className="relative inline-block mb-6"
>
  {/* Base Heading */}
  <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
    Everything You Need 
    <span className="block">
      To Succeed
    </span>
  </h1>

  {/* Cursor Glow Heading */}
  <motion.h1
    className="
      absolute
      inset-0
      pointer-events-none
      text-3xl
      md:text-4xl
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
    Everything You Need
    <span className="block">
      To Succeed
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
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Whether you're looking for your next opportunity or the perfect
            candidate, we have the tools and AI-powered features to help you succeed.
          </p>
        </div>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Job Seekers */}
          <div>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                For Job Seekers
              </h3>

              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-6">
              {jobSeekerFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-2">
                        {feature.title}
                      </h4>

                      <p className="text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Employers */}
          <div>
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                For Employers
              </h3>

              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-6">
              {employerFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="bg-white p-6 rounded-2xl border border-cyan-100 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-2">
                        {feature.title}
                      </h4>

                      <p className="text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;