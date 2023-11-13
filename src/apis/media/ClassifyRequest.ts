import request from "@/utils/request/request.ts";

export function getClassifyList(type: string): Promise<Result<MediaClassify[]>> {
  return request({
    url:`/media/classify/list?type=${type}`,
    method:'get',
  })
}
