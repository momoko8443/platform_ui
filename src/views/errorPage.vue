<template>
    <div :style="{textAlign: 'center', background: '#fff', padding: '24px', minHeight: '380px', display: 'flex',justifyContent: 'center',flexDirection: 'column',alignItems:'center'}">
        <h2>
            超时！请重新登录
        </h2>
        <a-button @click="loginHandler" style="width:120px" >登录</a-button>
    </div>
</template>
<script>

export default {
    name: "error-page",
    methods: {
        loginHandler(){
            window.location.href = "/main";
        }
    }
}
</script>

