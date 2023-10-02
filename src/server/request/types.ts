import type { InternalAxiosRequestConfig, AxiosResponse,CreateAxiosDefaults } from "axios"

export interface RequestInterceptors<T> {
    requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
    requestInterceptorsCatch?: (err: any) => any;

    responseInterceptors?: <T = AxiosResponse>(config: T) => T;
    responseInterceptorsCatch?: (err: any) => any;
}

export interface RequestConfig<T = InternalAxiosRequestConfig> extends CreateAxiosDefaults {
    interceptors?: RequestInterceptors<T>;
}