type CreateTemplate = {
    //模板内容
    content: string;
    //模板描述
    description: string;
    //模板名称
    name: string;
    [property: string]: any;
}
type Login = {
    password: string;
    phone?: string;
    username?: string;
    [property: string]: any;
}
type EditTemplate = {
    content?: string;
    description?: string;
    name?: string;
    [property: string]: any;
}
type SearchTemplate = {
    createBy?: string;
    keyword?: string;
    [property: string]: any;
}
type SearchUser = {
    keyword: string;
    grade: string;
    [property: string]: any;
}
type CreateRule = {
    emailStatus?: boolean;
    feishuStatus?: boolean;
    groupId?: number | string;
    ruleCode: string;
    smsStatus?: boolean;
    templateId: number | string;
    [property: string]: any;
}
type EditRule = {
    chatId?: string;
    ppId?: string;
    groupId?: number;
    templateId?: number;
    userId?: string;
    [property: string]: any;
}
type UpRule = {
    chatId: string;
    feishuAppId: string;
    messageType: string;
    ruleId: number;
    templateId?: string;
    userId: string;
    [property: string]: any;
}
type EditUser = {
    email?: string;
    grade?: string;
    mobile?: string;
    name?: string;
    userId?: string;
    [property: string]: any;
}
type AddUserGroup = {
    email: string;
    grade: string;
    mobile: string;
    name: string;
    userId: string;
    [property: string]: any;
}
type SearchUserGroup = {
    keyword: string;
    [property: string]: any;
}
type SendMessage = {
    attrsMap?: { [key: string]: any };
    chatId?: string;
    content?: string;
    feishuAppId?: string;
    ruleCode: string;
    title?: string;
    userId?: string;
    [property: string]: any;
}
export type { Login,CreateTemplate, EditTemplate, SearchTemplate, SearchUser, CreateRule, EditRule, UpRule, EditUser, AddUserGroup, SearchUserGroup, SendMessage }