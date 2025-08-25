import axios from "axios";
import {CONFIG} from "./config.ts";
import {useAccountStore} from "../features/auth/store/accountStore.ts";

export const instanceAuth = axios.create({
    baseURL: CONFIG.API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const instance = axios.create({
    baseURL: CONFIG.API_BASE_URL,
})

instance.interceptors.request.use(
    (config) => {
        const {accessToken} = useAccountStore.getState();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers['Content-Type'] = 'application/json'
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const instanceUpload = axios.create({
    baseURL: CONFIG.API_BASE_URL,
})

instanceUpload.interceptors.request.use(
    (config) => {
        const {accessToken} = useAccountStore.getState();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers['Content-Type'] = 'multipart/form-data'
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const {refresh, logout} = useAccountStore.getState();
            const refreshed = await refresh();

            if (refreshed) {
                const {accessToken} = useAccountStore.getState();
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return instance(originalRequest);
            } else {
                logout();
            }
        }

        return Promise.reject(error);
    }
);


