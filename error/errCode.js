const errCode = {
    '10000': 'internal server error',
    "01001": "email can not be empty",
    "01002": "password can not be empty",
    "01003": "username or password not match",
    "01004": "user is not active",
    "01005": "username or password not match",
    "01133": "user is locked",
    "01134": "token expired",
    "01135": "invalid access-token",
    "01136": "missing access token parameter",
  };
  
  module.exports = errCode;