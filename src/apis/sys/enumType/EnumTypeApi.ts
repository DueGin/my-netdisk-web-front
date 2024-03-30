import Request from "@/utils/request/request.ts";
import Page from "@/model/page/Page.ts";
import request from "@/utils/request/request.ts";

export function getEnumTypePage(params: any): Promise<Result<Page>> {
    return Request.get('/sys/enumType/page', {
        params: params
    });
}

export function saveEnumType(data: any): Promise<Result<any>> {
    return request.post('/sys/enumType/save', data);
}


export function updateEnumType(data: any): Promise<Result<any>> {
    return request.put('/sys/enumType/update', data);
}

export function removeEnumType(id: string): Promise<Result<any>> {
    return request.delete(`/sys/enumType/remove/${id}`);
}
