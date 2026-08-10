import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { Building2, Globe, FileText, UploadCloud, ArrowLeft, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const EditProfileDetails = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_ME);
      const user = response.data;

      setCompanyName(user.companyName || "");
      setCompanyWebsite(user.companyWebsite || "");
      setCompanyDescription(user.companyDescription || "");
      setCompanyLogo(user.companyLogo || "");
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch profile details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const uploadLogo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const loadToast = toast.loading("Uploading company logo...");
    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setCompanyLogo(response.data.imageUrl);
      toast.success("Logo uploaded successfully", { id: loadToast });
    } catch (error) {
      console.log(error);
      toast.error("Logo upload failed", { id: loadToast });
    }
  };

  const handleSave = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      setIsSaving(true);
      await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, {
        companyName,
        companyWebsite,
        companyDescription,
        companyLogo,
      });

      toast.success("Profile Updated");
      navigate("/company-profile"); // Redirect back to profile page on successful save
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout activeMenu="company-profile">
      <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
        
        {/* --- BACK NAVIGATION HEADER --- */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Cancel and Go Back
        </button>

        {/* --- MAIN INTERACTIVE CARD --- */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.01)] space-y-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Edit Company Profile</h1>
            <p className="text-slate-400 text-sm font-medium mt-1">
              Update your organization's public brand details, description, and links.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
              <Loader2 size={24} className="animate-spin text-blue-600" />
              <p className="text-xs font-semibold uppercase tracking-wider">Loading profile data...</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Company Name Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Company Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Amazon, Google"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-400 text-sm font-medium text-slate-700 placeholder-slate-400 rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Company Website Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Company Website URL
                </label>
                <div className="relative">
                  <Globe size={16} className="absolute left-4 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. https://www.company.com"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-400 text-sm font-medium text-slate-700 placeholder-slate-400 rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Company Description Field */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Company Description
                </label>
                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-3.5 text-slate-400" />
                  <textarea
                    placeholder="Tell candidates about your company's mission, values, and workspace environment..."
                    value={companyDescription}
                    onChange={(e) => setCompanyDescription(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-cyan-400 text-sm font-medium text-slate-700 placeholder-slate-400 rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* --- PREMIUM BRAND LOGO DROPZONE --- */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Company Logo
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  
                  {/* Upload Label Frame */}
                  <label className="md:col-span-2 border-2 border-dashed border-slate-200 hover:border-cyan-400 bg-slate-50/50 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                    <UploadCloud size={24} className="text-slate-400 group-hover:text-cyan-500 transition-colors mb-1.5" />
                    <p className="text-xs font-bold text-slate-700">Click to upload company logo</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">Square PNG or JPG images preferred</p>
                    <input type="file" accept="image/*" className="hidden" onChange={uploadLogo} />
                  </label>

                  {/* Dynamic Logo Image Live Rendering Box */}
                  <div className="flex justify-center md:justify-start">
                    {companyLogo ? (
                      <div className="relative group/logo w-24 h-24 rounded-2xl border border-slate-200 p-2 bg-white flex items-center justify-center shadow-inner">
                        <img
                          src={companyLogo}
                          alt="Live logo preview"
                          className="max-w-full max-h-full object-contain rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-slate-300 text-center p-2 text-[10px] font-bold uppercase tracking-wider">
                        No Logo
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* --- ACTION CTA ACTION BUTTON --- */}
              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={isSaving}
                  onClick={handleSave}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-sm shadow-md shadow-cyan-100/50 transition flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      Save Profile Changes
                    </>
                  )}
                </motion.button>
              </div>

            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default EditProfileDetails;