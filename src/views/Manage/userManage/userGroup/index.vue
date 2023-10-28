<script setup lang="ts">
import { getManage } from '@/api/messageTemplate'
import { searchUser } from '@/api/userManage/manage'
import { addUserGroup, getUserGroup, searchUserGroup, delUserGroup } from '@/api/userManage/userGroup';
import type { User } from '@/api/types/resType'
import type { UploadInstance, ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'

onMounted(async () => {
    loading.value = true
    await getList()
    getOptions()
    getManageOptions()
    setTimeout(() => {
        loading.value = false
    }, 500);
});
const loading = ref(true)
const searchFrom = ref<any>(searchFromValue())
function searchFromValue() {
    return {
        id: "",
        name: "",
        description: "",
        createBy: ""
    }
}

const manageOptions: any = reactive([])
const getManageOptions = async () => {
    const data: any = await getManage(1, 100);
    if (data?.result_code === "success") {
        manageOptions.splice(0, manageOptions.length, ...data.data.resultList);
    }
}

function resetSearch() {
    searchFrom.value = searchFromValue()
}
const searchList = async () => {
    const data: any = await searchUserGroup(currentPage.value, pageSize.value, { keyword: searchFrom.value.name })
    if (data?.result_code === "success") {
        tableData.splice(0, tableData.length, ...data.data.resultList);
        allPage.value = data.data.total;
    }
}

type tableData = {
    createBy?: string;
    createTime?: string;
    id: number;
    isDeleted?: number;
    name?: string;
    updateBy?: string;
    updateTime?: string;
    version?: number;
}
const tableData: Array<tableData> = reactive([]);
const getList = async () => {
    const data: any = await getUserGroup(currentPage.value, pageSize.value);
    if (data?.result_code === "success") {
        tableData.splice(0, tableData.length, ...data.data.resultList);
        allPage.value = data.data.total;
    }
}

const userGroupDel = async (index: number) => {
    const data = await delUserGroup(tableData[index].id);
    if (data?.result_code === "success") {
        getList()
    }
}

const allPage = ref(0);
const currentPage = ref(1);
const pageSize = ref(15);
const handleSizeChange = (val: number) => {
    pageSize.value = val;
    getList()
};
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
    getList()
};

