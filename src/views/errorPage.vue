<template>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <h2>
            Session timeout, please login first
        </h2>
        <a-button @click="loginHandler">Login</a-button>
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

