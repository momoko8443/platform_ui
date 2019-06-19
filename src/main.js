import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import "animate.css"

//axios.defaults.headers.post['content-type'] = 'application/json';

axios.interceptors.response.use((res) => {
  return res;
}, function(error){
  if(error.response.status === 401){
    router.push('error');
  }
  //console.log(error);
});

Vue.config.productionTip = false;
// router.beforeEach((to, from, next) => {
//   // ...
//   if (to.path === "/erp") {
//     window.location.href = "http://47.111.18.121:11121?tenant=1";
//   }
//   //console.log(to);
//   next();
// });
Vue.use(Antd)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')