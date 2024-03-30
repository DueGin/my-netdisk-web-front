import request from "@/utils/request/request.ts";
import Page from "@/model/page/Page.ts";

export function getEnumMap(type: string): Promise<Result<any>> {
    return request.get(`/sys/enum/map/${type}`)
}

export function getEnumList(type: string): Promise<Result<Enum[]>> {
    return request.get(`/sys/enum/list/${type}`)
}

export function getEnumPage(params: any): Promise<Result<Page>> {
    return request.get('/sys/enum/page', {params: params})
}

export function saveEnum(data: any): Promise<Result<any>> {
    return request.post('/sys/enum/save', data);
}

export function updateEnum(data: any): Promise<Result<any>> {
    return request.put('/sys/enum/update', data);
}

export function removeEnum(id: any): Promise<Result<any>> {
    return request.delete(`/sys/enum/remove/${id}`);
}
