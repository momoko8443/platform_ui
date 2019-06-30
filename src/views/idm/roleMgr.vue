<template>
  <a-row type="flex" justify="center" :gutter="50">
    <a-col :span="4">
      <!-- <h4>分类标签</h4>
      <tags-wall></tags-wall>-->
    </a-col>
    <a-col :span="16">
      <!-- <a-row type="flex" justify="center" :gutter="8">
        <a-col :span="20">
          <a-input placeholder="请输入角色名"/>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="addRole">
            <a-icon type="plus"/>添加
          </a-button>
        </a-col>
      </a-row> -->
      <a-button type="primary" @click="addRole">
        <a-icon type="plus"/>添加
      </a-button>
      <a-divider/>
      <!-- <member-list></member-list> -->
      <a-list
        class="demo-loadmore-list"
        :loading="loading"
        itemLayout="horizontal"
        :dataSource="data"
      >
        <div slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
          <a-pagination :current="currentPage"
          :pageSize="pageSize"
          :total="total" @change="loadMoreByPage"/>
        </div>
        <a-list-item slot="renderItem" slot-scope="item">
          <!-- <a slot="actions" @click="copyHandler">复制</a> -->
          <a slot="actions" @click="editHandler(item.id)">编辑</a>
          <a-popconfirm slot="actions" title="是否确定要删除?" @confirm="confirm(item.id)" @cancel="cancel" okText="是" cancelText="否">
            <a href="javascript:;">移除</a>
          </a-popconfirm>
          <!-- <a slot="actions" @click="removeHandler(item.id)">移除</a> -->
          <!-- <a slot="actions">more</a> -->
          <a-list-item-meta >
            <a slot="title" :href="item.href">{{item.roleName}}</a>
            <!--<a-avatar slot="avatar" style="backgroundColor:#87d068">{{item.roleName.substr(0,2)}}</a-avatar>-->
            <img slot="avatar" src="http://i1.fuimg.com/670436/086887467510daa5.png" alt="">
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-col>
    <a-col :span="4"></a-col>
    <role-edit-form :visible.sync="visible" :role="currentRole" @saveRoleSuccess="refreshHandler"></role-edit-form>
  </a-row>
</template>
<script>
import axios from 'axios';
import roleEditForm from '../../components/idm/roleEditForm';
import Vue from 'vue';
const url = '/benyun/api/roles';

export default {
  name: "roleMgr",
  components: {
      "role-edit-form": roleEditForm
  },
  data () {
    return {
      loading: true,
      loadingMore: false,
      currentPage: 1,
      total:0,
      pageSize:3,
      data: [],
      visible: false,
      currentRole: {
        roleName:"",
        userList: [],
        reqRoleDtoReqs: [
          {"appId": 5,"pemssionIds": []}
        ]
      }
    }
  },
  mounted () {
    this.refreshHandler()
  },
  methods: {
    getData  (callback) {
      axios({
        url: url + '?tenantId=' + Vue.currentTenantId +'&currentPage='+this.currentPage+'&pageSize='+this.pageSize,
        responseType: 'json',
        method: 'get',
        //headers: { 'content-type': 'application/json'},
      }).then((res) => {
          callback(res.data)
      });
    },
    getRoleById (roleId, callback){
      axios({
        url: url + '/'+roleId,
        responseType: 'json',
        method: 'get',
        //headers: { 'content-type': 'application/json'},
      }).then((res) => {
        console.log(res);
        //this.$message.error(`出错啦!`);
        callback(res.data);
      }).catch((error)=>{
        //this.$message.error(`出错啦!${error.response.code}:${error.response.message}`);
      });
    },
    loadMoreByPage (current) {
      this.currentPage = current;
      this.getData((res) => {
        this.loading = false
        this.data = res.records;
        this.total = res.total;
      })
    },
    editHandler(id) {
      this.getRoleById(id,(roleDetail)=>{
        this.visible = true;
        this.currentRole = roleDetail;
      });
    },
    confirm(id){
      this.removeHandler(id);
    },
    cancel(){

    },
    removeHandler(id) {
      axios({
        url: url + '/' + id,
        responseType: 'json',
        method: 'delete',
        //headers: { 'content-type': 'application/json'},
      }).then((res) => {
          let {code} = res.data;
          if(code == 0){
              this.refreshHandler();
          }
      });
    },
    addRole(){
      this.visible = true;
      this.currentRole = {
        roleName:"",
        userList: [],
        reqRoleDtoReqs: [
          {"appId": 5,"pemssionIds": []}
        ]
      };
    },
    refreshHandler(){
      this.currentPage =  1;
      this.getData((res) => {
        this.visible = false;
        this.loading = false;
        this.data = res.records;
        this.total = res.total;
      })
    }
  }
}
</script>

