import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshToken } from '../features/auth/authThunks';
import { logout } from '../features/auth/authSlice';
import store from '../app/store';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getAccessToken = (): string | null => localStorage.getItem('accessToken');
const getRefreshToken = (): string | null => localStorage.getItem('refreshToken');

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void, reject: (reason?: AxiosError | null) => void }> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

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
            if (originalRequest.url?.includes('/auth/refresh')) {
                store.dispatch(logout());
                return Promise.reject(error);
            }

            if (originalRequest.url?.includes('/auth/login')) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    }
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshTokenValue = getRefreshToken();

            if (refreshTokenValue) {
                try {
                    const response = await store.dispatch(refreshToken() as any);
                    const { accessToken } = response.payload;

                    localStorage.setItem('accessToken', accessToken);
                    processQueue(null, accessToken);

                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    }
                    return axiosInstance(originalRequest);
                } catch (err: any) {
                    processQueue(err as AxiosError, null);
                    store.dispatch(logout());
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            } else {
                store.dispatch(logout());
                isRefreshing = false;
                processQueue(new AxiosError('Refresh token expired'), null);
                return Promise.reject(new AxiosError('Refresh token expired'));
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
