export interface IEmployee{
    empId: string;
    name: string;
    role: string;
    domain: string;
    designation:string;
    testType? :string;
    _id?: string
}
export interface IHttpSimpleRes{
    rc : string;
    message: string;
}
export interface IHttpRes extends IHttpSimpleRes{
    [key: string]: any
}