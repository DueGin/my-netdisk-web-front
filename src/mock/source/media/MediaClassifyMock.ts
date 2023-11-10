import Mock from "mockjs";
import {success} from "@/mock/Result.ts";

Mock.mock('/netdisk/media/classify/list', 'get', (options)=>{
  console.log(options)
  return success(classifyList);
})

let classifyList: MediaClassify[] = [
  {
    id: 1,
    name: '云南之旅',
    src: '',
    status: 1,
    creator: {
      id: 1,
      username: 'DueGin'
    }
  },
  {
    id: 2,
    name: '长沙之旅',
    src: '',
    status: 1,
    creator: {
      id: 1,
      username: 'DueGin'
    }
  },
]
