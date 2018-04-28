const auth = {
  USER_EXIST: 2101,
  LOGIN_SUCCESS: 2102, // 老用户登陆成功
  REGISTER_SUCCESS: 2103, // 新用户第一次登陆成功并注册成功

  USER_NOT_EXIST: 4101,
}


module.exports = {
  // 操作成功
  SUCCESS: 2000,
  
  // 操作错误
  FAIL: 4000,
  
  // 系统错误
  SERVER_ERR: 5000,
  
  // 数据库错误
  DB_ERR: 6000,
  INSERT_FAIL: 6001,

  ...auth
}