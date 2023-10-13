import { _axios } from "@/server/index"
import type { PagingParams } from "../../types/paramsType"
import type { SearchUser } from "../../types/dataType"
import type { searchUserRes } from "../../types/resType"

const searchUser = async (page_no: number, page_size: number, form: SearchUser) => {
    const data = await _axios.post<searchUserRes, PagingParams, SearchUser>(
        '/saber/user/search',
        form,
        {
            page_no,
            page_size
        },

    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败！");
        return;
    }
    return data;
}

export { searchUser }