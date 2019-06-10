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
                    <a-input placeholder="请输入角色名称" v-model="roleName"></a-input>
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
                </div>
            </a-card>
            <a-card title="权限分配" :style="{ marginTop: '16px' }">
                <div>
                    <a-select style="width: 120px" v-model="selectedAppId" @change="selectedAppIdChanged">
                        <a-select-option v-for="app in applications" :key="app.id">{{app.appName}}</a-select-option>
                    </a-select>
                    <br>
                    <br>
                    <!-- <div>
                <a-checkbox
                :indeterminate="indeterminate"
                @change="onCheckAllChange"
                :checked="checkAll"
                >全选</a-checkbox>
            </div>
                    <br>-->
                    <!-- <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange"/> -->
                    <a-tree
                        checkable
                        @expand="onExpand"
                        :expandedKeys="expandedKeys"
                        :autoExpandParent="autoExpandParent"
                        v-model="checkedKeys"
                        @select="onSelect"
                        :selectedKeys="selectedKeys"
                        :treeData="treeData"
                    />
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
                <a-button @click="onSave" type="primary">创建</a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>

import axios from 'axios';
const plainOptions = [];
const defaultCheckedList = [];
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
            for (let i = 0; i < role.reqRoleDtoReqs.length; i++) {
                const item = role.reqRoleDtoReqs[i];
                this.appWtihPermMap[item.appId] = item.pemssionIds;
            }
        }
    },
    mounted () {
        this.getAllMembers((result)=>{
            //console.log(result.records);
            this.members = result.records;
            let membersOpions = [];
            for (let i = 0; i < this.members.length; i++) {
                const member = this.members[i];
                membersOpions.push({label: member.userName,value:member.id});    
            }
            this.plainOptions = membersOpions;
        });
        this.getAllApplications((result)=>{
            this.applications = result; 
            let defaultAppId = this.applications[0].id;
            this.getAllPermissionByApp(defaultAppId, (result)=>{
                let tmp = JSON.stringify(result).replace(new RegExp('name','g'), 'title');
                tmp = tmp.replace(new RegExp('id','g'), 'key');
                result = JSON.parse(tmp);
                this.treeData = result;
            });
        });
    },
    data() {
        return {
            form: this.$form.createForm(this),
            indeterminate: true,
            checkAll: false,
            plainOptions,
            treeData,
            expandedKeys: [],
            autoExpandParent: true,
            selectedKeys: [],
            members: [],
            applications: [],
            appWtihPermMap:{},
            pSelectedAppId: 0
        };
    },
    computed: {
        roleName:{
            get(){
                return this.role.roleName;
            },
            set(val){
                this.role.roleName = val;
            }
        },
        selectedAppId:{
            get(){
                if(!this.pSelectedAppId){
                    this.pSelectedAppId = this.role.reqRoleDtoReqs[0].appId;
                }           
                return this.pSelectedAppId;
            },
            set(val){
                if(!this.appWtihPermMap[val]){
                    this.appWtihPermMap[val] = []
                };
                this.pSelectedAppId = val;
            }
        },
        checkedList:{
            get(){
                return  this.role.userList;
            },
            set(val){
                this.role.userList = val;
            }
        },
        checkedKeys:{
            get(){
                return this.appWtihPermMap[this.selectedAppId]//this.role.reqRoleDtoReqs[0].pemssionIds;
            },
            set(val){
                this.appWtihPermMap[this.selectedAppId] = val;
                //this.p_checkedKeys = val;
            }
        }
    },
    methods: {
        selectedAppIdChanged(){
            this.getAllPermissionByApp(this.selectedAppId, (result)=>{
                let tmp = JSON.stringify(result).replace(new RegExp('name','g'), 'title');
                tmp = tmp.replace(new RegExp('id','g'), 'key');
                result = JSON.parse(tmp);
                this.treeData = result;
            });
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
            this.checkedKeys = checkedKeys;

        },
        onSelect(selectedKeys, info) {
            console.log("onSelect", info);
            this.selectedKeys = selectedKeys;
        },
        onSave(){
            console.log(JSON.stringify(this.role));
            if(this.role.roleId){
                //update an exists role
                axios({
                    url: url3,
                    responseType: 'json',
                    method: 'put',
                    data: JSON.stringify(this.role),
                    headers: { 'content-type': 'application/json'}
                }).then((res) => {
                    if(!res.errors){
                        this.$emit('saveRoleSuccess');
                    }
                });
            }else{
                //create a new role
                axios({
                    url: url3,
                    type: 'json',
                    method: 'post',
                    data: JSON.stringify(this.role),
                    headers: { 'content-type': 'application/json'}
                }).then((res) => {
                    if(!res.errors){
                        this.$emit('saveRoleSuccess');
                    }
                });
            }
        },
        getAllMembers(callback) {
            axios({
                url: url + '?currentPage=1'+this.currentPage+'&pageSize=999',
                responseType: 'json',
                method: 'get',
                headers: { 'content-type': 'application/json'}
            }).then((res) => {
                callback(res.data)
            });
        },
        getAllApplications(callback) {
            axios({
                url: url2,
                responseType: 'json',
                method: 'get',
                headers: { 'content-type': 'application/json'}
            }).then((res) => {
                callback(res.data)
            });
        },
        getAllPermissionByApp(appId,callback){
            axios({
                url: url2 + '/' + appId + "/permissions",
                responseType: 'json',
                method: 'get',
                headers: { 'content-type': 'application/json'}
            }).then((res) => {
                callback(res.data)
            });
        }
    }
};
</script>
