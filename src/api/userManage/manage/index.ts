import { _axios } from "@/server/index"
import type { PagingParams, EditUserParams } from "../../types/paramsType"
import type { SearchUser, EditUser } from "../../types/dataType"
import type { SearchUserRes, GetUserRes, BaseResponce } from "../../types/resType"

const getUser = async (page_no: number, page_size: number) => {
    const data = await _axios.get<SearchUserRes, PagingParams>(
        '/saber/user/list',
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

const searchUser = async (page_no: number, page_size: number, form: SearchUser) => {
    const data = await _axios.post<GetUserRes, PagingParams, SearchUser>(
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

const editUser = async (id: number, form: EditUser) => {
    const data = await _axios.post<BaseResponce<null>, EditUserParams, EditUser>(
        '/saber/user/update',
        form,
        {
            uid: id
        },

    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败！");
        return;
    }
    return data;
}
export { searchUser, getUser, editUser }