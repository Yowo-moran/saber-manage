<script setup lang="ts">
import { getRule, createRule, delRule, editRule } from "@/api/ruleConfig"
import { searchTemplate } from "@/api/messageTemplate";
import { searchUser } from "@/api/userManage/userGroup";
type Optins = {
    value: string
    label: string
    description: string
}

type ruleData = {
    code: string;
    chatId: string;
    createBy: string;
    createTime: string;
    feishuAppId: string;
    groupId?: number | null;
    id: number;
    isDeleted: number;
    templateId: number;
    updateBy: string;
    updateTime: string;
    userId: string;
    version: number;
}

onMounted(() => {
    getRuleList()
})
const getRuleList = async () => {
    const data: any = await getRule(currentPage.value, pageSize.value);
    if (data?.result_code === "success") {
        tableData.splice(0, tableData.length, ...data.data.resultList);
        allPage.value = data.data.total;
    }
}

const searchFrom = reactive({
    id: "",
    name: "",
    description: "",
    createBy: ""
});
const options = reactive([{
    value: 'Option1',
    label: 'Option1',
}])

const tableData: Array<ruleData> = reactive([]);

const ruleDel = async (index: number) => {
    const data = await delRule(tableData[index].id);
    if (data?.result_code === "success") {
        getRuleList()
    }
}

const allPage = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
    pageSize.value = val;
    getRuleList()
};
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
    getRuleList()
};


const dialog = ref(false)
const dialogClose = (done: () => void) => {
    reset()
    done()
}
const edit = ref(false)
const editId = ref(0)
const ruleEdit = async () => {
    dialogForm.emailStatus = checked.value.includes("邮箱");
    dialogForm.smsStatus = checked.value.includes("短信");
    dialogForm.feishuStatus = checked.value.includes("飞书");
    const form: any = dialogForm;
    delete form.groupId;
    const data = await editRule(editId.value, form);
    if (data?.result_code === "success") {
        getRuleList();
        reset()
        dialog.value = false;
    }
}


const dialogForm = reactive({
    ruleCode: "",
    templateId: "",
    groupId: "",
    feishuStatus: false,
    smsStatus: false,
    emailStatus: false
})
const reset = () => {
    groupDescription.value = ""
    templateDescription.value = ""
    dialogForm.ruleCode = ""
    dialogForm.templateId = ""
    dialogForm.groupId = ""
}

const templateLoading = ref(false)
const templateDescription = ref("");
const templateOptins = ref<Optins[]>([])
const getTemplateOptins = async (query: string) => {
    if (query) {
        templateLoading.value = true
        const data = await searchTemplate(1, 1000, { keyword: query });
        if (data?.result_code === 'success') {
            templateLoading.value = false
            const options = data.data?.resultList.map((item) => {
                return {
                    value: item.id,
                    label: item.name,
                    description: item.description
                }
            })
            templateOptins.value = (options as []);
        }
    } else {
        templateOptins.value = []
    }
}

const groupLoading = ref(false)
const groupDescription = ref("");
const groupOptins = ref<Optins[]>([])
const getUserOptins = async (query: string) => {
    if (query) {
        groupLoading.value = true
        const data = await searchUser(1, 1000, { keyword: query });
        if (data?.result_code === 'success') {
            groupLoading.value = false
            const options = data.data?.resultList.map((item) => {
                return {
                    value: item.id,
                    label: item.name,
                    description: item.mobile
                }
            })
            groupOptins.value = (options as []);
        }
    } else {
        groupOptins.value = []
    }
}

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checked = ref(['飞书'])
const items = ['飞书', '短信', '邮箱']

const handleCheckAllChange = (val: boolean) => {
    checked.value = val ? items : []
    isIndeterminate.value = false
}
const handleCheckedChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === items.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < items.length
}

const ruleCreate = async () => {
    dialogForm.emailStatus = checked.value.includes("邮箱");
    dialogForm.smsStatus = checked.value.includes("短信");
    dialogForm.feishuStatus = checked.value.includes("飞书");
    const form: any = dialogForm;
    delete form.groupId;
    const data = await createRule(form);
    if (data?.result_code === "success") {
        getRuleList();
        reset()
        dialog.value = false;
    }
}

