<template>
    <a-row type="flex" justify="center" :gutter="50">
      <a-col :span="4">
          <!-- <h4>角色列表</h4>
          <tags-wall></tags-wall> -->
      </a-col>
      <a-col :span="16">
          <member-search-bar @addUserToMember="addUserToMemberHandler"></member-search-bar>
          <a-divider />
          <member-list ref="memberList"></member-list>
      </a-col>
      <a-col :span="4">
          
      </a-col>
    </a-row>
</template>
<script>
import memberList from "../../components/idm/memberList";
import memberSearchBar from "../../components/idm/memberSearchBar";
import tagsWall from "../../components/common/tagsWall";
import axios from 'axios';
import Vue from 'vue';

const url = '/benyun/api/members';
export default {
    name: "memberMgr",
    components: {
      "member-list":memberList,
      "member-search-bar": memberSearchBar,
      "tags-wall": tagsWall
    },
    methods: {
      addUserToMemberHandler(mobile){
        axios({
          url:url,
          method:'post',
          data:{
            mobile: mobile,
            tenantId: Vue.currentTenantId
          },
        }).then((result)=>{
          this.$refs.memberList.refreshList();
        })
      }
    }
}
</script>

