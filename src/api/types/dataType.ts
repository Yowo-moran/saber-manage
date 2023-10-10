type SerchTemplate = {
    //创建人，可不传
    create_by?: string;
    //关键字，可不传
    keyword?: string;
    [property: string]: any;
}


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
    create_by?: string;
    keyword?: string;
    [property: string]: any;
}
export type { SerchTemplate, CreateTemplate, EditTemplate, SearchTemplate }