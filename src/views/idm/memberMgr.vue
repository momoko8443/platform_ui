<template>
    <a-row type="flex" justify="center" :gutter="50">
      <a-col :span="4">
          <!-- <h4>角色列表</h4>
          <tags-wall></tags-wall> -->
      </a-col>
      <a-col :span="16">
          <member-search-bar></member-search-bar>
          <a-divider />
          <member-list></member-list>
      </a-col>
      <a-col :span="4">
          
      </a-col>
    </a-row>
</template>
<script>
import memberList from "../../components/idm/memberList";
import memberSearchBar from "../../components/idm/memberSearchBar";
import tagsWall from "../../components/common/tagsWall";
export default {
    name: "memberMgr",
    components: {
      "member-list":memberList,
      "member-search-bar": memberSearchBar,
      "tags-wall": tagsWall
    },
    methods: {
      addChainItemHandler: function(laneType){
        alert(laneType);
      },
      addPurchaseOrder: function(){
          this.$router.push({name: "purchase_create"});
      }
    }
}
</script>

