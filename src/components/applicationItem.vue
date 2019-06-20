<template>
    <a-card :title="app.appName" :bordered=false @click="onClick"  :style="{cursor:'pointer',borderWeight:'2px',borderStyle:'solid',borderColor:app.color}">
        <p>{{app.appDesc}}</p>
        <img style="width:100px;"  :src="app.appLogo">
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
