<script setup lang="ts">
import { getRule } from "@/api/ruleConfig"
import { searchTemplate } from "@/api/messageTemplate"
import { searchUser } from "@/api/userManage/manage"
import { getRobot } from "@/api/robotManage"
import { sendMessage } from "@/api/sendMessage"
import type { User, Robot } from "@/api/types/resType"
onMounted(() => {
    getRuleOptions()
    getRobotOption()
})
const sendForm = ref(sendFormValue())
function sendFormValue() {
    return {
        ruleCode: "",
        userGroup: "",
        userId: "",
        chatId: "",
        sendWay: "",
        feishuAppId: "",
        template: "",
        title: "",
        content: ""
    }
}
const resetSendForm = () => {
    sendForm.value = sendFormValue()
}
const ruleOptions = reactive<any>([])
const getRuleOptions = async () => {
    const data = await getRule(1, 1000);
    if (data?.result_code === "success") {
        ruleOptions.values = data.data?.resultList;
    }
}

const searchContent = async (keyword: string) => {
    const data: any = await searchTemplate(1, 1, { keyword })
    if (data?.result_code === "success") {
        sendForm.value.template = data.data.resultList[0].content
    }
}

const ruleCodeChange = (item: any) => {
    resetSendForm()
    if (item.templateName !== null) {
    searchContent(item.templateName)
    }
    sendForm.value.ruleCode = item.code;
    sendForm.value.userGroup = item.groupName;
    if (item.feishuStatus) {
        sendForm.value.sendWay += "飞书"
    }
    if (item.smsStatus) {
        sendForm.value.sendWay += "短信"
    }
    if (item.emailStatus) {
        sendForm.value.sendWay += "邮件"
    }
}

const userLoading = ref(false)
const userOptions = ref<User[]>([])
const getUserOptins = async (query: string) => {
    if (query) {
        userLoading.value = true
        const data = await searchUser(1, 1000, { keyword: query, grade: '' });
        if (data?.result_code === 'success') {
            userLoading.value = false;
            userOptions.value = (data.data?.resultList as User[])
        }
    } else {
        userOptions.value = []
    }
}
const selectWay = ref("1")
const wayOptions = ref([{
    value: '1',
    label: '飞书',
}])
const robotOptions = ref<Robot[]>([])
const getRobotOption = async () => {
    const data = await getRobot(1, 1000);
    if (data?.result_code === "success") {
        robotOptions.value = (data.data?.resultList as Robot[])
    }
}
const send = async () => {
    // console.log('submit!')
    if (!sendForm.value.ruleCode) {
        ElMessage.error("请选择发送规则")
        return
    }
    await sendMessage("TEST", sendForm.value);
}
</script>
<template>
    <div class="card" style="padding: 2%;">
        <div class="card-title"><strong style="font-size: 24px;font-weight: 600;">消息发送</strong></div>

        <div class="card-main">
            <el-form :model="sendForm" label-width="120px" class="form">
                <el-form-item label="发送规则">
                    <div class="form-item">
                        <el-select v-model="sendForm.ruleCode" value-key="id" filterable placeholder="选择规则（必选）"
                            @change="ruleCodeChange">
                            <el-option v-for="item in ruleOptions.values" :key="item.id" :label="item.code" :value="item" />
                        </el-select>
                        <el-input v-model="sendForm.userGroup" style="width: 30%;" placeholder="用户组(如无，则需指定成员或群聊)"
                            disabled />
                    </div>
                </el-form-item>
                <!-- <el-form-item label="发送频率">
                    <div class="form-item">
                        <el-select v-model="value" class="m-2" placeholder="Select">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                        </el-select>
                        <el-input v-model="form.name" type="number" style="width: 10%;" />
                    </div>
                </el-form-item> -->
                <el-form-item label="指定用户">
                    <div class="form-item">
                        <el-select v-model="sendForm.userId" filterable remote reserve-keyword placeholder="选择用户（可选）"
                            remote-show-suffix :remote-method="getUserOptins" :loading="userLoading">
                            <el-option v-for="item in userOptions" :key="item.id" :label="item.name" :value="item.userId" />
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="指定群聊">
                    <div class="form-item">
                        <el-input v-model="sendForm.chatId" style="width: 30%;" placeholder="指定群聊（可选）" />
                    </div>
                </el-form-item>
                <el-form-item label="发送平台">
                    <el-input v-model="sendForm.sendWay" placeholder="规则所设置的发送平台" style="width: 30%;" disabled />
                </el-form-item>
                <el-form-item label="机器人选择">
                    <div class="form-item">
                        <el-select v-model="selectWay" class="m-2" placeholder="机器人分类">
                            <el-option v-for="item in wayOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                        <el-select v-model="sendForm.feishuAppId" filterable placeholder="选择机器人（可选）">
                            <el-option v-for="item in robotOptions" :key="item.id" :label="item.name"
                                :value="item.feishuAppId" />
                        </el-select>
                    </div>
                </el-form-item>
                <el-form-item label="模板内容">
                    <div class="form-item" style="flex-direction: column;">
                        <el-input v-model="sendForm.template" style="width: 60%;" placeholder="规则所设置的模板内容" disabled />
                    </div>
                </el-form-item>
                <el-form-item label="发送内容">
                    <div class="form-item" style="flex-direction: column;">
                        <el-input v-model="sendForm.title" style="width: 40%;margin-bottom: 1%;"
                            placeholder="标题（填写后会影响消息格式）" />
                        <el-input v-model="sendForm.content" :autosize="{ minRows: 6, maxRows: 8 }" type="textarea"
                            placeholder="根据模板填写，用英文逗号分隔可匹配占位符" />
                    </div>
                </el-form-item>
                <el-form-item style="align-self: flex-end;">
                    <el-button class="button" @click="resetSendForm">重置</el-button>
                    <el-button type="primary" color="#4460EF" @click="send" class="button">发送消息</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.card-title {
    width: 100%;
    height: 10%;
}

.card-main {
    width: 100%;
    height: 90%;

    // display: flex;
    .check-crad {
        box-sizing: border-box;
        width: 100%;
        height: 20vh;
        border-radius: 4px;
        padding: 1% 2%;
        border: 1px solid var(--el-border-color);
        overflow: auto;

        .multiple-choice {
            box-sizing: border-box;
            width: 49%;
            height: 100%;
            padding: 2%;
            overflow: auto;
        }
    }
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    ::v-deep(.el-form-item__label) {
        font-size: 18px;
        font-weight: 600;
    }
}

.form-item {
    display: flex;
    width: 100%;

    .el-select {
        width: 15%;
        margin-right: 2%;
    }
}

.check-crad:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

.button {
    width: 100px;
    height: 40px;
    font-size: 16px;
}
</style>