</script>
<template>
    <div class="card search" style="height:16%;margin-bottom:1%">
        <div class="input">
            <el-input v-model="searchFrom.id" placeholder="Please input" />
            <label>规则ID</label>
        </div>
        <div class="input">
            <el-input v-model="searchFrom.name" placeholder="Please input" />
            <label>规则名称</label>
        </div>
        <div class="input">
            <el-input v-model="searchFrom.description" placeholder="Please input" />
            <label>描述</label>
        </div>
        <div class="input">
            <el-select v-model="searchFrom.createBy" placeholder="Select">
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
                dialog = true;
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
                <el-table-column prop="id" label="规则ID" width="150" />
                <el-table-column prop="code" label="规则代号" width="240" />
                <el-table-column prop="templateName" label="模板名称" />
                <el-table-column prop="groupName" label="用户组" />
                <el-table-column prop="createBy" label="创建人" width="140" />
                <el-table-column prop="createTime" label="创建时间" width="180" />
                <el-table-column fixed="right" label="操作项" width="180">
                    <template #default="scope">
                        <el-button link style="margin-right: 20%; font-weight: 600" @click.prevent="ruleDel(scope.$index)">
                            <span style="font-weight: 600">删除</span>
                        </el-button>
                        <el-button color="#4460EF" plain link type="primary" style="font-weight: 600" @click.prevent="() => {
                            edit = true;
                            dialog = true;
                            editId = tableData[scope.$index].id;
                            const { code } = tableData[scope.$index];
                            dialogForm.ruleCode = code;
                        }
                            ">
                            <span style="font-weight: 600">编辑</span>
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
    <el-dialog v-model="dialog" width="70%" align-center :before-close="dialogClose">
        <el-form :model="dialogForm" label-width="120px">
            <el-form-item label="规则代号">
                <el-input v-model="dialogForm.ruleCode" style="width: 40%" placeholder="输入模板名称（必填）" />
            </el-form-item>
            <el-form-item label="消息模板">
                <el-select v-model="dialogForm.templateId" filterable remote reserve-keyword placeholder="选择模板（必选）"
                    remote-show-suffix :remote-method="getTemplateOptins" :loading="templateLoading"
                    style="margin-right: 10px;" @change="() => {
                        templateDescription = templateOptins.filter((item: any) => item.value === dialogForm.templateId)[0].description;
                    }">
                    <el-option v-for="item in templateOptins" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-input v-model="templateDescription" style="width: 60%" placeholder="模板简介" disabled />
            </el-form-item>
            <el-form-item label="用户组">
                <el-select v-model="dialogForm.groupId" filterable remote reserve-keyword placeholder="选择用户（可选）"
                    remote-show-suffix :remote-method="getUserOptins" :loading="groupLoading" style="margin-right: 10px;"
                    @change="() => {
                        groupDescription = groupOptins.filter((item: any) => item.value === dialogForm.groupId)[0].description;
                    }">
                    <el-option v-for="item in groupOptins" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <el-input v-model="groupDescription" style="width: 60%" placeholder="用户手机号" disabled />
            </el-form-item>
            <el-form-item label="发送平台">
                <div class="check-crad">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange">平台名称</el-checkbox>
                    <el-checkbox-group v-model="checked" @change="handleCheckedChange">
                        <el-checkbox v-for="item in items" :key="item" :label="item">{{
                            item
                        }}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-form-item>
            <div class="dialog-footer">
                <el-button @click="dialog = false" class="button">取消</el-button>
                <el-button type="primary" @click="ruleCreate" class="button" color="#4460EF" v-show="!edit">
                    创建
                </el-button>
                <el-button type="primary" @click="ruleEdit" class="button" color="#4460EF" v-show="edit">
                    修改
                </el-button>
            </div>
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

.dialog-footer {
    width: 100%;
    padding: 0 3%;
    display: flex;
    justify-content: flex-end;
}

.check-crad {
    width: 35%;
    border-radius: 4px;
    padding: 1% 2%;
    border: 1px solid var(--el-border-color);

    .el-checkbox-group {
        display: flex;
        flex-direction: column;
    }
}

.check-crad:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>