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
                {title:"初始", desc: "原始数据录入",path:"goods",color: "#69c0ff"},
                {title:"库存", desc: "库存管理",path:"warehouse",color: "#fadb14"},
                {title:"进货", desc: "进货链",path:"purchase",color: "#a0d911"},
                {title:"生产", desc: "生产计划",path:"erp",color: "#bfbfbf"},
                {title:"销售", desc: "销售链",path:"sale",color: "#b37feb"}
                ]
        };
    }
}
</script>

