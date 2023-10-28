import { _axios } from "@/server"
import type { SendMessageParams } from "../types/paramsType"
import type { SendMessage } from "../types/dataType"
import type { BaseResponce } from "../types/resType"
const sendMessage = async (id: string, form: SendMessage) => {
    const data = await _axios.post<BaseResponce<null>, SendMessageParams, SendMessage>(
        '/saber/notification',
        form,
        {
            app_code: id
        },

    );
    if (data.result_code !== 'success') {
        ElMessage.error(data.message);
        return;
    }
    ElMessage.success("发送成功")
    return data;
}
export { sendMessage }