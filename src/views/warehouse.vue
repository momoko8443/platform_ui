<template>
    <a-row type="flex" justify="center" :gutter="50">
      <a-col :span="4">
          <h4>分类标签</h4>
          <tags-wall></tags-wall>
      </a-col>
      <a-col :span="20">
          <a-row type="flex" justify="start" :gutter="8">
              <a-col :md="6" :lg="4">
                <div style="height:50px;border-top-style:solid; border-top-width:2px;border-top-color:#fe7300">
                  <h5>生产中/运输中</h5>
                </div>
                <div style="background:#d9d9d9; height:500px;">
                  <div style="height:100px;border-style:solid;border-width:5px ; border-color:#d9d9d9;background:#f5f5f5">

                  </div>
                  <div style="height:100px;border-style:solid;border-width:5px ; border-color:#d9d9d9;background:#f5f5f5">

                  </div>
                  <div style="height:100px;border-style:solid;border-width:5px ; border-color:#d9d9d9;background:#f5f5f5">

                  </div>
                </div>
              </a-col>
              <a-col :md="6" :lg="4">
                <div style="height:50px;border-top-style:solid; border-top-width:2px;border-top-color:#10239e">
                  <h5>在库</h5>
                </div>
                <div style="background:#d9d9d9; height:500px;">
                  <div style="height:100px;border-style:solid;border-width:5px ; border-color:#d9d9d9;background:#f5f5f5">

                  </div>
                  <div style="height:100px;border-style:solid;border-width:5px ; border-color:#d9d9d9;background:#f5f5f5">

                  </div>
                </div>
              </a-col>
              <a-col :md="6" :lg="4">
                <div style="height:50px;border-top-style:solid; border-top-width:2px;border-top-color:#52c41a">
                  <h5>出库中/运输中</h5>
                </div>
                <div style="background:#d9d9d9; height:500px;"></div>
              </a-col>
              <a-col :md="6" :lg="4">
                <div style="height:50px;border-top-style:solid; border-top-width:2px;border-top-color:#f5222d">
                  <h5>异常/取消</h5>
                </div>
                <div style="background:#d9d9d9; height:500px;"></div>
              </a-col>
          </a-row>
      </a-col>
    </a-row>
</template>
<script>
import tagsWall from "../components/erp/tagsWall";
export default {
    name: "warehouse",
    components: {
        "tags-wall": tagsWall,
    }
}
</script>

