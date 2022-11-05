/**
 * 用于获取当前的环境变量
 * 根据当前环境导出与环境有关的各种变量
 */
const ENV = process.env.NODE_ENV || 'development';
let BASE_URL = 'http://httpbin.org';
let BASE_API = 'http://httpbin.org';
const TIME_OUT = 10000;

if(ENV === 'development'){
  BASE_URL = 'http://httpbin.org';
  BASE_API = 'http://httpbin.org';
}else {
  BASE_URL = 'http://example.prod.com';
  BASE_API = 'http://example.prod.com/api';
}

export { BASE_URL, BASE_API, TIME_OUT };