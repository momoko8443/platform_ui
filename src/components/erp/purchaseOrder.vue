<template>
  <div style="height:600px">
    <div style="height:30px;">
      <span style="margin-right:5px;float:right">采购清单</span>
      <!-- <a-button type="dashed" size="small" icon="plus" shape="circle" style="float:right;" @click="addChainItemHandler"/> -->
    </div>
    
    <div>
      <a-form >
        <a-form-item label="物品">
            <div style="background:#e8e8e8; height:300px;padding:5px;overflow-y:auto;overflow-x:hidden">
                <purchase-order-item v-for="item in orderItems" :orderItem="item" :key="item.id" @removeCartItem="removeCartItemHandler"></purchase-order-item>
            <!-- <store-chain-item v-for="item in chainItems" :chainItem="item" :key="item.id"></store-chain-item> -->
            </div>
        </a-form-item>
        <a-form-item
          label="供应商"
        >
          <a-input
            v-decorator="[
          'provider',
          {rules: [{ required: true, message: '请输入供应商' }]}
        ]"
            placeholder="请输入供应商"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary">下单</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import purchaseOrderItem from "./purchaseOrderItem";
import EventsName from "../../constants/eventsName.js";
import eventBus from "../../utils/eventBus.js";
import uuid from "uuid-random";
export default {
  created() {
    //alert(EventsName.ADD_PURCHARSE_ORDER_ITEM_TO_CART);
    eventBus.$on(EventsName.ADD_PURCHARSE_ORDER_ITEM_TO_CART, (item)=>{
      //alert(item);
      let cartItem = Object.assign({},item);
      cartItem.id = uuid();
      cartItem.count = 9;  
      this.orderItems.push(cartItem);
    })
  },
  name: "purchaseOrder",
  data() {
      return {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
          },
          orderItems: []
      }
  },
  components: {
    "purchase-order-item": purchaseOrderItem
  },
  props: {
    title: String,
    chainItems: Array,
    laneType: String
  },
  methods: {
    addChainItemHandler: function() {
      this.$emit("addChainItem", this.laneType);
    },
    removeCartItemHandler: function(cartItem) {
      this.orderItems = this.orderItems.filter((item)=>{
        return item.id != cartItem.id;
      });
    }
  }
};
</script>

