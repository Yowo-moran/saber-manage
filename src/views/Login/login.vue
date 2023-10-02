<script setup lang="ts">
import { onetry } from '@/api/try'
</script>
<template>
    <div id="login">
        <el-button @click="onetry">尝试</el-button>
    </div>
</template>
<style lang="scss" scoped>
#login {
    width: 100%;
    height: 100%;
}
</style>