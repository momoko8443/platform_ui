<template>
  <a-card hoverable :bordered="false" :style="{marginBottom:'5px',borderLeftStyle:'solid',bordeLeftWeight:'4px',borderLeftColor: statusColor}"
  draggable="true">
    <a-row :gutter="8">
      <a-col :span="8">
        <img style="width: 100%"
          :src="chainItem.picture"
        />
      </a-col>
      <a-col :span="16">
        <a-row>
          <a-col :span="16">
            <h5>{{chainItem.title}}</h5>
          </a-col>
          <a-col :span="8">
            <h5>{{'x' + chainItem.count}}</h5>
          </a-col>
        </a-row>
        <p>{{chainItem.description}}</p>
      </a-col>
    </a-row>
  </a-card>
</template>
<style>

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

