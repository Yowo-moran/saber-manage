import { _axios } from "@/server/index"
import type { PagingParams, DelRuleParams, EditRuleParams } from "../types/paramsType"
import type { CreateRule, EditRule } from "../types/dataType"
import type { BaseResponce, GetRuleRes, CreateRuleRes } from "../types/resType"

const getRule = async (page_no: number, page_size: number) => {
    const data = await _axios.get<GetRuleRes, PagingParams>(
        '/saber/notification/rule/list',
        {
            page_no,
            page_size
        }
    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }
    return data;
}

const createRule = async (form: CreateRule) => {
    const data = await _axios.put<CreateRuleRes, null, CreateRule>(
        '/saber/notification/rule/add',
        form,
    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }
    ElMessage.success("请求成功");
    return data;
}

const delRule = async (id: number) => {
    const data = await _axios.delete<BaseResponce<null>, DelRuleParams>(
        '/saber/notification/rule/delete',
        {
            rule_id: id
        },
    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }
    ElMessage.success("请求成功");
    return data;
}

const editRule = async (id: number, form: EditRule) => {
    const data = await _axios.post<BaseResponce<null>, EditRuleParams, EditRule>(
        '/saber/notification/rule/update',
        form,
        {
            rule_id: id
        }
    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }
    ElMessage.success("请求成功");
    return data;
}
export { getRule, createRule, delRule, editRule }