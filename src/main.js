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
}, (error)=>{
  console.log('error!!!',JSON.stringify(error));
  if(error.response.status === 401){
    router.push('error');
  }else{
    //Vue.$message.error(`出错啦!${error.response.code}:${error.response.message}`);
  }
});

Vue.config.productionTip = false;
if(!Vue.currentUser){
  axios({
    url: '/benyun/api/user',
    responseType: 'json',
    method: 'get',
  }).then((res) => {
      //callback(res)
      return res.data;
  }).then((profile)=>{
    Vue.currentUser = profile;
    Vue.currentTenantId = profile.lineTenantId;
    Vue.use(Antd)
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  });

}
