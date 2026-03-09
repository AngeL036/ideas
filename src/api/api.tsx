import axios from "axios";

{/*baseURL:"https://agsa.website/api", */}

const api = axios.create({ 
    baseURL : "http://localhost:8000",
    headers:{
         "Content-Type": "application/json",
    },
    timeout: 8000,
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

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        if (originalRequest.url?.includes("/auth/login")){
            return Promise.reject(error);
        }
        if (!error.response) {
            // Sin respuesta del servidor (timeout, red caída, CORS)
            console.error("Sin respuesta del servidor:", error.code);
            return Promise.reject(error);
        }
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
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