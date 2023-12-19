import Mock from "mockjs";
import {fail, success} from "@/mock/Result.ts";
import {getParams} from "@/mock/ParamUtil.ts";
import {MediaClassifyConstant} from "@/constants/MediaConstant.ts";

Mock.mock(RegExp('/netdisk/media/classify/list\\?type=.*'), 'get', (options) => {
  console.log(options)
  let params = getParams(options.url);
  let type = params.get('type')
  switch (type) {
    case MediaClassifyConstant.MONTH:
      return success(monthClassifies)
    case MediaClassifyConstant.YEAR:
      return success(yearClassifies)
    case MediaClassifyConstant.PLACE:
      return success(placeClassifies)
    case MediaClassifyConstant.CHARACTER:
      return success(characterClassifies)
  }
  return fail()

})
let monthClassifies: MediaClassify[] = [
  {
    id: 1,
    name: '2023-9',
    src: '',
    status: 1,
    creator: {
      id: 1,
      username: 'system'
    }
  },
  {
    id: 2,
    name: '2023-10',
    src: '',
    status: 1,
    creator: {
      id: 1,
      username: 'system'
    }
  },
  {
    id: 3,
    name: '2023-11',
    src: '',
    status: 1,
    creator: {
      id: 1,
      username: 'DueGin'
    }
  },
]

let yearClassifies: MediaClassify[] = [
  {
    id: 1,
    name: '2021',
    src: '',
    status: 1,
    creator: {
      id: 1,
      username: 'system'
    }
  },
  {
    id: 2,
    name: '2022',
    src: '',
    status: 1,
    creator: {
      id: 1,
      username: 'system'
    }
  },
  {
    id: 3,
    name: '2023',
    src: '',
    status: 1,
    creator: {
      id: 1,
      username: 'DueGin'
    }
  },
]


let placeClassifies: MediaClassify[] = [
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

let characterClassifies: MediaClassify[] = [
  {
    id: 1,
    name: '人物1',
    src: '',
    status: 1,
    creator: {
      id: 1,
      username: 'DueGin'
    }
  },
  {
    id: 2,
    name: '人物2',
    src: '',
    status: 1,
    creator: {
      id: 1,
      username: 'DueGin'
    }
  },
]
