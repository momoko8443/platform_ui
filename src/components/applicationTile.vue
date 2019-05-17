<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row type="flex" justify="start" :gutter="16">
      <a-col :xxl="3" :xl="4" :lg="5" :md="6" :sm="8" :xs="12" class="vGap" v-for="application in applications" :key="application.title">
        <application-item :app="application" @enterApplication="enterApplicationHandler"></application-item>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
    .vGap {
        margin-top: 16px;
    }
</style>

<script>
import applicationItem from './applicationItem';
export default {
    name: "applicationTile",
    components:{
        "application-item": applicationItem
    },
    props: {
        applications: Array
    },
    methods: {
        enterApplicationHandler:function(app){
            //alert();
            this.$router.push({name: app.path});
            //alert(app.title);
        }
    },
}
</script>
