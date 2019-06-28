<template>
    <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <application-tile :applications="usersApps"></application-tile>
    </div>
</template>
<script>
import applicationTile from '../components/applicationTile';
export default {
    name: "benyun-dashboard",
    components:{
        "application-tile": applicationTile
    },
    data: function(){
        return {
            usersApps : [
                {appName:"成员", appDesc: "管理成员",path:"member",appLogo: require('../assets/member.png'),color: "#E2DFDF"},
                {appName:"角色", appDesc: "为成员分配权限",path:"role",appLogo: require('../assets/role.png'),color: "#E2DFDF"},
                // {title:"权限", desc: "应用权限管理",path:"authority",color: "#a0d911"},
                // {title:"生产", desc: "生产计划",path:"erp",color: "#bfbfbf"},
                // {title:"销售", desc: "销售链",path:"sale",color: "#b37feb"}
                ]
        };
    }
}
</script>

