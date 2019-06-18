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
                </div>
            </a-card>
            <a-card title="权限分配" :style="{ marginTop: '16px' }">
                <div>
                    <!-- <a-select style="width: 120px" v-model="selectedAppId" @change="selectedAppIdChanged">
                        <a-select-option v-for="app in applications" :key="app.id">{{app.appName}}</a-select-option>
                    </a-select>
                    <br>
                    <br> -->
                    <!-- <div>
                <a-checkbox
                :indeterminate="indeterminate"
                @change="onCheckAllChange"
                :checked="checkAll"
                >全选</a-checkbox>
            </div>
                    <br>-->
                    <!-- <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange"/> -->
                    <!-- <a-tree
                        checkable
                        @expand="onExpand"
                        :expandedKeys="expandedKeys"
                        :autoExpandParent="autoExpandParent"
                        v-model="checkedKeys"
                        @select="onSelect"
                        :selectedKeys="selectedKeys"
                        :treeData="treeData"
                    /> -->
                    <a-tabs :defaultActiveKey="defaultAppId" @change="selectedAppIdChanged">
                        <a-tab-pane :tab="app.appName" v-for="app in applicationsMap" :key="app.id">
                            <!-- {{app.appName}} -->
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
                <a-button @click="onSave" type="primary">创建</a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import Vue from 'vue';
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
                const app = this.applicationsMap[item.appId];
                app.checkedKeys = item.pemssionIds;
            }
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
        this.getAllApplications((result)=>{
            this.applications = result; 
            this.selectedAppId = this.applications[0].id;
            this.defaultAppId = this.selectedAppId;
            this.getAllPermissionByApp(this.defaultAppId, (result)=>{
                let tmp = JSON.stringify(result).replace(new RegExp('name','g'), 'title');
                tmp = tmp.replace(new RegExp('id','g'), 'key');
                result = JSON.parse(tmp);
                this.applications[0].treeData = result;
                for (let i = 0; i < this.applications.length; i++) {
                    const app = this.applications[i];
                    this.applicationsMap[app.id] = app;
                    if(!app.treeData){
                        app.treeData = [];
                    }
                    this.checkedKeys = app.checkedKeys;
                }
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
            members: [],
            applications: [],
            applicationsMap: {},
            //appWtihPermMap:{},
            selectedAppId: 0,
            checkedList:[],
            defaultAppId:0,
            checkedKeys:[]
        };
    },
    computed: {
        
    },
    methods: {
        selectedAppIdChanged(activeKey){
            this.selectedAppId = activeKey;
            if(!this.applicationsMap[this.selectedAppId].treeData || this.applicationsMap[this.selectedAppId].treeData.length === 0){
                let self = this;
                this.getAllPermissionByApp(activeKey, (result)=>{
                    let tmp = JSON.stringify(result).replace(new RegExp('name','g'), 'title');
                    tmp = tmp.replace(new RegExp('id','g'), 'key');
                    result = JSON.parse(tmp);
                    self.applicationsMap[activeKey].treeData = result;
                    self.applicationsMap = Object.assign({}, self.applicationsMap);
                    self.checkedKeys = self.applicationsMap[activeKey].checkedKeys;
                });
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
                let a = {};
                a.appId = key;
                a.pemssionIds = app.checkedKeys;
                this.role.reqRoleDtoReqs.push(a);
            }
            
            if(this.role.roleId){
                //update an exists role
                axios({
                    url: url3,
                    responseType: 'json',
                    method: 'put',
                    data: JSON.stringify(this.role),
                    //headers: { 'content-type': 'application/json'}
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
                    //headers: { 'content-type': 'application/json'}
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
                url: url2 + '/' + appId + "/permissions",
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
