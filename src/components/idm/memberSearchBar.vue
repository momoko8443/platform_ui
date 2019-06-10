<template>
    <a-row type="flex" justify="center" :gutter="8">
        <a-col :span="20"> 
            <a-select
                showSearch
                :value="value"
                placeholder="input search text"
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
import jsonp from 'fetch-jsonp';
import reqwest from 'reqwest';
import querystring from 'querystring';

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`https://suggest.taobao.com/sug?${str}`)
      .then(response => response.json())
      .then((d) => {
        if (currentValue === value) {
          const result = d.result;
          const data = [];
          result.forEach((r) => {
            data.push({
              value: r[0],
              text: r[0],
            });
          });
          callback(data);
        }
      });
  }

  timeout = setTimeout(fake, 300);
}
export default {
  data() {
    return {
      data: [],
      value: undefined,
    }
  },
  methods: {
    handleSearch (value) {
      fetch(value, data => this.data = data);
    },
    handleChange (value) {
      console.log(value)
      this.value = value
      fetch(value, data => this.data = data);
    },
    addMember (){
        
    }
  }
}
</script>
