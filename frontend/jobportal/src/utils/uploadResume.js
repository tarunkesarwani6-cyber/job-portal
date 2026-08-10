import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPaths";

const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await axiosInstance.post(
    API_PATHS.AUTH.UPLOAD_RESUME,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export default uploadResume;