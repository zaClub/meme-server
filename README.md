# meme-server

## usage
运行前在根目录创建 `app.config.js` (与 `src/` 同级)
``` javascript
module.exports = {
  // 腾讯云对象存储器配置
  COS_CONFIG: {
    AppId: '',
    SecretId: '',
    SecretKey: '',
    Region: ''
  },

  // 小程序配置
  WEAPP_CONFIG: {
    AppId: '',
    AppSecret: '',
    confirmUrl:'https://api.weixin.qq.com/sns/jscode2session'
  },

  // MySQL 配置
  DB_CONFIG: {
    host: '',
    user: '',
    password: '',
    database: ''
  },

  port: 3001
}
```