<template>
    <a-row type="flex" justify="center" :gutter="8">
        <a-col :span="20"> 
            <a-select
                showSearch
                :value="value"
                placeholder="根据手机号查询用户"
                style="width: 100%"
                :defaultActiveFirstOption="false"
                :showArrow="false"
                :filterOption="false"
                @search="handleSearch"
                @change="handleChange"
                :notFoundContent="null"
            >
                <a-select-option v-for="d in data" :key="d.value">{{d.text}}</a-select-option>
            </a-select>
        </a-col>
        <a-col :span="4">
            <a-button type="primary" @click="addMember">
                <a-icon type="plus"/>添加
            </a-button>
        </a-col>
    </a-row>
</template>
<script>
//import jsonp from 'fetch-jsonp';
//import reqwest from 'reqwest';
import axios from 'axios';
import querystring from 'querystring';
import { validatenull } from '@/utils/validate';

let timeout;
let currentValue;
let currentPage = 1;
let pageSize = 10;
let url = '/benyun/api/users';
function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    // const str = querystring.encode({
    //   code: 'utf-8',
    //   q: value,
    // });
    axios({
        url: url,
        responseType: 'json',
        method: 'get',
        params:{
            currentPage: currentPage,
            pageSize: pageSize,
            mobile: value
        }
      }).then((res) => {
          if (currentValue === value) {
            let {records} = res.data;
            const result = records;
            let newdata = [];
            if(result.length){
                result.forEach((r) => {
                    newdata.push({
                        value: r['userName'],
                        text: r['userName']
                    });
                });
                callback(newdata);
            }
          }
      });
  }
  timeout = setTimeout(fake, 300);
}
export default {
  data() {
    return {
      data: [],
      value: undefined
    }
  },
  methods: {
    handleSearch (value) {
      fetch(value, data => this.data = data);
    },
    handleChange (value) {
      this.value = value
        fetch(value, data => this.data = data);
    },
    addMember (){
        if(validatenull(this.value)){
            this.$message.warning('请选择你要添加的成员');
            return false;
        }
       this.$emit('addUserToMember', currentValue);
    }
  }
}
</script>
