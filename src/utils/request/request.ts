import axios from 'axios';
import {errorCodeType} from './errorCode.ts';

// 创建axios实例
const request = axios.create({
  // 服务接口请求
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时设置
  // timeout: 15000,
  headers: {'Content-Type': 'application/json;charset=utf-8'}
})


// 请求拦截
request.interceptors.request.use(config => {
  console.log("请求" + config.baseURL + config.url + '，参数：' + config.params + '请求体：' + config.data)
  console.log(config)
  // 是否需要设置 token放在请求头
  // config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // get请求映射params参数
  // if (config.method === 'get' && config.params) {
  //   let url = config.url + '?';
  //   for (const propName of Object.keys(config.params)) {
  //     const value = config.params[propName];
  //     var part = encodeURIComponent(propName) + "=";
  //     if (value !== null && typeof (value) !== "undefined") {
  //       // 对象处理
  //       if (typeof value === 'object') {
  //         for (const key of Object.keys(value)) {
  //           let params = propName + '[' + key + ']';
  //           var subPart = encodeURIComponent(params) + "=";
  //           url += subPart + encodeURIComponent(value[key]) + "&";
  //         }
  //       } else {
  //         url += part + encodeURIComponent(value) + "&";
  //       }
  //     }
  //   }
  //   url = url.slice(0, -1);
  //   config.params = {};
  //   config.url = url;
  // }
  return config
}, error => {
  console.error(error)
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((res: any) => {
    console.log('响应', res)
    // 未设置状态码则默认成功状态
    const code = res.data['code'] || 200;
    // 获取错误信息
    const msg = errorCodeType(code) || res.data['msg'] || errorCodeType('default')
    if (code === 200) {
      return Promise.resolve(res.data)
    } else {
      console.error(msg)
      // message.error(msg) todo
      return Promise.reject(res.data)
    }
  },
  error => {
    console.error(error)
    let {msg} = error;
    if (msg == "Network Error") {
      msg = "后端接口连接异常";
    } else if (msg.includes("timeout")) {
      msg = "系统接口请求超时";
    } else if (msg.includes("Request failed with status code")) {
      msg = "系统接口" + msg.substr(msg.length - 3) + "异常";
    }
    // message.error(msg) todo
    return Promise.reject(error)
  }
)

export default request;
