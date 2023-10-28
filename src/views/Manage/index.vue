<script lang="ts" setup>
const routerPath: string = window.location.pathname;
const username: string = (localStorage.getItem('username') as string);
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header height="6.5vh">
                <div class="title">Saber</div>
                <el-dropdown class="userinfo">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <span class="el-dropdown-link">
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="1">个人资料</el-dropdown-item>
                            <el-dropdown-item divided command="2">登出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="13vw">
                    <el-menu style="color:#fff" background-color="#03002B" text-color="#fff" active-text-color="#fff"
                        unique-opened router :default-active="routerPath">
                        <el-menu-item index="/manage/sendMessage">
                            <svg-icon iconName="icon-pinglun" className="svg"></svg-icon>
                            <span>消息发送</span>
                        </el-menu-item>
                        <el-menu-item index="/manage/ruleConfig">
                            <svg-icon iconName="icon-changongxiao_yunyingguizepeizhi" className="svg"></svg-icon>
                            <span>规则配置</span>
                        </el-menu-item>
                        <el-menu-item index="/manage/messageTemplate">
                            <svg-icon iconName="icon-yanzhengma" className="svg"></svg-icon>
                            <span>消息模板</span>
                        </el-menu-item>
                        <el-menu-item index="/manage/dataBoard">
                            <svg-icon iconName="icon-shujuzhuzhuangtu" className="svg"></svg-icon>
                            <span>数据看板</span>
                        </el-menu-item>
                        <el-sub-menu index="/manage/userManage/manage">
                            <template #title>
                                <svg-icon iconName="icon-shenhe" className="svg"></svg-icon>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/manage/userManage/manage">用户管理</el-menu-item>
                                <el-menu-item index="/manage/userManage/userGroup">用户组配置</el-menu-item>
                                <el-menu-item index="/manage/userManage/groupConfig">群组管理</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-menu-item index="/manage/robotManage">
                            <svg-icon iconName="icon-jiqirenguanli" className="svg"></svg-icon>
                            <span>机器人管理</span>
                        </el-menu-item>
                        <el-menu-item index="/manage/alarmReminder">
                            <svg-icon iconName="icon-tishi" className="svg"></svg-icon>
                            <span>告警提醒</span>
                        </el-menu-item>
                        <el-menu-item index="/manage/missionLog">
                            <svg-icon iconName="icon-xiangmu" className="svg"></svg-icon>
                            <span>任务记录</span>
                        </el-menu-item>
                        <el-menu-item index="/manage/informLog">
                            <svg-icon iconName="icon-caozuorizhi" className="svg"></svg-icon>
                            <span>通知记录</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main style="height:93.5vh">
                    <el-watermark style="height: 100%;" :content="username" :gap="[100, 100]" :font="{ fontSize: 16,
                    color:'rgba(0,0,0,.05)' }">
                        <router-view></router-view>
                    </el-watermark>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
.svg {
    margin-right: 1em;
}

.common-layout {
    width: 100vw;
    height: 100vh;

    .el-container {
        width: 100%;
        height: 100%;

        .el-header {
            background-color: rgb(0, 0, 0);
            padding: 0 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                font-size: 26px;
                font-weight: 700;
                color: #fff;
            }
        }

        .el-aside {
            background-color: rgb(3, 0, 43);

            ::v-deep(.el-menu-item) {
                padding-left: 40px;
            }

            ::v-deep(.is-active) {
                background-color: rgb(68, 96, 239);
            }

            ::v-deep(.el-sub-menu__title) {
                padding-left: 40px;
            }

            ::v-deep(.el-menu-item-group__title) {
                display: none;
            }

            .el-menu-item-group {
                ::v-deep(.el-menu-item) {
                    justify-content: center;
                }
            }
        }

        .el-main {
            box-sizing: border-box;
            background-color: rgb(240, 243, 248);
            padding: 15px;
        }
    }
}
</style>