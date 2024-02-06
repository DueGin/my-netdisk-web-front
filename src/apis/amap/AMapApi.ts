import request from "@/utils/request/request.ts";

export function getAMapList(){
  return request.get('/amap/list');
}
