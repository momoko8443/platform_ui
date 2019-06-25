<template>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <application-tile :applications="usersApps"></application-tile>
    </div>
</template>
<script>
import applicationTile from '../components/applicationTile';
import axios from 'axios';
import { constants } from 'crypto';
import Vue from 'vue';
//import logoPath from '../assets/logo.png';

const url = "/benyun/api/applications";

export default {
    name: "benyun-dashboard",
    data: function(){
        return {
            usersApps :[],
            idmLogo : require('@/assets/idm.png')
        };
    },
    components:{
        "application-tile": applicationTile
    },
    mounted(){
        this.getApplications((result)=>{
            //console.log(result);
            if(Vue.currentUser.isAdmin){
                this.usersApps.push({appName:"权限管理",path:"idm",appLogo: this.idmLogo});
            }
            for (let i = 0; i < result.length; i++) {
                const app = result[i];
                this.usersApps.unshift(app);
            }
        });
    },
    methods:{
        getApplications(callback){
            axios({
                url: url + '?tenantId=' + Vue.currentTenantId,
                responseType: 'json',
                method: 'get',
            }).then((res) => {
                callback(res.data)
            });
        }
    }
}
</script>

