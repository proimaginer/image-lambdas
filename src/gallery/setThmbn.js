'use strict';

/**
 * gallery 썸네일 생성
 * @param event
 */
exports.handler = async (event) => {
  try {
    console.log(event);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
