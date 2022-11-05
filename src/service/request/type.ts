import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface HRRequestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestCatchInterceptor?: (error: any) => any;
  responseInterceptor?: (response: T) => T;
  responseCatchInterceptor?: (error: any) => any;
}

export interface HRRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: HRRequestInterceptor<T>;
  showLoading?: boolean;
}