<template>
     <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>
            <router-link to="/">首页</router-link>
        </a-breadcrumb-item>
        <!-- <a-breadcrumb-item>
            <router-link to="/warehouse">库存</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>
            <router-link to="/goods">物品</router-link>
        </a-breadcrumb-item> -->
    </a-breadcrumb>
</template>
<script>
export default {
    name: "benyun-navigator"
}
</script>

