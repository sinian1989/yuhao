import Vue from 'vue'
import  qs from 'qs'
import App from './App'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/utils/index'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import "./assets/iconfont/iconfont.css"
import store from './store'
import router from './router'
import '@/assets/iconfont.css'
import '@/assets/css/style.css'
import '@/icons' // icon
import BaiduMap from 'vue-baidu-map'
Vue.prototype.$qs = qs
Vue.use(BaiduMap,{ak:'pz8Kjfh3sAr6YftVfZ0Y8ntPS3ckGKCA'})
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false
//路由守卫
// router.beforeEach((to, from, next) => {
// 	console.log(to)
// 	console.log(from)	
// 	console.log(sessionStorage.getItem('token'))
// 	if(sessionStorage.getItem('token')){
// 		next()
// 	}else{
// 		if(to.path=='/login'){
// 			next()
// 		}else{
// 			console.log(to.path)
// 			next('/login')
// 		}
// 	}
  
// });
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
