<template>
    <a-row type="flex" justify="center" :gutter="50">
      <a-col :span="4">
          <h4>分类标签</h4>
          <tags-wall></tags-wall>
      </a-col>
      <a-col :span="20">
          <a-divider />
           <a-row :gutter="32" justify="space-around" align="middle">
             <a-col :span="12">
               <a-input-search
                placeholder="请输入查询关键字"
                enterButton
              />
               <div style="height:30px"></div>
               <purchase-items-list></purchase-items-list>
             </a-col>
             <a-col :md="12" :xl="8">
               <a-affix :offsetTop="this.top" >
                <sale-order></sale-order>
               </a-affix>
             </a-col>
           </a-row>
          
      </a-col>
    </a-row>
</template>
<script>
import tagsWall from "../components/erp/tagsWall";
import purchaseItemsList from "../components/erp/purchaseItemsList";
import saleOrder from "../components/erp/saleOrder";
export default {
    name: "purchaseMgr",
    components: {
        "tags-wall": tagsWall,
        "purchase-items-list":purchaseItemsList,
        "sale-order": saleOrder

    },
    methods: {
      addChainItemHandler: function(laneType){
        alert(laneType);
      }
    },
    data:function(){
      return {
        top: 80,
        bottom: 50,
      };
    }
}
</script>

