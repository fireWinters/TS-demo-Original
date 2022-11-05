import hrRequest from '@service/index';

interface DataType {
  args: any;
  headers: any;
  origin: string;
  url: string;
}

hrRequest.request<DataType>({
  url: '/get',
  params: {
    name: 'cuihaoran',
    methord: 'GET',
  },
  interceptor: {
    requestInterceptor: (config) => {
      console.log('单个请求方法请求的拦截器：', config);
      return config;
    },
    responseInterceptor: (response) => {
      console.log('单个请求方法响应的拦截器：', response);
      return response;
    }
  }
}).then((res) => {
  console.log(res.args);
  console.log(res.headers);
  console.log(res.origin);
  console.log(res.url);
}).catch((err) => {

})