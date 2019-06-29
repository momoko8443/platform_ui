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
                <div class="text-message" v-if="!checkedKeys.length">至少选择一项</div>
                <div>
                    <a-tabs :activeKey="selectedAppId" @change="selectedAppIdChanged">
                        <a-tab-pane :tab="app.appName" v-for="app in applicationsMap" :key="app.id">
                            <a-tree
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
        visible: Boolean,
        role:Object
    },
    watch: { 
        role: function(newVal, oldVal) { // watch it
            let role = newVal;
            this.checkedList = role.userList;
            console.log('bbb');
            //console.log(JSON.stringify(this.applicationsMap));
            this.getAllApplications((result)=>{
                for (let i = 0; i < result.length; i++) {
                    const app = result[i];
                    app.id = ''+app.id;
                    this.applicationsMap[''+app.id] = app;
                }
                this.selectedAppId = ''+result[0].id;
                

                let self = this;
                this.getAllPermissionByApp(this.selectedAppId, (result)=>{
                        let tmp = JSON.stringify(result).replace(new RegExp('name','g'), 'title');
                        tmp = tmp.replace(new RegExp('id','g'), 'key');
                        result = JSON.parse(tmp);
                        self.applicationsMap[self.selectedAppId].treeData = result;
                        
                        for (let i = 0; i < role.reqRoleDtoReqs.length; i++) {
                            const item = role.reqRoleDtoReqs[i];
                            const app = self.applicationsMap[''+item.appId];
                            let pemssionIdsString = [];
                            for(let j=0;j<item.pemssionIds.length; j++){
                                pemssionIdsString.push(''+item.pemssionIds[j]);
                            }
                            app.checkedKeys = pemssionIdsString;//item.pemssionIds;
                        }
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
        selectedAppIdChanged(activeKey){
            activeKey = '' + activeKey;
            this.selectedAppId = activeKey;
            let self = this;
            if(!self.applicationsMap[self.selectedAppId].treeData || self.applicationsMap[self.selectedAppId].treeData.length === 0){
                
                self.getAllPermissionByApp(activeKey, (result)=>{
                    let tmp = JSON.stringify(result).replace(new RegExp('name','g'), 'title');
                    tmp = tmp.replace(new RegExp('id','g'), 'key');
                    result = JSON.parse(tmp);
                    self.applicationsMap[activeKey].treeData = result;
                    self.applicationsMap = Object.assign({}, self.applicationsMap);
                    self.checkedKeys = self.applicationsMap[activeKey].checkedKeys;
                });
            }else{
                self.checkedKeys = self.applicationsMap[activeKey].checkedKeys;
            }
            
        },
        onClose() {
            //this.visible = false;
            this.$emit("update:visible", false);
        },
        onChange(checkedList) {
            this.indeterminate =
                !!checkedList.length &&
                checkedList.length < plainOptions.length;
            this.checkAll = checkedList.length === plainOptions.length;
            //console.log(checkedList);
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
            console.log("onCheck", checkedKeys);
            let app = this.applicationsMap[this.selectedAppId];
            app.checkedKeys = checkedKeys;

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
            
            if(this.role.roleId){
                //update an exists role
                if(!this.role.userList.length){
                    this.isUserList = true;
                    return false;
                }else{
                    this.isUserList = false;
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
                //create a new role
                this.role.tenantId = Vue.currentTenantId;
                if(!this.role.userList.length){
                    this.isUserList = true;
                    return false;
                }else{
                    this.isUserList = false;
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
        getAllPermissionByApp(appId,callback){
            axios({
                url: url2 + '/' + appId + "/permissions?tenantId=" + Vue.currentTenantId,
                responseType: 'json',
                method: 'get',
                //headers: { 'content-type': 'application/json'}
            }).then((res) => {
                callback(res.data)
            });
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