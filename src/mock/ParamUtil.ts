export function getParams(url: string): Map<string, any> {
  if (!url) {
    return new Map<string, any>()
  }

  let split = url.split('?');
  if (split.length !== 2) {
    return new Map<string, any>()
  }

  let res = new Map<string, any>()
  let param = split[1].split('&')
  param.forEach(t => {
    let kv = t.split('=');
    res.set(kv[0], kv[1])
  })

  console.log('params=>', res)
  return res

}
