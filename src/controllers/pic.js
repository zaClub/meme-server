const Busboy = require('busboy')

module.exports = {
  async upload(ctx) {
    let busboy = new Busboy({ headers: ctx.header })

    busboy.on

    let html = `
      heihei
    `
    console.log(ctx.request.body)
    ctx.body = html
  }
}