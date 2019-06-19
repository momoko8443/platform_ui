<template>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <application-tile :applications="usersApps"></application-tile>
    </div>
</template>
<script>
import applicationTile from '../components/applicationTile';
import axios from 'axios';
import { constants } from 'crypto';

const url = "/benyun/api/applications";
export default {
    name: "benyun-dashboard",
    data: function(){
        return {
            usersApps : [
                
                {appName:"权限管理",path:"idm",appIcon: ""},
            ]
        };
    },
    components:{
        "application-tile": applicationTile
    },
    mounted(){
        this.getApplications((result)=>{
            //console.log(result);
            for (let i = 0; i < result.length; i++) {
                const app = result[i];
                this.usersApps.unshift(app);
            }
        });
    },
    methods:{
        getApplications(callback){
            axios({
                url: url,
                responseType: 'json',
                method: 'get',
            }).then((res) => {
                callback(res.data)
            });
        }
    }
}
</script>

