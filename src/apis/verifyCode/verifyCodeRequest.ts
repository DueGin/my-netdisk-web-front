import request from "@/utils/request/request.ts";

export function getVerifyCode(): Promise<Result<VerifyCode>> {
  return request.get('/verifyImage');
}
