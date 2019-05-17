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
                {title:"始", desc: "元器件录入",path:"goods"},
                {title:"存", desc: "库存查看",path:"warehouse"},
                {title:"进", desc: "进货链",path:"home"},
                {title:"销", desc: "销售链",path:"home"}
                ]
        };
    }
}
</script>

