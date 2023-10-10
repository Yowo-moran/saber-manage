type GetTemplateParams = {
    //默认1
    pageNo?: number;
    //默认10
    pageSize?: number;
    [property: string]: any;
}

type DelTemplateParams = {
    template_id: number;
    [property: string]: any;
}

type EditTemplateParams = {
    //模板内容
    content?: string;
    //模板描述
    description?: string;
    //模板名称
    name?: string;
    [property: string]: any;
}
export type { GetTemplateParams, DelTemplateParams, EditTemplateParams }