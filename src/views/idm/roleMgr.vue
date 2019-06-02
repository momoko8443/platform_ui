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
        <div
          v-if="showLoadingMore"
          slot="loadMore"
          :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
        >
          <a-spin v-if="loadingMore"/>
          <a-button v-else @click="onLoadMore">加载更多</a-button>
        </div>
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions" @click="editHandler">复制</a>
          <a slot="actions" @click="editHandler">编辑</a>
          <a slot="actions">移除</a>
          <!-- <a slot="actions">more</a> -->
          <a-list-item-meta>
            <a slot="title" href="https://vue.ant.design/">{{item.name}}</a>
            <a-avatar slot="avatar" v-bind:src="item.avatar"/>
          </a-list-item-meta>
          <!-- <div>content</div> -->
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

const url = '/benyun/api/members';

export default {
  name: "roleMgr",
  components: {
      "role-edit-form": roleEditForm
  },
  data () {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      visible: false
    }
  },
  mounted () {
    this.getData((res) => {
      this.loading = false
      this.data = res
    })
  },
  methods: {
    getData  (callback) {
      reqwest({
        url: url,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: (res) => {
          callback(res)
        },
      })
    },
    onLoadMore () {
      this.loadingMore = true
      this.getData((res) => {
        this.data = this.data.concat(res.results)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    },
    addRole () {

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

