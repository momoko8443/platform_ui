<template>
    <a-card :title="app.appName" :bordered=false @click="onClick"  :style="{cursor:'pointer',borderWeight:'2px',borderStyle:'solid',borderColor:app.color}">
        <p>{{app.appDesc}}</p>
        <img class="logo-pic"  :src="app.appLogo">
    </a-card>
</template>
<script>
export default {
    name: "applicationItem",
    props: {
        app: Object
    },
    methods: {
        onClick: function(){
            this.$emit('enterApplication', this.app)
        }
    }
}
</script>
<style scoped>
    .logo-pic{
        display: block;
        width:100px;
        height: 100px;
    }
</style>
