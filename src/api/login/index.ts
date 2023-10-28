import { _axios } from "@/server"
import type { Login } from "../types/dataType"
import type { LoginRes } from "../types/resType"
const login = async (form: Login) => {
    const data: any = await _axios.post<LoginRes, null, Login>(
        '/saber/login',
        form
    )
    if (data.result_code !== 'success') {
        ElMessage.error(data.message);
        return;
    }
    localStorage.setItem('token', data.data.token)
    localStorage.setItem('username', data.data.username)
    ElMessage.success("登录成功")
    return data;
}

export { login }