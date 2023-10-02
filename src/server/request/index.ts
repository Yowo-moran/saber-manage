import axios from "axios"
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestConfig, RequestInterceptors } from './types'

class Request {
    instance: AxiosInstance;
    interceptors?: RequestInterceptors<AxiosResponse>
    constructor(config: RequestConfig) {
        this.instance = axios.create(config);

        if (window.localStorage.getItem('token')) {
            this.instance.defaults.headers.common['Authorization'] =
                window.localStorage.getItem('token');
        }
        
        this.instance.interceptors.request.use(
            (res: InternalAxiosRequestConfig) => {
                return res;
            },
            (err: any) => err
        )

        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptors,
            this.interceptors?.requestInterceptorsCatch,
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptors,
            this.interceptors?.responseInterceptorsCatch,
        )

        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                return res.data;
            },
            (err: any) => err
        )
    }

    request<T>(config: RequestConfig): Promise<T> {
        return new Promise((resolve, reject) => {
            if (config.interceptors?.requestInterceptors) {
                config = config.interceptors.requestInterceptors(config as any)
            }
            this.instance.request<any, T>(config as any).then(res => {
                if (config.interceptors?.responseInterceptors) {
                    res = config.interceptors.responseInterceptors<T>(res)
                }
                resolve(res)
            })
                .catch((err: any) => {
                    reject(err)
                })
        })
    }
    get<T, D>(url: string, params?: D, config = {}): Promise<T> {
        return this.request<T>({
            url,
            params,
            method: 'GET',
            ...config
        });
    }
}

export default Request;