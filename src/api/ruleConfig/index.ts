import { _axios } from "@/server/index"
import type { PagingParams, DelRuleParams, EditRuleParams, SearchUpRuleParams } from "../types/paramsType"
import type { CreateRule, EditRule, UpRule } from "../types/dataType"
import type { BaseResponce, GetRuleRes, CreateRuleRes, SearchUpRuleRes } from "../types/resType"

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

    return data;
}

const upRule = async (form: UpRule) => {
    const data = await _axios.post<BaseResponce<null>, null, UpRule>(
        '/saber/feishu/attrs',
        form
    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }
    return data;
}

const getUpRule = async (ruleId: number) => {
    const data = await _axios.get<SearchUpRuleRes, SearchUpRuleParams>(
        '/saber/feishu/attrs',
        { ruleId }
    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }
    return data;
}
export { getRule, createRule, delRule, editRule, upRule, getUpRule }