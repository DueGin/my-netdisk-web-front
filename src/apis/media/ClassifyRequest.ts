import request from "@/utils/request/request.ts";

export function getClassifyList(): Promise<Result<MediaClassify[]>> {
  return request({
    url:'/media/classify/list',
    method:'get',
  })
}
