


export function success<T>(data?:T){
  const ok: Result<T> = {
    code: 200,
    data: data
  }
  return ok
}



export function fail(msg?: string){
  const err: Result<void> = {
    code: 500,
    msg: msg
  }
  return err
}

