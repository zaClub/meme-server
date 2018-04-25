const ResBody = require('../model/response-body')
const CODE = require('../constants/code')

const authService = require('../service/auth')

module.exports = {
  async login(ctx) {
  
    let reqBody = ctx.request.body
    let code
    let msg = ''
    let data
    let openId = ''
    let session_key = ''

    await authService
      .confirmCode(reqBody.code)
      .then(res => {
        openId = res.data.openid
        session_key = res.data.session_key
      })
      .catch(e => {
        console.error(e)
      })

    // 若该用户已经存在，准备响应体内容
    await authService
      .selectUser({
        openId,
        fields: ['space_used']
      })
      .then(res => {
        code = CODE.LOGIN_SUCCESS
        data = {
          spaceUsed: res.data.space_used
        }
      })
      .catch(err => {
        if (typeof err === 'number') {
          // 取得自定义错误码
          code = err
        } else {
          console.log(err)
        }
      })

    // 处理错误码，若该用户不存在，则新建用户
    if (code === CODE.USER_NOT_EXIST) await authService
      .insertUser({
        openId
      })
      .then(res => {
        code = CODE.REGISTER_SUCCESS
        data = {
          spaceUsed: 0
        }
      })
      .catch(err => {
        if (typeof err === 'number') {
          // 取得自定义错误码
          code = err
        } else {
          console.log(err)
        }
      })

    // ctx.set({}) 
    ctx.body = new ResBody(code, msg, data)
  }
}
