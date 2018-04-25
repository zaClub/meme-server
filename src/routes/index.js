const Router = require('koa-router')
const Meme = require('./meme')
const Auth = require('./auth')
const Test = require('./test')

// 装载子路由
let router = new Router()
router
  .use('/api/auth', Auth.routes(), Auth.allowedMethods())
  .use('/api/meme', Meme.routes(), Meme.allowedMethods())
  .use('/api/test', Test.routes(), Test.allowedMethods())

module.exports = router