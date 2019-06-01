<template>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <application-tile :applications="usersApps"></application-tile>
    </div>
</template>
<script>
import applicationTile from '../components/applicationTile';
export default {
    name: "benyun-dashboard",
    data: function(){
        return {
            usersApps : [
                {title:"物", desc: "轻型产业链管理",path:"erp",color:"#a0d911"},
                {title:"人", desc: "成员权限管理",path:"idm",color: "#bfbfbf"},
                {title:"金", desc: "财务管理",path:"home",color: "#bfbfbf"},
                {title:"链", desc: "企业关系管理",path:"home",color: "#bfbfbf"}
                ]
        };
    },
    components:{
        "application-tile": applicationTile
    }
}
</script>

