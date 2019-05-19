<template>
  <div>
    <div style="height:30px;">
      <span style="margin-left:5px">{{title}}</span>
      <a-button type="dashed" size="small" icon="plus" shape="circle" style="float:right;" @click="addChainItemHandler"/>
    </div>
    <div style="background:#e8e8e8; height:600px;padding:5px;overflow-y:auto;overflow-x:hidden">
      <store-chain-item v-for="item in chainItems" :chainItem="item" :key="item.id"></store-chain-item>
    </div>
  </div>
</template>
<script>
import storeChainItem from "./storeChainItem";
export default {
  name: "storeLane",
  components: {
    "store-chain-item": storeChainItem
  },
  props:{
      title:String,
      chainItems:Array,
      laneType:String
  },
  methods: {
    addChainItemHandler: function(){
      this.$emit("addChainItem", this.laneType);
    }
  },
};
</script>

