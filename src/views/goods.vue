<template>
    <a-row type="flex" justify="center" :gutter="50">
      <a-col :span="4">
          <h4>分类标签</h4>
          <tags-wall></tags-wall>
      </a-col>
      <a-col :span="12" :pull="1">
          <div style="text-align:right"> 
              <goods-create></goods-create>
          </div>
          <div>
              <goods-list></goods-list>
          </div>
      </a-col>
    </a-row>
</template>
<script>
import tagsWall from "../components/erp/tagsWall";
import goodsList from "../components/erp/goodsList";
import goodsCreate from '../components/erp/goodsCreate';
export default {
    name: "goods",
    components: {
        "tags-wall": tagsWall,
        "goods-list": goodsList,
        "goods-create": goodsCreate
    }
}
</script>

