<template>
    <a-row type="flex" justify="center" :gutter="50">
      <a-col :span="4">
          <h4>分类标签</h4>
          <tags-wall></tags-wall>
      </a-col>
      <a-col :span="20">
          <a-row type="flex" justify="start" :gutter="8">
             <a-col :span="8">
               <a-button type="primary" @click="addPurchaseOrder">
                    <a-icon type="plus"/>添加新采购
                </a-button>
            </a-col>
          </a-row>
          <a-divider />
          <a-row type="flex" justify="start" :gutter="8">
              <a-col :md="6" :lg="4">
                <store-lane title="新采购/询价中" :chainItems="inputChainItems" laneType="inputStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
              <!-- <a-col :md="6" :lg="4">
                <store-lane title="询价中" :chainItems="storeChainItems" laneType="inStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col> -->
              <a-col :md="6" :lg="4">
                <store-lane title="供应商已确认" :chainItems="outputChainItems" laneType="outputStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
              <a-col :md="6" :lg="4" >
                <store-lane title="运输中" :chainItems="exceptionChainItems" laneType="cancelStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
              <a-col :md="6" :lg="4" >
                <store-lane title="已入库" :chainItems="exceptionChainItems" laneType="cancelStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
              <a-col :md="6" :lg="4" >
                <store-lane title="完成支付" :chainItems="exceptionChainItems" laneType="cancelStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
              <a-col :md="6" :lg="4" >
                <store-lane title="异常/取消" :chainItems="exceptionChainItems" laneType="cancelStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
          </a-row>
      </a-col>
    </a-row>
</template>
<script>
import tagsWall from "../components/erp/tagsWall";
import storeLane from "../components/erp/storeLane";
export default {
    name: "purchaseMgr",
    components: {
        "tags-wall": tagsWall,
        "store-lane": storeLane,
    },
    methods: {
      addChainItemHandler: function(laneType){
        alert(laneType);
      },
      addPurchaseOrder: function(){
          this.$router.push({name: "purchase_create"});
      }
    },
    data:function(){
      return {
        inputChainItems:
        [
          {id:"1",title: "零件A",description:"这是零件A",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
          {id:"2",title: "零件B",description:"这是零件B",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_product"},
          {id:"3",title: "零件C",description:"这是零件C",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
          {id:"4",title: "零件A",description:"这是零件A",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
          {id:"5",title: "零件B",description:"这是零件B",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_product"},
          {id:"6",title: "零件C",description:"这是零件C",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
          {id:"7",title: "零件A",description:"这是零件A",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
          {id:"8",title: "零件B",description:"这是零件B",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_product"},
          {id:"9",title: "零件C",description:"这是零件C",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
          
        ],
        storeChainItems: [
          {id:"1",title: "零件A",description:"这是零件A",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
          {id:"2",title: "零件B",description:"这是零件B",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_product"},
          {id:"3",title: "零件C",description:"这是零件C",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
 
        ],
        outputChainItems:[
          {id:"1",title: "零件A",description:"这是零件A",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
          {id:"2",title: "零件B",description:"这是零件B",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_product"},
          {id:"3",title: "零件C",description:"这是零件C",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
 
        ],
        exceptionChainItems:[
          {id:"1",title: "零件A",description:"这是零件A",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
          {id:"2",title: "零件B",description:"这是零件B",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_product"},
          {id:"3",title: "零件C",description:"这是零件C",picture:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",count:99,status:"in_transit"},
 
        ]
      };
    }
}
</script>

