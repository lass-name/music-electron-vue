import Vue from 'vue'
import axios from 'axios'

import App from './App'
import Vuex from 'vuex'
import Router from 'vue-router'
import _router from './router'
import _store from './store'
import * as filters from './filters'
import ElementUI from 'element-ui'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/iconfont.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(Router)

const store = new Vuex.Store(_store)
const router = new Router(_router)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
