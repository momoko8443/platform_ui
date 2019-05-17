<template>
    <div>
    <a-form-item
      v-for="field in fields"
      :key="field.index"
      v-bind="formItemLayout"
      :required="false"
    >
      <a-input
        v-decorator="[
          `names[${field.name}]`,
          {
            validateTrigger: ['change', 'blur'],
            preserve: true,
            rules: [{
              required: true,
              whitespace: true,
              message: '请输入名',
            }],
          }
        ]"
        placeholder="名"
        style="width: 40%; margin-right: 8px"
      />
      <a-input
        v-decorator="[
          `names[${field.value}]`,
          {
            validateTrigger: ['change', 'blur'],
            preserve: true,
            rules: [{
              required: true,
              whitespace: true,
              message: '请输入值',
            }],
          }
        ]"
        placeholder="值"
        style="width: 40%; margin-right: 8px"
      />
      <a-icon
        class="dynamic-delete-button"
        type="minus-circle-o"
        @click="() => remove(field)"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayoutWithOutLabel">
      <a-button
        type="dashed"
        style="width: 60%"
        @click="add"
      >
        <a-icon type="plus" /> 添加
      </a-button>
    </a-form-item>
    </div>
</template>

<script>
export default {
  name: "customField",  
  data () {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      },
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 },
        },
      },
      fields:[]
    };
  },
  beforeCreate () {
    //this.form = this.$form.createForm(this);
    //this.form.getFieldDecorator('keys', { initialValue: [], preserve: true });
  },
  methods: {
    remove  (item) {

      // can use data-binding to set
      this.fields = this.fields.filter((field) => {
          return field.index !== item.index;
        });
    },

    add  () {
      var i = this.fields.length;
      this.fields.push({name:"",value:"",index:i});
    },

    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          alert('Received values of form: ' + values);
        }
      });
    },
  },
};
</script>
<style>
.dynamic-delete-button {
  cursor: pointer;
  position: relative;
  top: 4px;
  font-size: 24px;
  color: #999;
  transition: all .3s;
}
.dynamic-delete-button:hover {
  color: #777;
}
.dynamic-delete-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>