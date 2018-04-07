const Router = require('koa-router')
const Pic = require('./pic')

// 装载子路由
let router = new Router()
router
  .use('/pic', Pic.routes(), Pic.allowedMethods())

module.exports = router