<script setup lang="ts">
import { getRule, createRule, delRule, editRule, upRule, getUpRule } from "@/api/ruleConfig"
import { searchTemplate } from "@/api/messageTemplate";
import { searchUserGroup } from "@/api/userManage/userGroup";
import type { UpRule } from "@/api/types/dataType"
import type { Template, UserGroup } from "@/api/types/resType"

type ruleData = {
    code: string;
    chatId: string;
    createBy: string;
    createTime: string;
    feishuAppId: string;
    groupId?: number | null;
    groupName: string;
    id: number;
    isDeleted: number;
    templateId: number;
    templateName: string;
    updateBy: string;
    updateTime: string;
    userId: string;
    version: number;
    emailStatus: boolean;
    smsStatus: boolean;
    feishuStatus: boolean;
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
const pageSize = ref(15);
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
    resetRobotUp()
    checked.value = [];
    handleCheckAllChange(false);
    templateOptins.value = []
    groupOptins.value = []
    done()
}
const edit = ref(false)
const editId = ref(0)
const ruleEdit = async () => {
    dialogForm.emailStatus = checked.value.includes("邮箱");
    dialogForm.smsStatus = checked.value.includes("短信");
    dialogForm.feishuStatus = checked.value.includes("飞书");
    const form: any = dialogForm;
    const data = await editRule(editId.value, form);
    if (data?.result_code === "success") {
        if (checked.value.includes("飞书")) {
            robotUp.value.ruleId = editId.value;
            ruleUp();
        }
        getRuleList();
        reset()
        dialog.value = false;
    }
}
const getUpRuleFrom = async (id: number) => {
    const data: any = await getUpRule(id);
    if (data?.result_code === "success" && data.data) {
        robotUp.value = data.data
    }
}
const clickEdit = async (index: number) => {
    edit.value = true;
    dialog.value = true;
    editId.value = tableData[index].id;
    dialogForm.ruleCode = tableData[index].code;
    if (tableData[index].templateName) {
        const data = await searchTemplate(1, 1, { keyword: tableData[index].templateName });
        templateOptins.value = (data?.data?.resultList as Template[])
        dialogForm.templateId = data?.data?.resultList[0].id
        templateDescription.value = (data?.data?.resultList[0].description as string);
    }
    if (tableData[index].groupName) {
        const data = await searchUserGroup(1, 1, { keyword: tableData[index].groupName });
        // groupDescription.value = (data?.data?.resultList[0].description as string);
    }
    if (tableData[index].emailStatus) {
        checked.value.push("邮箱")
    }
    if (tableData[index].smsStatus) {
        checked.value.push("短信")
    }
    if (tableData[index].feishuStatus) {
        checked.value.push("飞书")
    }
    if (checked.value.length > 0 && checked.value.length < 3) {
        isIndeterminate.value = true
    } else {
        isIndeterminate.value = false
    }
    if (checked.value.length === 3) {
        checkAll.value = true
    } else {
        checkAll.value = false
    }
    getUpRuleFrom(editId.value)
}
const dialogForm = reactive<any>({
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
const templateOptins = ref<Template[]>([])
const getTemplateOptins = async (query: string) => {
    if (query) {
        templateLoading.value = true
        const data = await searchTemplate(1, 1000, { keyword: query });
        if (data?.result_code === 'success') {
            templateLoading.value = false;
            templateOptins.value = (data.data?.resultList as Template[])
        }
    } else {
        templateOptins.value = []
    }
}

const groupLoading = ref(false)
const groupDescription = ref("");
const groupOptins = ref<UserGroup[]>([])
const getUserGroupOptins = async (query: string) => {
    if (query) {
        groupLoading.value = true
        const data = await searchUserGroup(1, 1000, { keyword: query });
        if (data?.result_code === 'success') {
            groupLoading.value = false
            groupOptins.value = (data.data?.resultList as UserGroup[])
        }
    } else {
        groupOptins.value = []
    }
}

const checkAll = ref(false)
const isIndeterminate = ref(false)
const checked = ref<string[]>([])
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
    const data = await createRule(form);
    if (data?.result_code === "success") {
        if (checked.value.includes("飞书")) {
            robotUp.value.ruleId = (data.data?.id as number)
            ruleUp();
        }
        getRuleList();
        reset()
        dialog.value = false;
    }
}
const ruleUp = async () => {
    const form = robotUp.value;
    if (!form.templateId) {
        delete form.templateId;
    }
    const data = await upRule(robotUp.value);
    if (data?.result_code === "success") {
        resetRobotUp()
    }
}
const robotUp = ref<UpRule>(robotUpVlaue())
function robotUpVlaue() {
    return {
        ruleId: -1,
        chatId: "",
        feishuAppId: "",
        messageType: "",
        templateId: "",
        userId: "",
    }
}
const resetRobotUp = () => {
    robotUp.value = robotUpVlaue()
}
</script>
<template>
    <div class="card search" style="height:16%;margin-bottom:1%">
        <div class="input">
            <el-input v-model="searchFrom.id" placeholder="搜索规则ID" />
            <label>规则ID</label>
        </div>
        <div class="input">
            <el-input v-model="searchFrom.name" placeholder="搜索规则名称" />
            <label>规则名称</label>
        </div>
        <div class="input">
            <el-input v-model="searchFrom.description" placeholder="搜索规则描述" />
            <label>描述</label>
        </div>
        <div class="input">
            <el-select v-model="searchFrom.createBy" placeholder="选择创建人">
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
                edit = false;
            }">
                <svg-icon iconName="icon-jiahao" className="svg" color="#ffffff"></svg-icon>
                <strong style="font-weight: 600; margin: 0 1em">新建</strong>
            </el-button>
            <el-button type="info" plain>
                <strong style="font-weight: 600; margin: 0 1em">Excel导入</strong>
            </el-button>
        </div>
        <div class="table-main">
            <el-table :data="tableData" height="100%" style="width: 100%" border
                :header-cell-style="{ 'background-color': '#EDF1F7', color: 'black' }" stripe>
                <el-table-column prop="id" label="规则ID" width="100" align="center" />
                <el-table-column prop="code" label="规则代号" width="150" align="center" />
                <el-table-column prop="templateName" label="模板名称" width="200" align="center" />
                <el-table-column prop="groupName" label="用户组" align="center" />
                <el-table-column prop="createBy" label="创建人" width="140" align="center" />
                <el-table-column prop="createTime" label="创建时间" width="180" align="center" />
                <el-table-column fixed="right" label="操作项" width="180" align="center">
                    <template #default="scope">
                        <el-button link style="margin-right: 20%; font-weight: 600" @click.prevent="ruleDel(scope.$index)">
                            <span style="font-weight: 600">删除</span>
                        </el-button>
                        <el-button color="#4460EF" plain link type="primary" style="font-weight: 600"
                            @click.prevent="clickEdit(scope.$index)">
                            <span style="font-weight: 600">编辑</span>
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
    <el-dialog v-model="dialog" width="55%" align-center :before-close="dialogClose">
        <el-form :model="dialogForm" label-width="120px">
            <el-form-item label="规则代号">
                <el-input v-model="dialogForm.ruleCode" style="width: 40%" placeholder="输入模板名称（必填）" />
            </el-form-item>
            <el-form-item label="消息模板">
                <el-select v-model="dialogForm.templateId" filterable remote reserve-keyword placeholder="选择模板（必选）"
                    remote-show-suffix :remote-method="getTemplateOptins" :loading="templateLoading"
                    style="margin-right: 10px;" @change="() => {
                        templateDescription = templateOptins.filter((item: any) => item.id === dialogForm.templateId)[0].description;
                    }">
                    <el-option v-for="item in templateOptins" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
                <el-input v-model="templateDescription" style="width: 60%" placeholder="模板简介" disabled />
            </el-form-item>
            <el-form-item label="用户组">
                <el-select v-model="dialogForm.groupId" filterable remote reserve-keyword placeholder="选择用户组（可选）"
                    remote-show-suffix :remote-method="getUserGroupOptins" :loading="groupLoading"
                    style="margin-right: 10px;">
                    <el-option v-for="item in groupOptins" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
                <el-input v-model="groupDescription" style="width: 60%" placeholder="用户组简介" disabled />
            </el-form-item>
            <el-form-item label="发送平台">
                <div class="check-crad" style="margin-right: 1%;">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange">平台名称</el-checkbox>
                    <el-checkbox-group v-model="checked" @change="handleCheckedChange">
                        <el-checkbox v-for="item in items" :key="item" :label="item">{{
                            item
                        }}</el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="check-crad robot-crad" v-show="checked.includes('飞书')">
                    <h3 style="font-weight: 600;">飞书配置参数</h3>
                    <div class="flex">
                        <label style="margin-right: 1%;">机器人ID:</label><el-input v-model="robotUp.feishuAppId"
                            style="width: 30%;" />
                    </div>
                    <div class="flex">
                        <label style="margin-right: 1%;">消息类型:</label>
                        <el-radio-group v-model="robotUp.messageType" style="width: 80%;">
                            <el-radio label="text">文本</el-radio>
                            <el-radio label="post">富文本</el-radio>
                            <el-radio label="card" style="width: 50%;">卡片（ID:<el-input v-model="robotUp.templateId"
                                    :disabled="robotUp.messageType !== 'card'" style="width: 80%;" />）</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="flex">
                        <label style="margin-right: 1%;">用户飞书ID:</label><el-input v-model="robotUp.userId"
                            style="width: 30%;" />
                    </div>
                    <div class="flex">
                        <label style="margin-right: 1%;">群组ID:</label><el-input v-model="robotUp.chatId"
                            style="width: 30%;" />
                    </div>
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

::v-deep(.el-form-item__content) {
    align-items: flex-start;
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
    width: 25%;
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

.robot-crad {
    width: 70%;
    height: 15em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ::v-deep(.el-input__wrapper) {
        box-shadow: none;
    }

    ::v-deep(.el-input__inner) {
        border-bottom: 1px solid #979696;
    }

    ::v-deep(.el-input.is-disabled .el-input__wrapper) {
        background-color: #ffffff00;
    }
}

.flex {
    display: flex;
    width: 100%;
}
</style>