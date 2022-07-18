'use strict';

const AWS = require('aws-sdk');
const Sharp = require('sharp');

const s3 = new AWS.S3();
const formats = ['jpg', 'jpeg', 'png'];

/**
 * gallery 리사이즈 이미지 생성
 * @param event
 */
exports.handler = async (event) => {
  try {
    const record = event.Records[0];

    // 원본 이미지 가져오기
    const originImage = await s3.getObject({
      Bucket: record.s3.bucket.name,
      Key: record.s3.object.key,
    }).promise();

    // 이미지에서 정보를 추출한다.
    const keys = record.s3.object.key.split('/');
    const [fileName, format] = keys[4].split('.');

    // 유효한 포멧이 아닐 경우
    if (!formats.includes(format)) {
      console.log('[Format Error]', format);
      return false;
    }

    // 리사이즈 및 webp 변환
    const image = await Sharp(originImage.Body)
      .resize(100)
      .webp()
      .toBuffer();

    // 변환 이미지 업로드
    const result = await s3.putObject({
      Bucket: record.s3.bucket.name,
      Key: `${keys[0]}/${keys[1]}/img/${keys[3]}/${fileName}.webp`,
      Body: image,
    }).promise();
    console.log('[Put Success]', JSON.stringify(result, null, 2));

    return true;
  } catch (e) {
    console.error('[Error]', e);
    return false;
  }
};
