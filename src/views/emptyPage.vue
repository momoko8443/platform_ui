<template>
    <div :style="{textAlign: 'center', background: '#fff', padding: '24px', minHeight: '380px', display: 'flex',justifyContent: 'center',flexDirection: 'column'}">
        <h2>
            您尚未开通系统访问权限，请与企业管理员联系！
        </h2>
        <el-button>
            <a href="/logout">退出</a>
        </el-button>
        <!-- <a-button @click="loginHandler">Login</a-button> -->
    </div>
</template>
<script>

export default {
    name: "empty-page",
}
</script>

