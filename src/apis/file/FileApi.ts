import request from "@/utils/request/request.ts";

const baseUrl = '/file';

export function getFileUrl(bucketName: string, fileName: string): Promise<Result<any>> {
  return request.post(baseUrl + '/url', {
    bucketName: bucketName,
    fileName: fileName
  });
}

export function deleteFile(bucketName: string, fileName: string): Promise<Result<any>> {
  return request.delete(baseUrl + '/delete', {
    data: {
      bucketName: bucketName,
      fileName: fileName
    }
  });
}

export function preUploadFileCheck(md5: string, contentType: string): Promise<Result<any>> {
  return request.post(baseUrl + '/preUpload', {
    md5: md5,
    contentType: contentType
  })
}
