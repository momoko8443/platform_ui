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
        <!-- <a-menu-item key="4" style="float: right">
            <a-avatar style="backgroundColor:#87d068">{{userProfile.displayName}}</a-avatar>
        </a-menu-item> -->
        <a-dropdown style="float: right;margin-top: 16px;">
          <!-- <a class="ant-dropdown-link" href="#">
            Hover me <a-icon type="down" />
          </a> -->
          <a-avatar style="backgroundColor:#87d068">{{userProfile.realName.substr(0,2)}}</a-avatar>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">档案</a>
            </a-menu-item>
            <!-- <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item> -->
            <a-menu-item>
              <a href="javascript:;" @click="logoutHandler">登出</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-menu>
      
    </a-layout-header>
</template>
<style>
</style>
<script>
import axios from 'axios'
import Vue from 'vue';
export default {
  name: 'benyun-header',
  data:function(){
    return {
        userProfile:{
          realName:""
        }
    }
  },
  mounted(){
      this.userProfile = Vue.currentUser;
  },
  methods:{
    logoutHander(){
      console.log('do logout');
    }
  }
}
</script>


