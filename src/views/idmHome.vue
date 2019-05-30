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
                {title:"成员", desc: "管理成员",path:"member",color: "#69c0ff"},
                {title:"角色", desc: "管理角色",path:"role",color: "#fadb14"},
                {title:"权限", desc: "应用权限管理",path:"authority",color: "#a0d911"},
                // {title:"生产", desc: "生产计划",path:"erp",color: "#bfbfbf"},
                // {title:"销售", desc: "销售链",path:"sale",color: "#b37feb"}
                ]
        };
    }
}
</script>

