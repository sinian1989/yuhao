
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  collapsed: false,
  topNavState: 'home',
  leftNavState: 'home'
}

/*从本地存储读取数据*/
for(var item in state) {
  localStorage.getItem(item)? state[item] = JSON.parse(localStorage.getItem(item)): false;
}

export default new Vuex.Store({
  state
})
