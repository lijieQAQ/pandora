// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import './assets/css/styleHign.css'
import http from './common/js/http'
import App from './App'
import store from './store'
import 'jquery'
import VueNumeric from 'vue-numeric'
import './common/js/validate'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, {locale})
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueNumeric)

// axios封装
Vue.use(http)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
    VueNumeric
  },
  template: '<App/>'
})
