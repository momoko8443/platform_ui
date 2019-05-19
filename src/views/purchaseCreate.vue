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
                <purchase-order></purchase-order>
               </a-affix>
             </a-col>
           </a-row>
          
      </a-col>
    </a-row>
</template>
<script>
import tagsWall from "../components/erp/tagsWall";
import purchaseItemsList from "../components/erp/purchaseItemsList";
import purchaseOrder from "../components/erp/purchaseOrder";
export default {
    name: "purchaseMgr",
    components: {
        "tags-wall": tagsWall,
        "purchase-items-list":purchaseItemsList,
        "purchase-order": purchaseOrder

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
        storeItems:
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

