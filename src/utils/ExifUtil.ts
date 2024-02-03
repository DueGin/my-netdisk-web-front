import exifr from "exifr";
import ExifDTO from "@/model/exif/ExifDTO.ts";
import {formatDate} from "@/utils/dateTime/DateTimeUtil.ts";

/**
 * 解析exif信息，返回{@code ExifDTO}
 * @param file
 */
export async function getExif(file: any): Promise<ExifDTO | any> {
  console.log(file)
  console.log(formatDate(file.lastModifiedDate))
  let res: ExifDTO | any = {};
  await exifr.parse(file).then(exif => {
    console.log(exif)
    if (exif) {
      res = {
        originalDateTime: exif.DateTimeOriginal ? formatDate(exif.DateTimeOriginal) : formatDate(file.lastModifiedDate),
        width: exif.ImageWidth,
        height: exif.ImageHeight,
        mimeType: file.type,
        model: exif.model,
        longitude: exif.longitude,
        latitude: exif.latitude,
        // file: file
      };
    } else {
      res = {}
    }
  })
  return new Promise<ExifDTO>(resolve => resolve(res));
}
