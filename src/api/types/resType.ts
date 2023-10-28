type BaseResponce<D> = {
    readonly result_code: string;
    data?: D;
    server_time: number;
}

type PagingData<A> = {
    pageNo: number;
    pages: number;
    pageSize: number;
    resultList: A[];
    total: number;
    [property: string]: any;
}
type Template = {
    //主要内容
    content: string;
    createBy: string;
    createTime: string;
    //简介
    description: string;
    //templateId
    id: number;
    isDeleted: number;
    //名称
    name: string;
    updateBy: string;
    updateTime: string;
    version: number;
    [property: string]: any;
}
type GetMessageTemplateRes = BaseResponce<PagingData<Template>>

type resultList = {
    id: number,
    name: string,
    description: string,
    content: string,
    version: number,
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string,
    isDeleted: number
}

type SearchTemplateData<A> = {
    pageNo: number;
    pages: number;
    pageSize: number;
    resultList: A[];
    total: number;
    [property: string]: any;
}
type SearchTemplateRes = BaseResponce<SearchTemplateData<resultList>>

type Manage = {
    createBy: string;
    createTime: string;
    id: number;
    isDeleted: number;
    password: string;
    phone: string;
    updateBy: string;
    updateTime: string;
    username: string;
    version: number;
    [property: string]: any;
}

type GetManageRes = BaseResponce<PagingData<Manage>>

type Rule = {
    chatId: null | string;
    createBy: null | string;
    createTime: null | string;
    feishuAppId: null | string;
    groupId: number | null;
    id: number | null;
    isDeleted: number | null;
    templateId: number | null;
    updateBy: null | string;
    updateTime: null | string;
    userId: null | string;
    version: number | null;
    [property: string]: any;
}

type GetRuleRes = BaseResponce<PagingData<Rule>>

type User = {
    createBy: string;
    createTime: string;
    email: null | string;
    grade: string;
    id: number;
    isDeleted: number;
    mobile: string;
    name: string;
    updateBy: string;
    updateTime: string;
    userId: string;
    version: number;
    [property: string]: any;
}
type GetUserRes = BaseResponce<PagingData<User>>
type SearchUserRes = BaseResponce<PagingData<User>>

type CreateRule = {
    createBy: string;
    createTime: string;
    emailStatus: boolean;
    feishuStatus: boolean;
    groupId: null;
    id: number;
    isDeleted: null;
    smsStatus: boolean;
    templateId: number;
    updateBy: string;
    updateTime: string;
    version: null;
    [property: string]: any;
}
type CreateRuleRes = BaseResponce<CreateRule>

type UserGroup = {
    createBy: string;
    createTime: string;
    id: number;
    isDeleted: number;
    name: string;
    updateBy: string;
    updateTime: string;
    version: number;
    [property: string]: any;
}
type GetUserGroupRes = BaseResponce<PagingData<UserGroup>>
type SearchUserGroupRes = BaseResponce<PagingData<UserGroup>>

type Robot = {
    createBy: null;
    createTime: null;
    description: null;
    feishuAppId: null;
    feishuAppSecret: null;
    id: null;
    isDeleted: null;
    name: null;
    updateBy: null;
    updateTime: null;
    version: null;
    [property: string]: any;
}
type GetRobotRes = BaseResponce<PagingData<Robot>>

type SearchUpRule = {
    chatId: string;
    createBy: string;
    createTime: string;
    feishuAppId: string;
    messageType: string;
    ruleId: number;
    templateId: string;
    updateBy: string;
    updateTime: string;
    userId: null;
    version: number;
    [property: string]: any;
}
type SearchUpRuleRes = BaseResponce<SearchUpRule>
export type { User, Robot, Template, UserGroup }
export type { BaseResponce, GetMessageTemplateRes, SearchTemplateRes, GetManageRes, GetRuleRes, SearchUserRes, CreateRuleRes, GetUserRes, GetUserGroupRes, SearchUserGroupRes, GetRobotRes, SearchUpRuleRes }