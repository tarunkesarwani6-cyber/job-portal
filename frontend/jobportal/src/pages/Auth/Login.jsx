import React, { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Loader, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formState, setFormState] = useState({
    loading: false,
    showPassword: false,
    errors: {},
    success: false,
  });
  const navigate = useNavigate();
  const { login,user } = useAuth();
 useEffect(() => {
  if (formState.success) {
    const timer = setTimeout(() => {
      navigate(
        user?.role === "employer"
          ? "/employer-dashboard"
          : "/find-jobs"
      );
    }, 2500);

    return () => clearTimeout(timer);
  }
}, [formState.success, user, navigate]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: "" },
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    return errors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const errors = validateForm();

  if (Object.keys(errors).length > 0) {
    setFormState((prev) => ({
      ...prev,
      errors,
    }));
    return;
  }

  setFormState((prev) => ({
    ...prev,
    loading: true,
    errors: {},
  }));

  try {
    console.log("Submitting login");
    console.log(formData);

    const response = await axiosInstance.post(
      API_PATHS.AUTH.LOGIN,
      {
        email: formData.email,
        password: formData.password,
      }
    );
console.log(response.data);
    const token = response.data.token;

    login(response.data.user, token);

    setFormState((prev) => ({
      ...prev,
      loading: false,
      success: true,
      errors: {},
      
    }));
  } catch (error) {
    setFormState((prev) => ({
      ...prev,
      loading: false,
      errors: {
        submit:
          error?.response?.data?.message ||
          "Login failed. Please check your credentials.",
      },
      
    }));
  }
};

if (formState.success) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-cyan-50 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full text-center"
          >
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />

            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Welcome Back!
            </h2>

            <p className="text-slate-600 mb-6">
              You have been successfully logged in.
            </p>

            {/* Loading Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2 }}
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500"
              />
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Redirecting to your dashboard...
            </p>
          </motion.div>
        </div>
      );
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
      >
        {" "}
        <div className="text-center mb-8">
          {" "}
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back </h2>
          <p className="text-slate-600 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-300
            ${formState.errors.email ? "border-red-500" : "border-slate-300"}
            focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
              />
            </div>

            {formState.errors.email && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle size={16} />
                {formState.errors.email}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

              <input
                type={formState.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-all duration-300
            ${formState.errors.password ? "border-red-500" : "border-slate-300"}
            focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
              />

              <button
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    showPassword: !prev.showPassword,
                  }))
                }
                className="absolute right-3 top-3"
              >
                {formState.showPassword ? (
                  <EyeOff className="w-5 h-5 text-slate-500" />
                ) : (
                  <Eye className="w-5 h-5 text-slate-500" />
                )}
              </button>
            </div>

            {formState.errors.password && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <AlertCircle size={16} />
                {formState.errors.password}
              </p>
            )}
          </div>
{formState.errors.submit && (
  <p className="text-red-500 text-sm flex items-center gap-1">
    <AlertCircle size={16} />
    {formState.errors.submit}
  </p>
)}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 hover:shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            {formState.loading ? (
              <Loader className="animate-spin w-5 h-5" />
            ) : (
              "Sign In"
            )}
            
          </button>
          <div className="mt-6 text-center">
            <p className="text-slate-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent hover:opacity-80 transition-all duration-300"
              >
                Create one
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
