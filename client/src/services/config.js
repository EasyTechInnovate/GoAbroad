import axios from 'axios';
import { getToken, logout } from '@/lib/auth';

const baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

if (!baseURL) {
    console.warn('VITE_SERVER_URL is not defined in the environment variables, using default localhost.');
}

const servicesAxiosInstance = axios.create({
    baseURL: baseURL
});

servicesAxiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

servicesAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log('Authentication error: Token expired or invalid');
            logout();
            window.location.href = '/login?expired=true';
        }
        return Promise.reject(error);
    }
);

export {
    servicesAxiosInstance
};
