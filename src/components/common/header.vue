<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" >
        <span style="font-size: 18px;
    position: relative;
    top: -18px;
    left: 8px;
    color: whitesmoke;">Benyun EOP</span>
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
           <router-link to="/">首页</router-link>
        </a-menu-item>
        <!-- <a-menu-item key="2">
           <router-link to="/warehouse">仓库</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/goods">物品</router-link>
        </a-menu-item> -->
        <a-menu-item key="4" style="float: right">
          <!-- <router-link to="/login"> -->
            <!-- <a-button type="primary" @click="doLogin">登录</a-button> -->
          <!-- </router-link> -->
            <a-avatar style="backgroundColor:#87d068">{{userProfile.displayName}}</a-avatar>
        </a-menu-item>
      </a-menu>
      
    </a-layout-header>
</template>
<style>
</style>
<script>
import axios from 'axios'
export default {
  name: 'benyun-header',
  data:function(){
    return {
        userProfile:{}
    }
  },
  created(){
      this.getUserProfile((profile)=>{
        this.userProfile = profile;
      });
  },
  methods:{
    getUserProfile(callback){
      axios({
        url: '/benyun/api/user',
        responseType: 'json',
        method: 'get',
        headers: { 'content-type': 'application/json' },

      }).then((res) => {
          callback(res)
      });
    }
  }
}
</script>


