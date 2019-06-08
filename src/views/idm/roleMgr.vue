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
          <a slot="actions" @click="editHandler">复制</a>
          <a slot="actions" @click="editHandler">编辑</a>
          <a slot="actions">移除</a>
          <!-- <a slot="actions">more</a> -->
          <a-list-item-meta >
            <a slot="title" :href="item.href">{{item.roleName}}</a>
            <a-avatar slot="avatar" style="backgroundColor:#87d068">{{item.roleName.substr(0,2)}}</a-avatar>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-col>
    <a-col :span="4"></a-col>
    <role-edit-form :visible.sync="visible"></role-edit-form>
  </a-row>
</template>
<script>
import reqwest from 'reqwest'
import roleEditForm from '../../components/idm/roleEditForm'

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
      visible: false
    }
  },
  mounted () {
    this.getData((res) => {
      this.loading = false;
      this.data = res.records;
      this.total = res.total;
    })
  },
  methods: {
    getData  (callback) {
      reqwest({
        url: url + '?currentPage='+this.currentPage+'&pageSize='+this.pageSize,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
          callback(res)
        },
      })
    },
    loadMoreByPage (current) {
      this.currentPage = current;
      this.getData((res) => {
        this.loading = false
        this.data = res.records;
        this.total = res.total;
      })
    },
    editHandler() {
      this.visible = true;
    },
    addRole(){
      this.visible = true;
    }
  }
}
</script>

