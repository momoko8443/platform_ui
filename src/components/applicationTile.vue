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
import axios from 'axios'
const url = '/benyun/jumper';
import applicationItem from './applicationItem';
import { constants } from 'crypto';
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
            if(!app.path || app.path.search('http://') === 0){
                if(app.webServerRedirectUri){
                    const appUrl = encodeURI(app.webServerRedirectUri);
                    axios({
                        method: 'post',
                        url:url,
                        data:{appUrl: appUrl},
                    }).then((result)=>{
                        console.log(result)
                        window.open(result.data);
                    });
                }          
            }else{
                this.$router.push({name: app.path});
            }
            
            //alert(app.title);
        }
    },
}
</script>
