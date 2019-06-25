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
          <a-menu slot="overlay" :selectedKeys="currentTenantId">
            <a-menu-item>
              <a href="javascript:;">档案</a>
            </a-menu-item>
            <!-- <a-menu-item-group title="公司">
              <a-menu-item v-for="tenant in userProfile.tenants" :key="tenant" @click="switchTenantHandler">{{tenant}}</a-menu-item>
            </a-menu-item-group> -->
            <a-menu-item>
              <a href="javascript:;" @click="logoutHandler">登出</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-select :defaultValue="currentTenantId" style="width: 120px" @change="switchTenantHandler" style="float: right;margin-top: 16px;margin-right: 24px;">
          <a-select-option v-for="tenant in userProfile.tenants" :key="tenant.id" :value="tenant.id">{{tenant.tenanntName}}</a-select-option>
        </a-select>
      </a-menu>
      
    </a-layout-header>
</template>
<style>
</style>
<script>
import axios from 'axios'
import Vue from 'vue';
import { constants } from 'crypto';
//import Cookies from 'js-cookie'
const url = "/benyun/api/users/current_tenant";
export default {
  name: 'benyun-header',
  // data:function(){
  //   return {
  //       userProfile:{
  //         realName:""
  //       },
  //       currentTenantId:""
  //   }
  // },
  computed:{
    userProfile(){
      return Vue.currentUser;
    },
    currentTenantId(){
      //let currentTenantId = Cookies.get('currentTenantId');
      return Vue.currentUser.lineTenantId;
    }
  },
  // mounted(){
  //     //this.userProfile = Vue.currentUser;
  //     //this.currentTenantId = this.userProfile.lineTenantId;
  // },
  methods:{
    logoutHander(){
      console.log('do logout');
    },
    switchTenantHandler(key){
      console.log(key);
      let self = this;
      axios({
        method: 'put',
        url: url,
        data: {
          tenantId: key
        },
        responseType: 'json',
        headers: { 'content-type': 'application/json'}
      }).then((result)=>{
        //alert('切换成功');
        //self.currentTenantId = key;
        //Cookies.set('currentTenantId', key);
        window.location.reload();
      });
    }
  }
}
</script>


