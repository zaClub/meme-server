const Router = require('koa-router')
const picController = require('../controllers/pic')
const pic = Router()

pic.post('/upload', picController.upload)

module.exports = pic