import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios';
// Configs
import { apiConfigs } from '../configs';

export interface HttpResponse extends AxiosResponse {};
export interface HttpPromise extends AxiosPromise {};

export const http = axios.create({
    baseURL: apiConfigs.baseUrl,
    timeout: apiConfigs.timeout,
});

// NOTE: Intercepts all requests before they are beng sent and adds a Bearer Token to the headers for Protected Routes
http.interceptors.request.use(
    (configs: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        //configs.headers.Authorization = `Bearer bearerTokenWouldBeSetHere`;

        return configs;
    },
);