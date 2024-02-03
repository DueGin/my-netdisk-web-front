import request from "@/utils/request/request.ts";

export function getFileUrl(bucketName: string, fileName: string): Promise<Result<any>> {
  return request.post('/file/url', {
    bucketName: bucketName,
    fileName: fileName
  });
}

export function deleteFile(bucketName: string, fileName: string): Promise<Result<any>> {
  return request.delete('/file/delete', {
    data: {
      bucketName: bucketName,
      fileName: fileName
    }
  });
}
