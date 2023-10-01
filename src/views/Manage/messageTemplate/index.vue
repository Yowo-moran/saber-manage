<script setup lang="ts">
const input1: any = ref('');
const value: object = ref('');
const options: any = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

const dialogVisible = ref(false)
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
</script>
<template>
    <div class="card">
        <div class="table-top">
            <div class="table-top-left">
                <el-input v-model="input1" style="margin-right: 1.5%;" size="large" placeholder="Please Input">
                    <template #prefix>
                        <svg-icon iconName="icon-sousuo" className="svg" color="#757575"></svg-icon>
                    </template>
                </el-input>
                <el-select v-model="value" style="width: 38%;" placeholder="Select" size="large">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
            <el-button type="primary" color="#4460EF" @click="dialogVisible = true">
                <svg-icon iconName="icon-jiahao" className="svg" color="#ffffff"></svg-icon>
                <strong style="font-weight: 600;margin: 0 1em;">新建</strong>
            </el-button>
        </div>
        <div class="table-main">
            <el-table :data="tableData" height="100%" style="width: 100%;"
                :header-cell-style="{ 'background-color': '#EDF1F7', color: 'black' }">
                <el-table-column prop="date" label="模板ID" width="100" />
                <el-table-column prop="name" label="模板名称" width="200" />
                <el-table-column prop="address" label="模板简介" />
                <el-table-column prop="address" label="模板内容" />
                <el-table-column prop="name" label="创建人" width="120" />
                <el-table-column fixed="right" label="操作项" width="180">
                    <template #default="scope">
                        <el-button link style="margin-right: 20%;font-weight: 600;"
                            @click.prevent="() => { console.log(111) }">
                            <span style="font-weight: 600;">删除</span>
                        </el-button>
                        <el-button color="#4460EF" plain link type="primary" style="font-weight: 600;"
                            @click.prevent="() => { console.log(111) }">
                            <span style="font-weight: 600;">查看</span>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="table-bottom">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[100, 200, 300, 400]" :background="true" layout="total, sizes, prev, pager, next, jumper"
                :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
    <el-dialog v-model="dialogVisible" width="70%" align-center="true">
        <el-form :model="form" label-width="120px">
            <el-form-item label="模板名称">
                <el-input v-model="form.name" maxlength="10" show-word-limit style="width: 35%;" placeholder="输入模板名称（必填）" />
            </el-form-item>
            <el-form-item label="模板简介">
                <el-input v-model="form.name" maxlength="25" type="textarea" :rows="2" show-word-limit style="width: 60%;"
                    resize="none" placeholder="添加模板简介（必填）" />
            </el-form-item>
            <el-form-item label="内容">
                <strong style="color: #3857EE;">备注:配置字段表示为{配置内容},将在发通知时自动匹配对应内容</strong>
                <el-input v-model="form.desc" type="textarea" :rows="18" style="width: 95%;" resize="none" placeholder="输入模板内容（必填）
示例：
    {name}你好!我们是{organization},诚挚邀请您参与我们的面试。面面试时间为:{time},面试地点:{location}
                " />
            </el-form-item>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false" class="button">取消</el-button>
                <el-button type="primary" @click="dialogVisible = false" class="button" color="#4460EF">
                    创建
                </el-button>
            </div>
        </el-form>
    </el-dialog>
</template>
<style lang="scss" scoped>
.table-top {
    width: 100%;
    height: 6%;
    display: flex;
    justify-content: space-between;
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
    height: 86%;

    .el-table {
        ::v-deep(.cell) {
            font-size: 15px;
        }

        ::v-deep(.el-table__header-wrapper) {
            height: 11%;
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
    height: 7%;
    padding-right: 1%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    ::v-deep(.el-pagination.is-background .el-pager li.is-active) {
        background-color: #4460EF;
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

.dialog-footer {
    width: 100%;
    padding: 0 3%;
    display: flex;
    justify-content: flex-end;
}
</style>