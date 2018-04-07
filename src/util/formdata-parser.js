const Busboy = require('busboy')
const { inspect } = require('util')

module.exports = (ctx) => new Promise(resolve => {
  let busboy = new Busboy({ headers: ctx.header })
  let formdata = {
    files: []
  }

  // 监听文件
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    let fileBuf = Buffer.from([])

    // console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype)
    file.on('data', function(data) {
      // console.log('File [' + fieldname + '] got ' + data.length + ' bytes')
      fileBuf = Buffer.concat([fileBuf, data])
    })
    file.on('end', function() {
      // console.log('File [' + fieldname + '] Finished')
      formdata.files.push({
        fName: filename,
        fContent: fileBuf
      })
      // console.log(file, file.readable)
    })

    // console.log(file.readable)
  })

  // 监听表单域
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    formdata[fieldname] = inspect(val)
  })

  // 监听完成事件
  busboy.on('finish', function() {
    // console.log('Done parsing form!')

    resolve(formdata)
  })

  ctx.req.pipe(busboy)
})