type PagingParams = {
    //默认1
    page_no?: number;
    //默认10
    page_size?: number;
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

type AddUserGroupParams = {
    group_name: string;
    [property: string]: any;
}
type DelUserGroupParams = {
    gid: number;
    [property: string]: any;
}
type SendMessageParams = {
    app_code: string;
    [property: string]: any;
}
type SearchUpRuleParams = {
    ruleId: number;
    [property: string]: any;
}
export type { PagingParams, DelTemplateParams, EditTemplateParams, DelRuleParams, EditRuleParams, EditUserParams, AddUserGroupParams, DelUserGroupParams, SendMessageParams, SearchUpRuleParams }