// service的统一出口
import HRRequest from "./request"
import { BASE_URL, TIME_OUT } from "./config"

export default new HRRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptor: {
    requestInterceptor: (config) => {

      // 携带token的拦截
      /**
       * token一般存储在状态管理工具内，或者localStorage或者sessionStorage中
       * 这里以localStorage为例
       */
      const token = localStorage.getItem("token") || '';
      
      if(token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log('单个实例请求成功的拦截');
      return config
    },
    requestCatchInterceptor: (error) => {
      console.log('单个实例请求失败的拦截');
      return error
    },
    responseInterceptor: (response) => {
      console.log('单个实例响应成功的拦截');
      return response;
    },
    responseCatchInterceptor: (error) => {
      console.log('单个实例响应失败的拦截');
      return error;
    }
  }
});