import axios, { AxiosError, AxiosRequestConfig } from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJiaGF2ZGVlcCIsImlhdCI6MTc3MjEwMDY2NCwiZXhwIjoxNzcyMTA0MjY0fQ.e6asdN4LLOxL7bOuVFbf7SrSCaCYtSXdo8LmOek0vp8"

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean
}

// never modify global axios direclty create your own axios instance
const axiosInstance = axios.create({
    withCredentials: true // for refresh token
})

axiosInstance.interceptors.request.use((config) => {
    console.log('axios interceptor before request!');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => { return Promise.reject(error) })

axiosInstance.interceptors.response.use(
    (response) => { return response },
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryAxiosRequestConfig;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // const response = await axiosInstance.post('/auth/refresh');
                // const newAccessToken = response.data.accessToken;
                // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                // return axiosInstance(originalRequest);
            } catch (tokenRefreshError) {
                console.error('tokenRefreshError', tokenRefreshError);
                return Promise.reject(tokenRefreshError);
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance