<template>
    <div>
        <!-- <a-button type="primary" @click="showDrawer">
        <a-icon type="plus"/>添加
        </a-button>-->
        <a-drawer
            title="创建新角色"
            :width="680"
            @close="onClose"
            :visible="visible"
            :wrapStyle="{
        height: 'calc(100% - 108px)',
        overflow: 'auto',
        paddingBottom: '108px'
      }"
        >
            <a-card title="角色名称">
                <div>

                    <a-input placeholder="请输入角色名称" v-model="role.roleName"></a-input>
                    <div class="text-message" v-if="!role.roleName">必输项</div>
                </div>
            </a-card>
            <a-card title="成员分配" :style="{ marginTop: '16px' }">
                <div>
                    <!-- <a-checkbox
                :indeterminate="indeterminate"
                @change="onCheckAllChange"
                :checked="checkAll">全选
            </a-checkbox>
                    <br>-->
                    <a-checkbox-group
                        :options="plainOptions"
                        v-model="checkedList"
                        @change="onChange"
                    />
                    <div class="text-message" v-if="isUserList">至少选择一项</div>
                </div>
            </a-card>
            <a-card title="权限分配" :style="{ marginTop: '16px' }">
                <div class="text-message" v-if="isCheckTest">至少选择一项</div>

                <div>
                    <a-tabs :activeKey="selectedAppId" @change="selectedAppIdChanged">
                        <a-tab-pane :tab="app.appName" v-for="app in applicationsMap" :key="app.id">
                            <a-tree
                                @select="onSelect"
                                checkable
                                v-model="checkedKeys"
                                :treeData="app.treeData"
                            />
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </a-card>

            <a-divider/>
            <div
                :style="{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right'
                    }"
                >
                <a-button :style="{ marginRight: '8px' }" @click="onClose">取消</a-button>
                <a-button @click="onSave" type="primary">保存</a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import { constants } from 'crypto';
const plainOptions = [];
const url = '/benyun/api/members';
const url2 = '/benyun/api/applications';
const url3 = '/benyun/api/roles';
const treeData = [];
export default {
    name: "roleEditForm",
    components: {},
    props: {
        visible: Boolean,//控制edit面板显示不显示
        role:Object  //role对象，如果是新建role，则传入一个默认的新role，如果是编辑，则传入需要编辑的role对象
    },
    watch: { 
        role: function(newVal, oldVal) { // watch it
            let role = newVal;
            this.checkedList = role.userList; //checkedList就是用来显示这个role下的成员
            console.log('bbb');
            //先去拿租户下所有 app
            this.getAllApplications((result)=>{
                //由于返回的app list是数组形式，不利于后期查找，所以这里用for循环把它变成一个map结构
                for (let i = 0; i < result.length; i++) {
                    const app = result[i];
                    app.id = ''+app.id;
                    this.applicationsMap[''+app.id] = app;
                }
                this.selectedAppId = ''+result[0].id; //第一个app为默认选中的app

                let self = this;
                //接下去拿默认选择app的完整权限树
                this.getAllPermissionByApp(this.selectedAppId, (result)=>{
                        //因为拿回来的权限树的数据机构跟antd tree能用的不太一样，这里用全文替换的方式把里面一些key的名字换掉，方便antd tree展示。
                        let tmp = JSON.stringify(result).replace(new RegExp('name','g'), 'title');
                        tmp = tmp.replace(new RegExp('id','g'), 'key');
                        result = JSON.parse(tmp);
                        self.applicationsMap[self.selectedAppId].treeData = result;
                        //end

                        //接下去拿父组件传入的role对象里面，上一次用户勾选的permission集合。
                        //然后上面99行我们定义了一个map对象，同样把上一次用户勾选的permission也存放在这个map里便于我们日后使用
                        for (let i = 0; i < role.reqRoleDtoReqs.length; i++) {
                            const item = role.reqRoleDtoReqs[i];
                            const app = self.applicationsMap[''+item.appId];
                            let pemssionIdsString = [];
                            for(let j=0;j<item.pemssionIds.length; j++){
                                pemssionIdsString.push(''+item.pemssionIds[j]);
                            }
                            app.checkedKeys = pemssionIdsString;//item.pemssionIds;
                        }
                        //checkedKeys是tree展示被选中tree叶子节点的集合，这里我们把默认选中的那些permission赋给它
                        self.checkedKeys =  self.applicationsMap[self.selectedAppId].checkedKeys;
                    });
                });
        },
        checkedKeys: function(newVal, oldVal){
            this.applicationsMap[this.selectedAppId].checkedKeys = newVal;
        }
    },
    mounted () {
        this.getAllMembers((result)=>{
            //console.log(result.records);
            let tmpMap = {};
            this.members = result.filter((val, index, array)=>{
                if(!tmpMap[val.id]){
                    tmpMap[val.id] = true;
                    return true;
                }
            });
            let membersOpions = [];
            for (let i = 0; i < this.members.length; i++) {
                const member = this.members[i];
                membersOpions.push({label: member.userName,value:member.id});    
            }
            this.plainOptions = membersOpions;
        });
    },
    data() {
        return {
            isCheckTest:false,
            isUserList:false,
            form: this.$form.createForm(this),
            indeterminate: true,
            checkAll: false,
            plainOptions,
            treeData,
            expandedKeys: [],
            autoExpandParent: true,
            members: [],
            applicationsMap: {},
            //appWtihPermMap:{},
            selectedAppId: '0',
            checkedList:[],
            checkedKeys:[]
        };
    },
    computed: {
    },
    methods: {
        onSelect(selectedKeys, info){
            console.log("selectedKeys",selectedKeys);
        },
        //当app切换的时候，比如php切换到java erp，我们需要去取新app的完全权限树
        selectedAppIdChanged(activeKey){
            activeKey = '' + activeKey;
            this.selectedAppId = activeKey;
            let self = this;
            if(!self.applicationsMap[self.selectedAppId].treeData || self.applicationsMap[self.selectedAppId].treeData.length === 0){
                //这里逻辑类似line108
                self.getAllPermissionByApp(activeKey, (result)=>{
                    let tmp = JSON.stringify(result).replace(new RegExp('name','g'), 'title');
                    tmp = tmp.replace(new RegExp('id','g'), 'key');
                    result = JSON.parse(tmp);
                    self.applicationsMap[activeKey].treeData = result;
                    self.applicationsMap = Object.assign({}, self.applicationsMap);
                    self.checkedKeys = self.applicationsMap[activeKey].checkedKeys || [];
                });
            }else{
                self.checkedKeys = self.applicationsMap[activeKey].checkedKeys || [];
            }
            
        },
        onClose() {
            //this.visible = false;
            this.isCheckTest = false;
            this.$emit("update:visible", false);
        },
        onChange(checkedList) {
            this.indeterminate =
                !!checkedList.length &&
                checkedList.length < plainOptions.length;
            this.checkAll = checkedList.length === plainOptions.length;

            if(!this.checkedList.length){
                this.isUserList = true;
            }else{
                this.isUserList = false;
            }
        },
        onCheckAllChange(e) {
            Object.assign(this, {
                checkedList: e.target.checked ? plainOptions : [],
                indeterminate: false,
                checkAll: e.target.checked
            });
        },
        onExpand(expandedKeys) {
            console.log("onExpand", expandedKeys);
            // if not set autoExpandParent to false, if children expanded, parent can not collapse.
            // or, you can remove all expanded children keys.
            this.expandedKeys = expandedKeys;
            this.autoExpandParent = false;
        },
        onCheck(checkedKeys) {
            let app = this.applicationsMap[this.selectedAppId];
            app.checkedKeys = checkedKeys || [];
        },
        onSave(){
            //console.log(JSON.stringify(this.role));
            this.role.userList = this.checkedList;
            this.role.reqRoleDtoReqs = [];
            for(const key in this.applicationsMap){
                
                const app = this.applicationsMap[key];
                if(app.checkedKeys){
                    let a = {};
                    a.appId = key;
                    a.pemssionIds = app.checkedKeys;
                    this.role.reqRoleDtoReqs.push(a);
                }          
            }
            //如果有roleId说明是更新，走put方法
            if(this.role.roleId){
                if(!this.role.roleName){
                    return false;
                }
                if(!this.role.userList.length){
                    this.isUserList = true;
                    return false;
                }else{
                    this.isUserList = false;
                }
                if(!this.isCheck(this.role.reqRoleDtoReqs)){
                    this.isCheckTest = true;
                    return false;
                }else{
                    this.isCheckTest = false;
                }
                axios({
                    url: url3 + '/' + this.role.roleId,
                    responseType: 'json',
                    method: 'put',
                    data: this.role,
                    headers: { 'content-type': 'application/json'}
                }).then((res) => {
                    if(!res.errors){
                        this.$emit('saveRoleSuccess');
                    }
                },(err)=>{
                    let { message} = err;
                    message.error(message);
                });
            }else{
                //如果没有roleId说明是一个新的role，走post方法
                //create a new role
                this.role.tenantId = Vue.currentTenantId;
                if(!this.role.roleName){
                    return false;
                }
                if(!this.role.userList.length){
                    this.isUserList = true;
                    return false;
                }else{
                    this.isUserList = false;
                }
                if(!this.isCheck(this.role.reqRoleDtoReqs)){
                    this.isCheckTest = true;
                    return false;
                }else{
                    this.isCheckTest = false;
                }
                axios({
                    url: url3,
                    type: 'json',
                    method: 'post',
                    data: this.role,
                    headers: { 'content-type': 'application/json'}
                }).then((res) => {

                    if(!res.errors){
                        this.$emit('saveRoleSuccess');
                    }
                },(err)=>{
                    let { message} = err;
                    message.error(message);
                });
            }
        },
        //获取租户下所有成员
        getAllMembers(callback) {
            axios({
                url: url + '?currentPage=1'+this.currentPage+'&pageSize=999',
                responseType: 'json',
                method: 'get',
                //headers: { 'content-type': 'application/json'}
            }).then((res) => {
                callback(res.data.records)
            });
        },
        //获取租户下所有app
        getAllApplications(callback) {
            axios({
                url: url2,
                responseType: 'json',
                method: 'get',
                //headers: { 'content-type': 'application/json'}
            }).then((res) => {
                callback(res.data)
            });
        },
        //根据appId获取该app下的所有权限树
        getAllPermissionByApp(appId,callback){
            axios({
                url: url2 + '/' + appId + "/permissions?tenantId=" + Vue.currentTenantId,
                responseType: 'json',
                method: 'get',
                //headers: { 'content-type': 'application/json'}
            }).then((res) => {
                let arr = this.changeStrId(res.data);
                callback(arr);
            });
        },
        //id转为字符串
        changeStrId(arr){
            if(arr.length){
              for(let i = 0; i<arr.length; i++){
                  arr[i].id = String(arr[i].id);
                  if(arr[i].children.length){
                    this.changeStrId(arr[i].children);
                  }
              }
            }
            return arr;
        },
        //判断是否选择
        isCheck(arr){
            let result = false;
            if(arr.length){
                for(let i = 0 ;i<arr.length;i++){
                    if(arr[i].pemssionIds.length){
                        result = true;
                        break;
                    }
                }
            }
            return result;
        }
    }
};
</script>
<style scoped>
    .text-message{
        font-size: 14px;
        color: red;
    }
</style>