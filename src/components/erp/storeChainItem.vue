<template>
  <a-card hoverable :bordered="false" :style="{marginBottom:'5px',borderLeftStyle:'solid',bordeLeftWeight:'4px',borderLeftColor: statusColor}"
  draggable="true">
    
    
    <!-- <a-divider /> -->
    <a-row :gutter="8">
      <a-col :span="8">
        <img style="width: 100%"
          :src="chainItem.picture"
        />
      </a-col>
      <a-col :span="16">
        <span>{{chainItem.title}}</span>
        <h3>{{'x' + chainItem.count + ' ' + chainItem.unit}}</h3>
      </a-col>
    </a-row>
    
    <!-- <a-icon type="wechat" style="color:green;fontSize:20px"/> -->
    <!-- <a-icon type="share-alt" style="color:green;fontSize:20px"/> -->
  </a-card>
</template>
<style>
  .description{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>

<script>
export default {
  name: "storeChainItem",
  computed: {  
    statusColor: function(){
      let color = "#8c8c8c";
      switch(this.chainItem.status){
        case "in_transit":
          color = "#52c41a";
          break;
        case "in_product":
          color = "#1890ff";
          break;
      }
      return color;
    }
  },
  props:{
    chainItem:Object
  }
};
</script>

