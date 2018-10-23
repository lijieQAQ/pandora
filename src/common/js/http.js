import axios from 'axios'

/**
 * http配置
 */
const baseUrl = 'localhost'

const instance = axios.create({
  timeout: 10000,
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// http request 拦截器
instance.interceptors.request.use(
  config => {
    // POST传参序列化
    if (config.url.indexOf('http') < 0) {
      config.url = baseUrl + config.url
    }
    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
instance.interceptors.response.use(
  response => {
    // token 过期或者其他情况的判断
    // if (response.data.code === -1) {
    //   localStorage.removeItem('token')
    //   router.replace({
    //     path: 'login',
    //     query: { redirect: router.currentRoute.fullPath }
    //   })
    // }else{
    //   return response
    // }

    // 返回响应时做一些处理，我们这里直接返回
    return response
  },
  error => {
    // if (error.response) {
    //   switch (error.response.status) {
    //     case 401:
    //       // 返回 401 清除token信息并跳转到登录页面
    //       localStorage.removeItem('token')
    //       router.replace({
    //         path: 'login',
    //         query: { redirect: router.currentRoute.fullPath }
    //       })
    //   }
    // }
    // 当响应异常时做一些处理
    return Promise.reject(error)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', {value: instance})
  }
}

export {baseUrl}
