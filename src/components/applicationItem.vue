<template>
    <a-card :title="app.title" :bordered=false @click="onClick"  :style="{cursor:'pointer',borderWeight:'2px',borderStyle:'solid',borderColor:app.color}">
        <p>{{app.desc}}</p>
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
