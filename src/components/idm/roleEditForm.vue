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
                    <a-input placeholder="请输入角色名称"></a-input>
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
                    <a-select :defaultValue="5" style="width: 120px">
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
                <a-button @click="onClose" type="primary">创建</a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>

import reqwest from 'reqwest';
const plainOptions = ["Apple", "Pear", "Orange"];
const defaultCheckedList = ["Apple", "Orange"];
const url = '/benyun/api/members';
const url2 = '/benyun/api/applications';
const treeData = [
    {
        title: "0-0",
        key: "0-0",
        children: [
            {
                title: "0-0-0",
                key: "0-0-0",
                children: [
                    { title: "0-0-0-0", key: "0-0-0-0" },
                    { title: "0-0-0-1", key: "0-0-0-1" },
                    { title: "0-0-0-2", key: "0-0-0-2" }
                ]
            },
            {
                title: "0-0-1",
                key: "0-0-1",
                children: [
                    { title: "0-0-1-0", key: "0-0-1-0" },
                    { title: "0-0-1-1", key: "0-0-1-1" },
                    { title: "0-0-1-2", key: "0-0-1-2" }
                ]
            },
            {
                title: "0-0-2",
                key: "0-0-2"
            }
        ]
    },
    {
        title: "0-1",
        key: "0-1",
        children: [
            { title: "0-1-0-0", key: "0-1-0-0" },
            { title: "0-1-0-1", key: "0-1-0-1" },
            { title: "0-1-0-2", key: "0-1-0-2" }
        ]
    },
    {
        title: "0-2",
        key: "0-2"
    }
];
export default {
    name: "roleEditForm",
    components: {},
    props: {
        visible: Boolean
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
                result = JSON.parse(JSON.stringify(result).replace(new RegExp('name','g'), 'title'));
                this.treeData = result;
            });
        });
    },
    data() {
        return {
            form: this.$form.createForm(this),
            //visible: false,
            checkedList: defaultCheckedList,
            indeterminate: true,
            checkAll: false,
            plainOptions,
            treeData,
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
            members: [],
            applications: []
        };
    },
    watch: {
        checkedKeys(val) {
        console.log('onCheck', val)
        }
    },
    methods: {
        onClose() {
            //this.visible = false;
            this.$emit("update:visible", false);
        },
        onChange(checkedList) {
            this.indeterminate =
                !!checkedList.length &&
                checkedList.length < plainOptions.length;
            this.checkAll = checkedList.length === plainOptions.length;
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
        getAllMembers(callback) {
            reqwest({
                url: url + '?currentPage=1'+this.currentPage+'&pageSize=999',
                type: 'json',
                method: 'get',
                contentType: 'application/json',
                success: (res) => {
                    callback(res)
                },
            })
        },
        getAllApplications(callback) {
            reqwest({
                url: url2,
                type: 'json',
                method: 'get',
                contentType: 'application/json',
                success: (res) => {
                    callback(res)
                },
            })
        },
        getAllPermissionByApp(appId,callback){
            reqwest({
                url: url2 + '/' + appId + "/permissions",
                type: 'json',
                method: 'get',
                contentType: 'application/json',
                success: (res) => {
                    callback(res)
                },
            })
        }
    }
};
</script>
