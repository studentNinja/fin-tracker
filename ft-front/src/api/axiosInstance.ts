import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshToken } from '../features/auth/authThunks';
import { logout } from '../features/auth/authSlice';
import store from '../app/store';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Utility function to get the token from local storage
const getAccessToken = (): string | null => localStorage.getItem('accessToken');
const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken();
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshTokenValue = getRefreshToken();

            if (refreshTokenValue) {
                try {
                    const response = await store.dispatch(refreshToken() as any);
                    const { accessToken } = response.payload;

                    // Update the access token in local storage
                    localStorage.setItem('accessToken', accessToken);

                    // Retry the original request with the new access token
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    }
                    return axiosInstance(originalRequest);
                } catch (err) {
                    // If refresh token is invalid, logout the user
                    store.dispatch(logout());
                    return Promise.reject(err);
                }
            } else {
                // If no refresh token is available, logout the user
                store.dispatch(logout());
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
