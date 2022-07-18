'use strict';

/**
 * gallery 리사이즈 이미지 생성
 * @param event
 */
exports.handler = async (event) => {
  try {
    console.log(event);
    console.log(event.Records);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
