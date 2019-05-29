import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import "animate.css"
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  // ...
  if(to.path === "/erp"){
    window.location.href = "http://47.111.18.121:5008";
  }
  console.log(to);
  next();
});
Vue.use(Antd)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