const defaultProps = {
    children: 'children',
    label: 'name',
}
type Tree = {
    [key: string]: any
}
const handleClose = (done: () => void) => {
    resetForm()
    done()
}
const userGroupDialog = ref(false);
const userGroupForm = ref<{ name: string, member: any[] }>(userGroupFormValue());
function resetForm() {
    userGroupForm.value = userGroupFormValue()
}
function userGroupFormValue() {
    return {
        name: "",
        member: []
    }
}
type treeOptions = {
    id: number;
    name: string;
    children: User[],
}
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const treeOptions = ref<treeOptions[]>(treeOptionsValue())
const getOptions = async () => {
    // treeOptions.value.map(async (item) => {
    //     const data: any = await searchUser(1, 100, { keyword: "", grade: item.name.split("级").join("") });
    //     item.children = data.data.resultList
    // })
    const data: any = await searchUser(1, 1000, { keyword: "", grade: "" });
    console.log(data)
    data.data.resultList.map((item: User) => {
        if (item.grade === "2018+") {
            treeOptions.value[0].children.push(item)
        } else if (item.grade === "2019") {
            treeOptions.value[1].children.push(item)
        } else if (item.grade === "2020") {
            treeOptions.value[2].children.push(item)
        } else if (item.grade === "2021") {
            treeOptions.value[3].children.push(item)
        } else if (item.grade === "2022") {
            treeOptions.value[4].children.push(item)
        }
    })
}
function treeOptionsValue() {
    return [
        {
            id: 2018,
            name: '2018+级',
            children: [],
        },
        {
            id: 2019,
            name: '2019级',
            children: [],
        },

        {
            id: 2020,
            name: '2020级',
            children: [],
        },
        {
            id: 2021,
            name: '2021级',
            children: [],
        },
        {
            id: 2022,
            name: '2022级',
            children: [],
        },
    ]
}
watch(filterText, (val) => {
    treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
    if (!value) return true
    return data.name.includes(value)
}
const handleCheckChange = () => {
    if (treeRef.value?.getCheckedNodes(true).length) {
        delTreeOptions.value = treeRef.value?.getCheckedNodes(true)
        userGroupForm.value.member = treeRef.value?.getCheckedNodes(true)
    } else {
        resetOptions()
    }
}
const createUserGroup = async () => {
    if (userGroupForm.value.name === '') {
        ElMessage.error("请填写用户组名称");
        return;
    }
    if (!treeRef.value?.getCheckedNodes(true).length) {
        ElMessage.error("请选择用户组成员");
        return;
    }
    const data = await addUserGroup(userGroupForm.value.name, userGroupForm.value.member)
    if (data?.result_code === "success") {
        ElMessage.success("创建成功")
        getList()
        userGroupDialog.value = false;
        resetOptions();
    }
}

const delTreeRef = ref<InstanceType<typeof ElTree>>()
const delTreeOptions = ref<Tree[]>(delTreeOptionsValue())
function resetOptions() {
    delTreeOptions.value = delTreeOptionsValue()
}
function delTreeOptionsValue() {
    return []
}
const delOptions = (node: Node, data: Tree) => {
    treeRef.value?.setChecked(data, false, false)
    console.log(node, data)
    remove(node, data)
}
const remove = (node: Node, data: Tree) => {
    const parent = node.parent
    const children: Tree[] = parent.data.children || parent.data
    const index = children.findIndex((d) => d.id === data.id)
    children.splice(index, 1)
    delTreeOptions.value = [...delTreeOptions.value]
}

const uploadDialog = ref(false);
const uploadRef = ref<UploadInstance>()
const headersObj = reactive({
    Authorization: window.localStorage.getItem("token")
})
const submitUpload = () => {
    if (userGroupForm.value.name === "") {
        ElMessage.error("请输入用户组名称")
        return
    }
    uploadRef.value?.submit()
}
const successUpLoad = () => {
    getList()
    uploadDialog.value = false;
    ElMessage.success("创建成功")
}
</script>
<template>
    <div class="card search" style="height:16%;margin-bottom:1%">
        <div class="input">
            <el-input v-model="searchFrom.id" placeholder="搜索用户组ID" />
            <label>用户组ID</label>
        </div>
        <div class="input">
            <el-input v-model="searchFrom.name" placeholder="搜索用户组名称" />
            <label>用户组名称</label>
        </div>
        <div class="input">
            <el-input v-model="searchFrom.description" placeholder="搜索用户组描述" />
            <label>描述</label>
        </div>
        <div class="input">
            <el-select v-model="searchFrom.createBy" class="m-2" placeholder="选择创建人">
                <el-option v-for="item in manageOptions" :key="item.id" :label="item.username" :value="item.username" />
            </el-select>
            <label>创建人</label>
        </div>
        <div class="button">
            <el-button type="primary" color="#4460EF" @click="() => {
                currentPage = 1;
                pageSize = 15;
                searchList()
            }">
                <strong style="font-weight: 600; margin: 0 1em">搜索</strong>
            </el-button>
            <el-button type="info" plain @click="resetSearch">
                <strong style="font-weight: 600; margin: 0 1em">重置</strong>
            </el-button>
        </div>
    </div>
    <div class="card" style="height:82%;">
        <div class="table-top">
            <el-button type="primary" color="#4460EF" @click="() => {
                userGroupDialog = true;
            }">
                <svg-icon iconName="icon-jiahao" className="svg" color="#ffffff"></svg-icon>
                <strong style="font-weight: 600; margin: 0 1em">新建</strong>
            </el-button>
            <el-button type="info" plain @click="uploadDialog = true">
                <strong style="font-weight: 600; margin: 0 1em">Excel导入</strong>
            </el-button>
        </div>
        <div class="table-main">
            <el-table v-loading="loading" :data="tableData" height="100%" style="width: 100%" border
                :header-cell-style="{ 'background-color': '#EDF1F7', color: 'black' }" stripe>
                <el-table-column prop="id" label="用户组ID" width="100" align="center" />
                <el-table-column prop="name" label="用户组名称" width="150" align="center" />
                <el-table-column prop="description" label="描述" align="center" />
                <el-table-column prop="updateBy" label="创建人" width="120" align="center" />
                <el-table-column prop="createTime" label="创建时间" width="200" align="center" />
                <el-table-column prop="updateBy" label="更新人" width="120" align="center" />
                <el-table-column prop="updateTime" label="更新时间" width="200" align="center" />
                <el-table-column fixed="right" label="操作项" width="150" align="center">
                    <template #default="scope">
                        <el-button link style="; font-weight: 600" @click.prevent="userGroupDel(scope.$index)">
                            <span style="font-weight: 600">删除</span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="table-bottom">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[15, 25, 50]"
                :background="true" layout="total, sizes, prev, pager, next, jumper" :total="allPage"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
    <el-dialog v-model="userGroupDialog" width="60%" align-center :before-close="handleClose">
        <el-form :model="userGroupForm" label-width="120px">
            <el-form-item label="用户组名称">
                <el-input v-model="userGroupForm.name" maxlength="10" show-word-limit style="width: 35%"
                    placeholder="输入用户组名称（必填）" />
            </el-form-item>
            <el-form-item label="成员">
                <div class="multiple-choice">
                    <div class="multiple-choice-left">
                        <el-input v-model="filterText" placeholder="搜索成员" />
                        <el-tree ref="treeRef" node-key="id" :data="treeOptions" :props="defaultProps" show-checkbox
                            :filter-node-method="filterNode" @check="handleCheckChange" />
                    </div>
                    <el-divider direction="vertical" />
                    <div class="multiple-choice-right">
                        <strong>已选：{{ delTreeOptions.length }}人</strong>
                        <el-tree :data="delTreeOptions" node-key="id" ref="delTreeRef" :props="defaultProps"
                            default-expand-all :expand-on-click-node="false">
                            <template #default="{ node, data }">
                                <span class="custom-tree-node">
                                    <span>{{ data.name }}</span>
                                    <span @click="delOptions(node, data)" v-show="!data.children">
                                        <svg-icon iconName="icon-guanbi" className="svg" color="#606266"></svg-icon>
                                    </span>
                                </span>
                            </template>
                        </el-tree>
                    </div>
                </div>
            </el-form-item>
            <div class="dialog-footer">
                <el-button @click="userGroupDialog = false" class="button">取消</el-button>
                <el-button type="primary" @click="createUserGroup" class="button" color="#4460EF">
                    创建
                </el-button>
            </div>
        </el-form>
    </el-dialog>
    <el-dialog v-model="uploadDialog" width="35%" align-center :before-close="handleClose">
        <el-form :model="userGroupForm" class="upload-dialog-form">
            <el-form-item label="用户组名称">
                <el-input v-model="userGroupForm.name" maxlength="10" show-word-limit style="width: 50%"
                    placeholder="输入模板名称（必填）" />
            </el-form-item>
            <el-upload class="upload-demo" drag
                :action="'http://saber.api.yuleng.top/saber/user/add/file?group_name=' + userGroupForm.name" ref="uploadRef"
                :auto-upload="false" :headers="headersObj" :on-success="successUpLoad">
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    Drop file here or <em>click to upload</em>
                </div>

            </el-upload>
            <el-button style="align-self:flex-end;width: 100px;" color="#4460EF" @click="submitUpload">
                创建
            </el-button>
        </el-form>
    </el-dialog>
