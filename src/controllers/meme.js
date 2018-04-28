const formdataPaser = require('../util/formdata-parser')
const ResBody = require('../model/response-body')

const memeService = require('../service/meme')

module.exports = {
  async upload(ctx) {
  
    let reqBody
    let data = []
    
    // 加载请求体中的 formdata
    await formdataPaser(ctx).then(formdata => {
      reqBody = formdata
    }).catch(err => {
      
    })

    let files = reqBody.files
    for (let i = 0; i < files.length; i ++) {
      let file = files[i]

      await memeService.uploadPic({
        fName: file.fName,
        fContent: file.fContent,
        fSize: ctx.get('Content-Length')
      }).then(res => {
        data.push({
          code: 2000,
          msg: '上传成功',
          url: res
        })
      }).catch(err => {
        console.error(err)
        // TODO: 分析 err

        data.push({
        code: 4000,
        msg: '上传失败',
        data: {}
        })
      })

      // await memeService.savePicInfo({
      //   fName: file.fName,
      //   fUrl: data.url,
      //   fSize: ctx.get('Content-Length')
      // })
    }

    ctx.set({
      'Location': '/',
      'Connection': 'close'
    })

    ctx.body = new ResBody({
      code: 2000,
      msg: '成功',
      data
    })
  }
}
