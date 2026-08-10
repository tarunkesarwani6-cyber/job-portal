import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const EditProfile = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [experience, setExperience] = useState(
    user?.experience || ""
  );
  const [skills, setSkills] = useState(
    user?.skills?.join(", ") || ""
  );
  const [resume, setResume] = useState(
    user?.resume || ""
  );

  // Upload Avatar
  const uploadAvatar = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setAvatar(response.data.imageUrl);

      toast.success("Avatar Uploaded");
    } catch (error) {
      toast.error("Upload Failed");
    }
  };

  // Upload Resume
  const uploadResume = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.UPLOAD_RESUME,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setResume(response.data.resumeUrl);

      toast.success("Resume Uploaded");
    } catch (error) {
      toast.error("Resume Upload Failed");
    }
  };

  const saveProfile = async () => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.USER.UPDATE_PROFILE,
        {
          name,
          avatar,
          experience,
          skills: skills
            .split(",")
            .map((s) => s.trim()),
          resume,
        }
      );

      updateUser(response.data);

      toast.success("Profile Updated");
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        {/* Avatar */}
        <div className="flex items-center gap-6 mb-8">
          <img
            src={
              avatar ||
              `https://ui-avatars.com/api/?name=${name}`
            }
            alt=""
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-100"
          />

          <div>
            <label className="px-5 py-3 bg-blue-600 text-white rounded-xl cursor-pointer">
              Upload Avatar
              <input
                type="file"
                className="hidden"
                onChange={uploadAvatar}
              />
            </label>
          </div>
        </div>

        {/* Name */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Experience */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Experience
          </label>

          <input
            type="text"
            value={experience}
            onChange={(e) =>
              setExperience(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Skills */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Skills
          </label>

          <textarea
            rows={4}
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
            placeholder="React, Node.js, MongoDB..."
            className="w-full border rounded-xl p-3"
          />
        </div>

        {/* Resume */}
        <div className="mb-8">
          <label className="block mb-2 font-medium">
            Resume
          </label>

          <div className="flex items-center gap-4">
            <label className="px-5 py-3 bg-gray-100 rounded-xl cursor-pointer">
              Upload Resume
              <input
                type="file"
                className="hidden"
                onChange={uploadResume}
              />
            </label>

            {resume && (
              <span className="text-green-600 font-medium">
                Resume Uploaded ✓
              </span>
            )}
          </div>
        </div>

        <button
          onClick={saveProfile}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-semibold text-lg hover:opacity-90 transition"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
};

export default EditProfile;