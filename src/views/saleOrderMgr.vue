<template>
    <a-row type="flex" justify="center" :gutter="50">
      <a-col :span="4">
          <h4>分类标签</h4>
          <tags-wall></tags-wall>
      </a-col>
      <a-col :span="20">
          <a-row type="flex" justify="start" :gutter="8">
             <a-col :span="8">
               <a-button type="primary" @click="addSaleOrder">
                    <a-icon type="plus"/>创建销售单
                </a-button>
            </a-col>
          </a-row>
          <a-divider />
          <a-row type="flex" justify="start" :gutter="8">
              <a-col :md="6" :lg="4">
                <order-lane title="新的订单" :chainItems="inputChainItems" laneType="inputStore" @addChainItem="addChainItemHandler"></order-lane>
              </a-col>
              <!-- <a-col :md="6" :lg="4">
                <store-lane title="询价中" :chainItems="storeChainItems" laneType="inStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col> -->
              <a-col :md="6" :lg="4">
                <order-lane title="已确认" :chainItems="outputChainItems" laneType="outputStore" @addChainItem="addChainItemHandler"></order-lane>
              </a-col>
              <a-col :md="6" :lg="4" >
                <order-lane title="生产中" :chainItems="storeChainItems" laneType="cancelStore" @addChainItem="addChainItemHandler"></order-lane>
              </a-col>
              <a-col :md="6" :lg="4" >
                <order-lane title="已入库" :chainItems="outputChainItems" laneType="cancelStore" @addChainItem="addChainItemHandler"></order-lane>
              </a-col>
              <a-col :md="6" :lg="4" >
                <order-lane title="出库/运输中" :chainItems="outputChainItems" laneType="cancelStore" @addChainItem="addChainItemHandler"></order-lane>
              </a-col>
              <a-col :md="6" :lg="4" >
                <order-lane title="订单完成" :chainItems="storeChainItems" laneType="cancelStore" @addChainItem="addChainItemHandler"></order-lane>
              </a-col>
          </a-row>
      </a-col>
    </a-row>
</template>
<script>
import tagsWall from "../components/erp/tagsWall";
import orderLane from "../components/erp/orderLane";
export default {
    name: "saleOrderMgr",
    components: {
        "tags-wall": tagsWall,
        "order-lane": orderLane,
    },
    methods: {
      addChainItemHandler: function(laneType){
        alert(laneType);
      },
      addSaleOrder: function(){
          this.$router.push({name: "sale_create"});
      }
    },
    data:function(){
      return {
        inputChainItems:
        [
          {
            id: "1",
            title:"销售单01",
            status:"in_transit",
            shoppingList:[
              {id:"1",title: "Intel i7 8700k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18448/200/2532654839/268503/b46a717e/5afe4d0cN10f96d55.jpg",count:9,unit:'件'},
              {id:"2",title: "Intel i5 8600k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18118/5/942017929/1604160/a1cb6216/5ab1f623N58030a3c.jpg",count:7,unit:'件'},
              {id:"3",title: "Intel i5 8600k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18118/5/942017929/1604160/a1cb6216/5ab1f623N58030a3c.jpg",count:7,unit:'件'},
            ]
          }
      
        ],
        storeChainItems: [
          {
            id: "1",
            title:"销售单02",
            status:"in_product",
            shoppingList:[
              {id:"1",title: "Intel i7 8700k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18448/200/2532654839/268503/b46a717e/5afe4d0cN10f96d55.jpg",count:9,unit:'件'},
              {id:"2",title: "Intel i5 8600k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18118/5/942017929/1604160/a1cb6216/5ab1f623N58030a3c.jpg",count:7,unit:'件'},
              
            ]
          },
          {
            id: "2",
            title:"销售单05",
            status:"in_transit",
            shoppingList:[
              {id:"1",title: "Intel i7 8700k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18448/200/2532654839/268503/b46a717e/5afe4d0cN10f96d55.jpg",count:9,unit:'件'},
            ]
          }  
        ],
        outputChainItems:[
          {
            id: "1",
            title:"销售单03",
            status:"in_transit",
            shoppingList:[
              {id:"1",title: "Intel i7 8700k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18448/200/2532654839/268503/b46a717e/5afe4d0cN10f96d55.jpg",count:9,unit:'件'},
            ]
          }  
        ],
        exceptionChainItems:[
          {
            id: "1",
            title:"销售单04",
            status:"in_product",
            shoppingList:[
              {id:"1",title: "Intel i7 8700k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18448/200/2532654839/268503/b46a717e/5afe4d0cN10f96d55.jpg",count:9,unit:'件'},
            ]
          } 
        ]
      };
    }
}
</script>

