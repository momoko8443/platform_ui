<template>
     <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>
            <router-link to="/">首页</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item v-for="item in navItems" :key="item.path">
            <router-link :to="item.path">{{item.name}}</router-link>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>
<script>
export default {
    name: "benyun-navigator",
    data() {
        return {
            navItems:[]
        }
    },
    watch: {
        '$route'(to) {
            this.navItems = to.meta.nav;
        } 
    }
}
</script>

