const Router = require('koa-router')

const test = Router()

test.get('/', async ( ctx )=>{
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `

  // ctx.set({
  //   statusCode: 250
  // })
  ctx.response.status = 401
  ctx.body = {haha: 'heihei'}
})

module.exports = test