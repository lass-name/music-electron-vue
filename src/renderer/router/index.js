/*
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
*/

const requireRouters = require.context('.', false, /\.js/)
let _routes = []
requireRouters.keys().forEach(fileName => {
  if (fileName === './index.js') return

  _routes = [...routes, requireRouters(fileName).default]
})

let _childs = []
Object.keys(_routes).forEach(key => {
  Array.prototype.push.apply(_childs, _routes[key])
})
console.log(_childs)
const routes = [{
  path: '/layout',
  name: 'layout',
  component: () => import('@/components/LandingPage')
}, ..._childs]

export default {
  routes
}
