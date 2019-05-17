<template>
  <a-layout id="components-layout-demo-fixed">
    <benyun-header></benyun-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <benyun-navigator></benyun-navigator>
      <!-- <benyun-dashboard></benyun-dashboard> -->
      <router-view></router-view>
    </a-layout-content>
    <benyun-footer></benyun-footer>
  </a-layout>
</template>
<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>

<script>
// @ is an alias to /src

import header from "../components/common/header";
import footer from "../components/common/footer";
import navigator from "../components/common/navigator";
// import dashboard from "../components/common/dashboard";

export default {
  name: 'home',
  components: {
    "benyun-header":header,
    "benyun-footer": footer,
    "benyun-navigator": navigator,
    //"benyun-dashboard": dashboard
  }
}
</script>
