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


module.exports = {
  uploadPic({ fName, fContent, fSize }) {
    var params = {
      ...initialParams,
      Key: `${Date.now()}_${String.prototype.slice.call(Math.random() * 10000, 0, 4)}_${fName}`,   /* 必须  十三位时间戳 + 四位随机数 + 文件名*/
      Body: fContent,                          /* 必须 */
      ContentLength: fSize,                    /* 必须 */
      // CacheControl: 'STRING_VALUE',                   /* 非必须 */
      // ContentDisposition: 'STRING_VALUE',            /* 非必须 */
      // ContentEncoding: 'STRING_VALUE',                /* 非必须 */
      // ContentType: 'STRING_VALUE',                    /* 非必须 */
      // Expect: 'STRING_VALUE',                        /* 非必须 */
      // Expires: 'STRING_VALUE',                        /* 非必须 */
      // ContentSha1: 'STRING_VALUE',                    /* 非必须 */
      // ACL: 'STRING_VALUE',                            /* 非必须 */
      // GrantRead: 'STRING_VALUE',                        /* 非必须 */
      // GrantWrite: 'STRING_VALUE',                    /* 非必须 */
      // GrantFullControl: 'STRING_VALUE',                /* 非必须 */
      // 'x-cos-meta-*': 'STRING_VALUE',                /* 非必须 */
      onProgress: function (progressData) {
        // console.log(progressData);
      },
    }

    return new Promise((resolve, reject) => {
      cos.putObject(params, function (err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data.Location)
        }
      })
    })
  },

  getAllPicOfBucket() {
    var params = {
      // Prefix: 'STRING_VALUE',    /* 非必须 */
      // Delimiter: 'STRING_VALUE', /* 非必须 */
      // Marker: 'STRING_VALUE',    /* 非必须 */
      // MaxKeys: 'STRING_VALUE',    /* 非必须 */
      // EncodingType: 'STRING_VALUE',    /* 非必须 */
      ...initialParams
    }

    return new Promise(resolve => {

      cos.getBucket(params, function (err, data) {
        if (err) {
          console.log(err)
        } else {
          console.log(data)
          resolve(data.Contents)
        }
      })
    })
  },

  // 测试分片上传
  async test() {
    cos.sliceUploadFile({
      Key: 'minguo.jpg',
      FilePath: './u=2354395346,694823523&fm=27&gp=0.jpg',
      ...initialParams
    }, (err, data) => {
      console.log(err, data);
    })
  }
}