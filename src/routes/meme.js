const Router = require('koa-router')
const memeController = require('../controllers/meme')
const meme = Router()

meme.post('/upload', memeController.upload)

module.exports = meme