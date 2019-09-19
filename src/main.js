import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import router from './router/index.js'
import qs from 'qs';

import '../public/font-awesome-4.7.0/css/font-awesome.css'
Vue.use(VueResource)
Vue.prototype.$qs = qs;

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
