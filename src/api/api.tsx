import axios from "axios";

{/* baseURL:"/api",*/}
const api = axios.create({ 
    baseURL : "http://localhost:8000",
    headers:{
         "Content-Type": "application/json",
    },
});

// attach access token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// response interceptor: try refresh on 401 or redirect to login
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const tryRefreshToken = async (): Promise<string | null> => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    try {
        const res = await axios.post("/auth/refresh", { refresh_token: refreshToken });
        const newToken = res.data?.access_token ?? res.data?.token ?? null;
        if (newToken) {
            localStorage.setItem("token", newToken);
            return newToken;
        }
        return null;
    } catch (err) {
        return null;
    }
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        // only handle 401 once per request
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                refreshPromise = tryRefreshToken();
            }

            const newToken = await refreshPromise;
            isRefreshing = false;
            refreshPromise = null;

            if (newToken) {
                // update header and retry original request
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            }

            // no refresh possible -> clear storage and redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("user");
            // hard redirect to login page
            window.location.href = "/login";
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default api