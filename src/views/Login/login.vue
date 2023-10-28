<script setup lang="ts">
import { useRouter } from 'vue-router'
import { login } from '@/api/login'
import type { Login } from "@/api/types/dataType"
const router = useRouter()
const loginForm = ref(loginFormValue())
function loginFormValue() {
    return {
        phone: '',
        password: '',
    }
}
const resetForm = () => {
    loginForm.value = loginFormValue()
}
const loginUp = async (form: Login) => {
    const data = await login(form)
    if (data?.result_code == "success") {
        router.push("/manage");
        resetForm()
    }
}
</script>
<template>
    <div class="allLogin">
        <div class="login">
            <h1 class="title">Saber</h1>
            <el-input class="inputword" v-model="loginForm.phone" placeholder="请输入账号"></el-input>
            <el-input class="inputword" placeholder="请输入密码" v-model="loginForm.password" show-password
                @keyup.enter.native="loginUp(loginForm)"></el-input>

            <el-button type="primary" @click="loginUp(loginForm)"
                style="width: 50%; font-size: 16px; font-weight: 600">登&nbsp;&nbsp;录</el-button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#login {
    width: 100%;
    height: 100%;
}

.allLogin {
    width: 100%;
    /* height: 100%; */
    height: calc(100vh);
}

.title {
    color: #327595;
    height: 50px;
}

.occupy {
    height: 250px;
}

.login {
    position: absolute;
    top: 50%;
    right: 15%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 310px;
    height: 360px;
    background-color: #f2f6fcda;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 20px 20px;
}
</style>