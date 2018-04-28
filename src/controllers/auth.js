const ResBody = require('../model/response-body')
const CODE = require('../constants/code')

const authService = require('../service/auth')

module.exports = {
  async login(ctx) {
  
    // 请求体
    let reqBody = ctx.request.body

    // 响应体内容
    let code
    let msg = ''
    let data

    /** 将前端发送了来的 jscode 发送给微信服务器，取得 openId、session_key */
    let openId = '' // 微信用户唯一 id
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

    /* 若该用户已经存在，则取出该用户已用空间 */
    await authService
      .selectUser({
        openId,
        fields: ['space_used']
      })
      .then(res => {
        if (res.code === CODE.USER_EXIST) {
          code = CODE.LOGIN_SUCCESS
          data = {
            spaceUsed: res.data.space_used
          }
        } else {
          // 取得自定义错误码，给下面判断
          code = res.code
        }
      })
      .catch(err => {
        console.log(err)
        code = CODE.SERVER_ERR    
      })

    /** 处理错误码，若该用户不存在，则新建用户 */
    if (code === CODE.USER_NOT_EXIST) await authService
      .insertUser({
        openId
      })
      .then(res => {
        if (res.code === CODE.SUCCESS) {
          code = CODE.REGISTER_SUCCESS
          data = res.data
        } else {
          code = CODE.FAIL
        }
      })
      .catch(err => {
        console.log(err)
        code = CODE.SERVER_ERR
      })

    // ctx.set({}) 
    ctx.body = new ResBody({code, msg, data})
  }
}
