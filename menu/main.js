import App from './App'
import { food } from './static/json/food3.js'
import { menu } from './static/json/menus.js'
import { swiper } from './static/json/swiper.js'

// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$food = food
Vue.prototype.$menu = menu
Vue.prototype.$swiper = swiper
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif