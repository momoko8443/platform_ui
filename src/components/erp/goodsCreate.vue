<template>
  <div>
    <a-button type="primary" @click="showDrawer">
      <a-icon type="plus"/>添加
    </a-button>
    <a-drawer
      title="创建一种物品"
      :width="480"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="form" layout="vertical" hideRequiredMark>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="名称">
              <a-input
                v-decorator="['name', {
                  rules: [{ required: true, message: '请输入名称' }]
                }]"
                placeholder="请输入名称"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="编号">
              <a-input
                v-decorator="['code', {
                  rules: [{ required: true, message: '请输入编号' }]
                }]"
                style="width: 100%"
                placeholder="请输入编号"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="图片">
              <picture-uploader></picture-uploader>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="标签">
              <tags-bar></tags-bar>
              <!-- <a-select
                v-decorator="['owner', {
                  rules: [{ required: true, message: 'Please select an owner' }]
                }]"
                placeholder="Please a-s an owner"
              >
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select> -->
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
import pictureUploader from './pictureUploader';
import customField from './customField';
export default {
  name: "goodsCreate",
  components:{
    "tags-bar":tagsBar,
    "picture-uploader": pictureUploader,
    "custom-field": customField
  },
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false
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
