type CreateTemplate = {
    //模板内容
    content: string;
    //模板描述
    description: string;
    //模板名称
    name: string;
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
export type { CreateTemplate, EditTemplate, SearchTemplate }