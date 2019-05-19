<template>
  <div>
    <a-button type="primary" @click="showDrawer">
        <a-icon type="plus"/>添加
    </a-button>
    <a-drawer
      title="创建一条跟踪记录"
      :width="480"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="跟踪对象">
              <a-select
                v-decorator="['name', {
                  rules: [{ required: true, message: '请选择跟踪的对象' }]
                }]"
                placeholder="请选择跟踪的对象"
              >
                <a-select-option value="零件A">零件A</a-select-option>
                <a-select-option value="零件A">零件B</a-select-option>
                <a-select-option value="零件A">零件C</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="数量">
              <a-input-number :min="0" :max="999999" v-model="count"/>
            </a-form-item>
          </a-col>
        </a-row>
       
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="标签">
              <tags-bar></tags-bar>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="当前状态">
              <a-select
                v-decorator="['status', {
                  rules: [{ required: true, message: '请选择当前状态' }]
                }]"
                placeholder="请选择当前状态"
              >
                <a-select-option value="运输/生产中">运输/生产中</a-select-option>
                <a-select-option value="在库">在库</a-select-option>
                <a-select-option value="出库/运输中">出库/运输中</a-select-option>
                <a-select-option value="异常">异常</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
         <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="自定义属性">
              <custom-field></custom-field>
            </a-form-item>
          </a-col>
         </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="描述">
              <a-textarea
                v-decorator="['description', {
                  rules: [{ required: true, message: '请输入描述' }]
                }]"
                :rows="4"
                placeholder="请输入描述"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
        <a-button @click="onClose" type="primary">创建</a-button>
      </div>
    </a-drawer>
  </div>
</template>
<script>

import tagsBar from './tagsBar';
import customField from './customField';
export default {
  name: "storeChainItemCreate",
  components:{
    "tags-bar":tagsBar,
    "custom-field": customField
  },
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      count: 0
    };
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>
