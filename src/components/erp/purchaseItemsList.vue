<template>
  <a-list
    class="demo-loadmore-list"
    :loading="loading"
    itemLayout="horizontal"
    :dataSource="data"
  >
    <div v-if="showLoadingMore" slot="loadMore" :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
      <a-spin v-if="loadingMore" />
      <a-button v-else @click="onLoadMore">加载更多</a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item">
      <a slot="actions">
          <a-button shape="circle" icon="shopping-cart" @click="addCartHandler(item)"/>
      </a>
      <!-- <a slot="actions">more</a> -->
      <a-list-item-meta
        :description="item.description"
      >
        <a slot="title" href="https://vue.ant.design/">{{item.name}}</a>
        <a-avatar slot="avatar" v-bind:src="item.pictures[0]" />
      </a-list-item-meta>
      <!-- <div>content</div> -->
    </a-list-item>
  </a-list>
</template>
<script>
import reqwest from 'reqwest'
import EventsName from '../../constants/eventsName.js';
import eventBus from '../../utils/eventBus.js';
const url = '/api/goods';

export default {
  name: "purchaseItemsList",
  data () {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
    }
  },
  mounted () {
    this.getData((res) => {
      this.loading = false
      this.data = res
    })
  },
  methods: {
    addCartHandler(item) {
      //alert(item.name);
      eventBus.$emit(EventsName.ADD_PURCHARSE_ORDER_ITEM_TO_CART, item);
    },
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
        this.data = this.data.concat(res)
        this.loadingMore = false
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    },
  },
}
</script>
<style>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
