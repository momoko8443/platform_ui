<template>
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
      <a-popconfirm slot="actions"  title="你确定要删除吗?" @confirm="confirm(item.id)" @cancel="cancel" okText="是" cancelText="否">
        <a href="javascript:;">移除</a>
      </a-popconfirm>
      <!-- <a slot="actions">重命名</a> -->
      <!--
        <a slot="actions" @click="removeMember(item.id)">移除</a>
      -->

      <!-- <a slot="actions">more</a> -->
      <a-list-item-meta
        :description="item.mobile"
      >
        <a slot="title">{{item.userName}}</a>
        <!--<a-avatar slot="avatar" v-bind:src="item.headImgUrl" />-->
        <img slot="avatar" src="http://i1.fuimg.com/670436/086887467510daa5.png" alt="">
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script>
import axios from 'axios'
import Vue from 'vue';
const url = '/benyun/api/members';

export default {
  name: "memberList",
  data () {
    return {
      loading: true,
      loadingMore: false,
      currentPage: 1,
      total:0,
      pageSize:10,
      data: [],
      tenantId: 1
    }
  },
  mounted () {
    this.refreshList();
  },
  methods: {
    confirm(id){
        this.removeMember(id);
    },
    cancel(){},
    refreshList(){
      this.getData((res) => {
        this.loading = false;
        this.data = res.records;
        this.total = res.total;
      })
    },
    getData(callback) {
      axios({
        url: url + '?currentPage='+this.currentPage+'&pageSize='+this.pageSize + '&tenantId=' + this.tenantId,
        responseType: 'json',
        method: 'get',
        //headers: { 'content-type': 'application/json'},
      }).then((res) => {
          callback(res.data)
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
    removeMember(id) {
      axios({
        url: url + '/' + id + '?tenantId=' + Vue.currentTenantId,
        responseType: 'json',
        method: 'delete'
        //headers: { 'content-type': 'application/json'},
      }).then((res) => {
          this.refreshList();
      });
    }
  },
}
</script>
<style>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
