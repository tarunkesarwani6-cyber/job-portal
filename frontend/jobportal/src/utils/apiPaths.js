export const BASE_URL = "http://127.0.0.1:8000";
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_ME: "/api/auth/me",
        UPLOAD_IMAGE: "/api/auth/upload-image",
        UPLOAD_RESUME: "/api/auth/upload-resume",
    },

    USER: {
        UPDATE_PROFILE: "/api/user/profile",
        DELETE_RESUME: "/api/user/resume",
        GET_PROFILE: (id) => `/api/user/${id}`,
    },

    JOBS: {
        CREATE_JOB: "/api/jobs",
        GET_JOBS: "/api/jobs",

        GET_JOB_BY_ID: (id) => `/api/jobs/${id}`,

        UPDATE_JOB: (id) => `/api/jobs/${id}`,

        DELETE_JOB: (id) => `/api/jobs/${id}`,

        TOGGLE_CLOSE_JOB: (id) =>
            `/api/jobs/${id}/toggle-close`,

        GET_EMPLOYER_JOBS:
            "/api/jobs/get-jobs-employer",
    },

    APPLICATIONS: {
        APPLY_TO_JOB: (jobId) =>
            `/api/application/${jobId}`,

        GET_MY_APPLICATIONS:
            "/api/application/my",

        GET_ALL_APPLICATIONS: (jobId) =>
            `/api/application/job/${jobId}`,

        GET_APPLICATION_BY_ID: (id) =>
            `/api/application/${id}`,

        UPDATE_STATUS: (id) =>
            `/api/application/${id}/status`,
    },

    SAVED_JOBS: {
        SAVE_JOB: (jobId) =>
            `/api/saved/${jobId}`,

        UNSAVE_JOB: (jobId) =>
            `/api/saved/${jobId}`,

        GET_SAVED_JOBS:
            "/api/saved/my",
    },

    ANALYTICS: {
        GET_EMPLOYER_ANALYTICS:
            "/api/analytics/employer",
    },
    NOTIFICATIONS: {
  GET_MY_NOTIFICATIONS:
    "/api/notifications/my",

  MARK_ALL_READ:
    "/api/notifications/read-all",
},
};