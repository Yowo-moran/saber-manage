import Request from './request';
const _axios = new Request({
  baseURL: 'http://saber.api.yuleng.top',
  timeout: 3000,
  interceptors: {
    requestInterceptors: (config: any) => {
      return config;
    },
    requestInterceptorsCatch: (err: any) => {
      return err;
    },
    responseInterceptors: (res: any) => {
      return res;
    },
    responseInterceptorsCatch: (err: any) => {
      return err;
    }
  }
});

export { _axios };
