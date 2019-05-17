<template>
  <a-layout id="components-layout-demo-fixed">
    <benyun-header></benyun-header>
    <a-layout-content :style="{ padding: '100px 50px', marginTop: '64px' , hight: '100%'}">
        <a-row type="flex" justify="space-around" align="middle">
            <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6">
                <benyun-login></benyun-login>
            </a-col>
        </a-row>
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
import loginForm from "../components/common/loginForm";
// import dashboard from "../components/common/dashboard";

export default {
  name: 'loginView',
  components: {
    "benyun-header":header,
    "benyun-footer": footer,
    "benyun-login": loginForm,
  }
}
</script>
