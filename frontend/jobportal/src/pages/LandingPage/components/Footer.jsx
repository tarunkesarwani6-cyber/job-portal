import { Briefcase, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-16">

        {/* Main Footer */}
        <div className="flex flex-col items-center text-center">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>

            <h3 className="text-2xl font-bold">
              Hirely 
            </h3>
          </div>

          {/* Description */}
          <p className="text-slate-400 max-w-2xl mb-8">
            Empowering professionals and companies with AI-driven hiring,
            smarter recruitment, and meaningful career growth.
          </p>

          {/* Links */}
          <div className="flex gap-8 mb-10">
            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Home
            </a>

            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Jobs
            </a>

            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Companies
            </a>

            <a
              href="#"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-5 mb-10">
            <a
              href="#"
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 transition"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="#"
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 transition"
            >
              <FaLinkedin size={20} />
            </a>

            <a
              href="#"
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 transition"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800 w-full pt-8">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Hirely. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;