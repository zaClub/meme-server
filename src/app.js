const Koa = require('koa')
const static = require('koa-static')
const cos = require('./util/cos-qcloud')
const bodyParser = require('koa-bodyparser')
const path = require('path')


const router = require('./routes')
const { port } = require('../app.config.js')
const staticPath = './static'

const app = new Koa()

// 使用静态资源中间件
app.use(static(
  path.join(__dirname,  staticPath)
))

// 使用 ctx.body 解析中间件解析 post 请求体
app.use(bodyParser())

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods())


app.listen(port, _ => {
  console.log(`server run at ${port}`)
})

// const COS = require('./util/cos-qcloud')
// COS.getAllPicOfBucket()