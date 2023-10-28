import { _axios } from "@/server/index"
import type { PagingParams, DelTemplateParams, EditTemplateParams } from "../types/paramsType"
import type { CreateTemplate, EditTemplate, SearchTemplate } from "../types/dataType"
import type { BaseResponce, GetMessageTemplateRes, SearchTemplateRes, GetManageRes } from "../types/resType"


const getTemplate = async (page_no: number, page_size: number) => {
    const data = await _axios.get<GetMessageTemplateRes, PagingParams>(
        '/saber/template/list',
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

const createTemplate = async (form: CreateTemplate) => {
    const data = await _axios.put<BaseResponce<null>, null, CreateTemplate>(
        '/saber/template/add',
        form
    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }

    console.log(data);
    return data;
}

const delTemplate = async (id: number) => {
    const data = await _axios.delete<BaseResponce<null>, DelTemplateParams>(
        '/saber/template/delete',
        {
            template_id: id
        }
    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }

    return data;
}

const editTemplate = async (id: number, form: EditTemplate) => {
    const data = await _axios.post<BaseResponce<null>, EditTemplateParams, EditTemplate>(
        '/saber/template/update',
        form,
        {
            template_id: id
        },

    );
    if (data.result_code !== 'success') {
        ElMessage.error("请求失败");
        return;
    }

    console.log(data);
    return data;
}

const searchTemplate = async (page_no: number, page_size: number, form: SearchTemplate) => {
    const data = await _axios.post<SearchTemplateRes, PagingParams, SearchTemplate>(
        '/saber/template/search',
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

    console.log(data);
    return data;
}

const getManage = async (page_no: number, page_size: number) => {
    const data = await _axios.get<GetManageRes, PagingParams>(
        '/saber/admin/list',
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
export { getTemplate, createTemplate, delTemplate, editTemplate, searchTemplate, getManage }