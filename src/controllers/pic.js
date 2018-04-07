const formdataPaser = require('../util/formdata-parser')
const ResBody = require('../model/response-body')
const COS = require('../util/cos-qcloud')

module.exports = {
  async upload(ctx) {
  
    // 加载 formdata
    let reqBody
    let status
    let msg
    let data = {}

    await formdataPaser(ctx).then(formdata => {
      reqBody = formdata
    })

    let files = reqBody.files
    for (let i = 0; i < files.length; i ++) {
      let file = files[i]

      await COS.uploadPic({
        fName: file.fName,
        fContent: file.fContent,
        fSize: ctx.get('Content-Length')
      }).then(res => {
        status = true
        msg = '上传成功'
        data.url = res
      }).catch(err => {
        console.log(err)
        status = false
        msg = '上传失败'
        data = {}
      })
    }

    ctx.set({
      'Location': '/',
      'Connection': 'close'
    });
    ctx.body = new ResBody(status, msg, data)
  }
}