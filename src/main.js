import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-chalk/index.css';
//引用index.js
import router from "@/router/index";
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  components: {App},
  render: h => h(App),
}).$mount('#app');
