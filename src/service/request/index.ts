import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { HRRequestInterceptor, HRRequestConfig } from './type';

const DEFAULT_LOADING = false;

class HRRequest {
  instance: AxiosInstance;

  interceptor?: HRRequestInterceptor;

  showLoading: boolean;

  constructor(config: HRRequestConfig) {
    this.instance = axios.create(config);
    // Loading效果默认显示
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    this.interceptor = config.interceptor;

    // 公共的拦截器——所有的实例都会有的拦截器
    this.instance.interceptors.request.use(
      config => {
        console.log('所有的实例都会有的拦截器: 请求成功的拦截');

        // loading效果
        if (this.showLoading) {
          // TODO...
        }

        return config;
      },
      error => {
        console.log('所有的实例都会有的拦截器: 请求失败的拦截');
        return error;
      }
    );

    this.instance.interceptors.response.use(
      response => {
        console.log('所有的实例都会有的拦截器: 响应成功的拦截');

        // 将loading效果关闭
        // TODO...

        const data = response.data;
        if (data.code !== 0) {
          console.log('请求失败');
          switch (data.code) {
            case -1:
              // TODO...
              break;
            default:
            // TODO...
          }
        }

        // return response;
        return data;
      },
      error => {
        console.log('所有的实例都会有的拦截器: 响应失败的拦截');

        // 将loading效果关闭
        // TODO...

        /**
         * 请求本身出错
         * 响应失败的拦截——HTTP状态码不是2xx时，会触发。
         * error的数据类型和服务器的设计有关系，需要配合服务器设计的返回值结构进行编码
         * 这里需要进行统一的错误处理，建议使用antd或者Element-plus的message组件进行提示
         */

        const statusCode = error.response.status;
        switch (statusCode) {
          case 401:
            // 401错误，token过期，需要重新登录，直接跳到登录页。
            // TODO...
            break;
          case 404:
            console.log('404');
            break;
          default:
            console.log('default');
        }

        // TODO...
        return error;
      }
    );

    // 实例的拦截器——从config中获取的拦截器
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestCatchInterceptor
    );

    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseCatchInterceptor
    );
  }

  request<T>(config: HRRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptor?.requestInterceptor) {
        config = config.interceptor.requestInterceptor(config);
      }

      if (config.showLoading) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptor?.responseInterceptor) {
            res = config.interceptor.responseInterceptor(res);
          }

          // 请求结束后showLoading置为默认值
          this.showLoading = DEFAULT_LOADING;

          resolve(res);
        })
        .catch(err => {
          // 请求结束后showLoading置为默认值
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }

  get<T>(config: HRRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T>(config: HRRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T>(config: HRRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T>(config: HRRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }
}

export default HRRequest;
