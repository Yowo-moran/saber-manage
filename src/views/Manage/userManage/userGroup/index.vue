<script setup lang="ts">
const input = ref('')
const value = ref('')
const options = reactive([{
    value: 'Option1',
    label: 'Option1',
}])
const allPage = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
    pageSize.value = val;

};
const handleCurrentChange = (val: number) => {
    currentPage.value = val;

};
</script>
<template>
    <div class="card search" style="height:16%;margin-bottom:1%">
        <div class="input">
            <el-input v-model="input" placeholder="Please input" />
            <label>用户组ID</label>
        </div>
        <div class="input">
            <el-input v-model="input" placeholder="Please input" />
            <label>用户组名称</label>
        </div>
        <div class="input">
            <el-input v-model="input" placeholder="Please input" />
            <label>描述</label>
        </div>
        <div class="input">
            <el-select v-model="value" class="m-2" placeholder="Select">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <label>创建人</label>
        </div>
        <div class="button">
            <el-button type="primary" color="#4460EF">
                <strong style="font-weight: 600; margin: 0 1em">搜索</strong>
            </el-button>
            <el-button type="info" plain>
                <strong style="font-weight: 600; margin: 0 1em">重置</strong>
            </el-button>
        </div>
    </div>
    <div class="card" style="height:82%;">
        <div class="table-top">
            <el-button type="primary" color="#4460EF" @click="() => {
                templateDialog = true;
                templateDialogForm = {
                    name: '',
                    description: '',
                    content: ''
                }
            }">
                <svg-icon iconName="icon-jiahao" className="svg" color="#ffffff"></svg-icon>
                <strong style="font-weight: 600; margin: 0 1em">新建</strong>
            </el-button>
            <el-button type="info" plain>
                <strong style="font-weight: 600; margin: 0 1em">Excel导入</strong>
            </el-button>
        </div>
        <div class="table-main">
            <el-table :data="tableData" height="100%" style="width: 100%"
                :header-cell-style="{ 'background-color': '#EDF1F7', color: 'black' }" stripe>
                <el-table-column prop="id" label="用户组ID" width="100" />
                <el-table-column prop="name" label="用户组名称" width="200" />
                <el-table-column prop="description" label="描述" />
                <el-table-column prop="updateBy" label="创建人" width="120" />
                <el-table-column prop="content" label="创建时间" width="140" />
                <el-table-column prop="updateBy" label="更新人" width="120" />
                <el-table-column prop="content" label="更新时间" width="140" />
                <el-table-column fixed="right" label="操作项" width="180">
                    <template #default="scope">
                        <el-button link style="margin-right: 20%; font-weight: 600"
                            @click.prevent="templateDel(scope.$index)">
                            <span style="font-weight: 600">删除</span>
                        </el-button>
                        <el-button color="#4460EF" plain link type="primary" style="font-weight: 600" @click.prevent="() => {
                            edit = true;
                            templateDialog = true;
                            editId = tableData[scope.$index].id;
                            const { name, description, content } = tableData[scope.$index];
                            templateDialogForm.name = name;
                            templateDialogForm.description = description;
                            templateDialogForm.content = content;
                        }
                            ">
                            <span style="font-weight: 600">查看</span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="table-bottom">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 25, 50]"
                :background="true" layout="total, sizes, prev, pager, next, jumper" :total="allPage"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
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
</style>