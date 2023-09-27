<script lang="ts" setup>
const handleCommand = (command: number) => {
    ElMessage({
        message: '点击' + command,
        type: 'success',
    })
}
const handleOpen = ($event: Object) => {
    ElMessage({
        message: '点击',
        type: 'success',
    })
    console.log($event)
}
const handleClose = () => {
    ElMessage({
        message: '点击',
        type: 'success',
    })
}
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header height="6.5vh">
                <div class="title">Saber</div>
                <el-dropdown class="userinfo" @command="handleCommand">
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
                <el-aside width="14vw">
                    <el-menu style="color:#fff" background-color="#03002B" text-color="#fff" active-text-color="#fff"
                        unique-opened @open="handleOpen" @close="handleClose">
                        <el-menu-item index="1">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>消息发送</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>消息模板</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>数据看板</span>
                        </el-menu-item>
                        <el-sub-menu index="4">
                            <template #title>
                                <el-icon>
                                    <location />
                                </el-icon>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="4-1">用户管理</el-menu-item>
                                <el-menu-item index="4-2">用户组配置</el-menu-item>
                                <el-menu-item index="4-3">群组管理</el-menu-item>
                                <el-menu-item index="4-4">多群组管理</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-menu-item index="5">
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                            <span>机器人管理</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>告警提醒</span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>任务记录</span>
                        </el-menu-item>
                        <el-menu-item index="8">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>通知记录</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>Main</el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style lang="scss" scoped>
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
        }
    }
}
</style>