</template>
<style lang="scss" scoped>
.search {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .input {
        width: 18%;
        height: 60%;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;

        label {
            font-size: 14px;
            font-weight: 600;
            color: #555555;
        }
    }

    .button {
        width: 14%;
        height: 60%;
        display: flex;
        align-items: flex-end;
    }
}

.table-top {
    width: 100%;
    height: 6%;
    display: flex;
    align-items: center;

    .table-top-left {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;

        .el-input {
            width: 38%;
            height: 100%;
            display: flex;
            align-items: center;
        }

        ::v-deep(.el-input__wrapper) {
            height: 3em;
        }
    }
}

.table-main {
    margin-top: 0.7%;
    width: 100%;
    height: 84%;

    .el-table {
        ::v-deep(.cell) {
            font-size: 15px;
        }

        ::v-deep(.el-table__header-wrapper) {
            height: 9%;
            border-radius: 10px 10px 0 0;
        }

        ::v-deep(.el-table__header) {
            height: 100%;

            .cell {
                font-weight: 700;
            }
        }
    }
}

.table-bottom {
    width: 100%;
    height: 9%;
    padding-right: 1%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    ::v-deep(.el-pagination.is-background .el-pager li.is-active) {
        background-color: #4460ef;
    }
}

::v-deep(.el-form-item__label) {
    font-size: 16px;
    font-weight: 600;
    display: flex;
    justify-content: center;
}

.button {
    width: 12%;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
}

.multiple-choice {
    width: 100%;
    height: 50vh;
    max-height: 450px;
    border: 1px solid var(--el-border-color);
    border-radius: 5px;
    display: flex;

    ::v-deep(.el-divider--vertical) {
        height: 100%;
    }

    .multiple-choice-left {
        box-sizing: border-box;
        width: 49%;
        height: 100%;
        padding: 2%;
        overflow: auto;
    }

    .multiple-choice-right {
        box-sizing: border-box;
        width: 49%;
        height: 100%;
        padding: 2%;
        overflow: auto;

        ::v-deep(.el-tree-node__content) {
            width: 100%;
        }

        .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
        }
    }
}

.dialog-footer {
    width: 100%;
    padding: 0 3%;
    display: flex;
    justify-content: flex-end;
}

.upload-dialog-form {
    display: flex;
    flex-direction: column;
}
</style>