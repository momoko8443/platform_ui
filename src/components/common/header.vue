<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
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
          <router-link to="/login">
            <a-button type="primary">登录</a-button>
          </router-link>
        </a-menu-item>
      </a-menu>
      
    </a-layout-header>
</template>
<style>




</style>
<script>
export default {
  name: 'benyun-header'
}
</script>


