<template>
    <div style="background:#fafafa;padding:5px;margin-bottom:5px;border-left-style:solid;border-left-weight:2px;border-left-color:#ffa940">
        <a-avatar :src="orderItem.pictures[0]"/>
        <span style="padding-left:4px">{{orderItem.name}}</span>
        <a-divider type="vertical" />
        <a-input-number :min="1" :max="10" v-model="orderItem.count"/>
        <span style="padding-left:4px">{{orderItem.unit}}</span>
        <a-divider type="vertical" />
        <a-button shape="circle" icon="delete" @click="removeCartItemHandler"  style="float:right;margin-top:4px"/>
  </div>
</template>
<script>
export default {
    name: "purchaseOrderItem",
    props:{
        orderItem:Object
    },
    methods: {
        removeCartItemHandler: function(){
            this.$emit("removeCartItem", this.orderItem);
        }
    },
}
</script>

