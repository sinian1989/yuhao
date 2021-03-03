import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
console.log(process.env.VUE_APP_URL)
// 创建一个axios实例
const service = axios.create({
  baseURL: '/', // url = base url + request url /    http://220.194.156.84:8081   'http://192.168.0.55:8080
  timeout: 50000 // request timeout
})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
service.interceptors.request.use(
  config => {
		let token = sessionStorage.getItem("Token")
		console.log(token)
    if (token) {
   		config.headers.Authorization = 'Bearer '+token;
     }else{
   		
   		config.headers.client_id = 'webApp'
   		config.headers.client_secret = '123456'
   	}
    return config
  },
  error => {
    // 请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(

  response => {
    const res = response.data;
    
    if (res.code!== 10000) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
			
      if (res.code == 50008 || res.code == 50012 || res.code == 50014) {
        
        MessageBox.confirm('您已经登出，您可以取消停留在此页面，或再次登录', '确认注销', {
          confirmButtonText: '重新登陆',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
			return res;
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
