const http = require('http')

const COS = require('cos-nodejs-sdk-v5')

const { AppId, SecretId, SecretKey, Region } = require('../../app.config.js')

// 创建 cos 实例
let cos = new COS({
  // 后续版本取消在此处输入 AppId, 改成访问 api 时直接在 Bucket 上拼接上 AppId，(E.g: "test-1250000000")，文档也不更新一下，真懒 = =  
  // AppId,
  SecretId,
  SecretKey
})

let initialParams = {
  Bucket: `test-${AppId}`,
  Region
}

// 测试分片上传
// cos.sliceUploadFile({
//   Key: 'minguo.jpg',
//   FilePath: './u=2354395346,694823523&fm=27&gp=0.jpg',
//   ...initialParams
// }, (err, data) => {
//   console.log(err, data);
// })

module.exports = cos