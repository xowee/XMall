import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import Toast from '@/plugins/toast/index.js'
import VueLazyLoad from 'vue-lazyload'
import {isPC} from '@/common/utils.js'

Vue.config.productionTip = false

isPC()

Vue.use(VueLazyLoad, {
  preLoad: 1,
  loading: require('assets/img/common/placeholder.png')
})

Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')