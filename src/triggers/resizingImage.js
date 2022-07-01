'use strict';

exports.handler = async (event) => {
  try {
    console.log(event);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
