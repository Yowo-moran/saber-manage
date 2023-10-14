type PagingParams = {
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

type DelRuleParams = {
    rule_id: number;
    [property: string]: any;
}

type EditRuleParams = {
    rule_id: number;
    [property: string]: any;
}
type EditUserParams = {
    uid: number;
    [property: string]: any;
}
export type { PagingParams, DelTemplateParams, EditTemplateParams, DelRuleParams, EditRuleParams,EditUserParams }