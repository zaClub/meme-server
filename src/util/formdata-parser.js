const Busboy = require('busboy')
const { inspect } = require('util')

module.exports = (ctx) => new Promise(resolve => {
  let busboy = new Busboy({ headers: ctx.header })
  let formdata = {
    files: []
  }

  // 监听文件
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log(filename)
    // TODO: 判断文件类型
    // if()

    let fileBuf = Buffer.from([])

    // let fStream = 

    file.on('data', function(data) {
      fileBuf = Buffer.concat([fileBuf, data])
    })

    file.on('end', function() {
      formdata.files.push({
        fName: filename,
        fContent: fileBuf
      })
    })
  })

  // 监听表单域
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    formdata[fieldname] = inspect(val)
  })

  // 监听完成事件，完成整个 formdata 的读取
  busboy.on('finish', function() {
    resolve(formdata)
  })

  ctx.req.pipe(busboy)
})