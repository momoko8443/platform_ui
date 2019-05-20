<template>
    <a-row type="flex" justify="center" :gutter="50">
      <a-col :span="4">
          <h4>分类标签</h4>
          <tags-wall></tags-wall>
      </a-col>
      <a-col :span="20">
          <a-row type="flex" justify="center">
            <a-col :span="20">
              <store-chain-item-create></store-chain-item-create>
            </a-col>
            <a-col :span="4">
              <a-select defaultValue="零配件库存"  style="float:right;width:100%" @change="storeTypeChangeHandler">
                <a-select-option value="零配件库存">零配件库存</a-select-option>
                <a-select-option value="成品库存">成品库存</a-select-option>
                <!-- <a-select-option value="添加+">添加新品种+</a-select-option> -->
              </a-select>
            </a-col>
          </a-row>
          
          <a-divider />
          <a-row type="flex" justify="start" :gutter="8">
              <a-col :md="6" :lg="6" v-if="storeMode === 'parts'">
                <store-lane title="进库运输中" :chainItems="inputChainItems" laneType="inputStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
              <a-col :md="6" :lg="6" v-if="storeMode === 'products'">
                <store-lane title="生产中" :chainItems="storeChainItems" laneType="inStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
              <a-col :md="6" :lg="6">
                <store-lane title="在库" :chainItems="storeChainItems" laneType="inStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
              <a-col :md="6" :lg="6" v-if="storeMode === 'products'">
                <store-lane title="出库运输中" :chainItems="outputChainItems" laneType="outputStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
              <a-col :md="6" :lg="6" v-if="storeMode === 'parts'">
                <store-lane title="组装中" :chainItems="exceptionChainItems" laneType="cancelStore" @addChainItem="addChainItemHandler"></store-lane>
              </a-col>
          </a-row>
      </a-col>
    </a-row>
</template>
<script>
import tagsWall from "../components/erp/tagsWall";
import storeLane from "../components/erp/storeLane";
import storeChainItemCreate from '../components/erp/storeChainItemCreate';
export default {
    name: "warehouse",
    components: {
        "tags-wall": tagsWall,
        "store-lane": storeLane,
        "store-chain-item-create":storeChainItemCreate
    },
    methods: {
      addChainItemHandler: function(laneType){
        alert(laneType);
      },
      storeTypeChangeHandler: function(value){
        if(value === "零配件库存"){
          this.storeMode = "parts";
        }else{
          this.storeMode = "products";
        }
      }
    },
    data:function(){
      return {
        storeMode: "parts",
        inputChainItems:
        [
          {id:"1",title: "Intel i7 8700k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18448/200/2532654839/268503/b46a717e/5afe4d0cN10f96d55.jpg",count:9,unit:'件',status:"in_transit"},
          {id:"2",title: "Intel i5 8600k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18118/5/942017929/1604160/a1cb6216/5ab1f623N58030a3c.jpg",count:7,unit:'件',status:"in_product"},
          {id:"3",title: "Intel i5 8600k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18118/5/942017929/1604160/a1cb6216/5ab1f623N58030a3c.jpg",count:7,unit:'件',status:"in_product"},      
        ],
        storeChainItems: [
          {id:"1",title: "Intel i7 8700k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18448/200/2532654839/268503/b46a717e/5afe4d0cN10f96d55.jpg",count:9,unit:'件',status:"in_transit"},
          {id:"2",title: "Intel i5 8600k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18118/5/942017929/1604160/a1cb6216/5ab1f623N58030a3c.jpg",count:7,unit:'件',status:"in_product"},

        ],
        outputChainItems:[
           {id:"1",title: "Intel i7 8700k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18448/200/2532654839/268503/b46a717e/5afe4d0cN10f96d55.jpg",count:9,unit:'件',status:"in_transit"},
        ],
        exceptionChainItems:[
          {id:"1",title: "Intel i7 8700k",description:"【8代酷睿,精彩芯体验】LGA1151芯片接口,六核六线程,睿频可至4.3GHz!",picture:"https://img14.360buyimg.com/n0/jfs/t18448/200/2532654839/268503/b46a717e/5afe4d0cN10f96d55.jpg",count:9,unit:'件',status:"in_product"},
        ]
      };
    }
}
</script>

