import { _axios } from "@/server/index"
import type { PagingParams, AddUserGroupParams, DelUserGroupParams } from "../../types/paramsType"
import type { AddUserGroup, SearchUserGroup } from "../../types/dataType"
import type { BaseResponce, GetUserGroupRes, SearchUserGroupRes } from "../../types/resType"

const getUserGroup = async (page_no: number, page_size: number) => {
    const data = await _axios.get<GetUserGroupRes, PagingParams>(
        '/saber/group/list',
        {
            page_no,
            page_size
        },
    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }
    return data;
}

const addUserGroup = async (group_name: string, form: AddUserGroup[]) => {
    const data = await _axios.put<BaseResponce<null>, AddUserGroupParams, AddUserGroup[]>(
        '/saber/user/add/array',
        form,
        {
            group_name
        },

    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }
    return data;
}

const searchUserGroup = async (page_no: number, page_size: number, form: SearchUserGroup) => {
    const data = await _axios.post<SearchUserGroupRes, PagingParams, SearchUserGroup>(
        '/saber/group/search',
        form,
        {
            page_no,
            page_size
        },

    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }
    return data;
}

const delUserGroup = async (gid: number) => {
    const data = await _axios.post<BaseResponce<null>, DelUserGroupParams, null>(
        '/saber/group/delete',
        null,
        {
            gid
        }
    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }
    ElMessage.success("删除成功");
    return data;
}
export { addUserGroup, searchUserGroup, getUserGroup, delUserGroup }