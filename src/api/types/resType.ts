type BaseResponce<D> = {
    readonly result_code: string;
    data?: D;
    server_time: number;
}

type messageTemplateData<A> = {
    pageNo: number;
    pages: number;
    pageSize: number;
    resultList: A[];
    total: number;
    [property: string]: any;
}
type Template = {
    //主要内容
    content?: string;
    createBy?: string;
    createTime?: string;
    //简介
    description?: string;
    //templateId
    id?: number;
    isDeleted?: number;
    //名称
    name?: string;
    updateBy?: string;
    updateTime?: string;
    version?: number;
    [property: string]: any;
}
type GetMessageTemplateRes = BaseResponce<messageTemplateData<Template>>


type SearchTemplateData = {
    pageNo: number;
    pages: number;
    pageSize: number;
    resultList: string[];
    total: number;
    [property: string]: any;
}
type SearchTemplateRes = BaseResponce<SearchTemplateData>

type Manage = {
    createBy?: string;
    createTime?: string;
    id?: number;
    isDeleted?: number;
    password?: string;
    phone?: string;
    updateBy?: string;
    updateTime?: string;
    username?: string;
    version?: number;
    [property: string]: any;
}

type GetManageRes = BaseResponce<messageTemplateData<Manage>>
export type { BaseResponce, GetMessageTemplateRes, SearchTemplateRes, GetManageRes }



