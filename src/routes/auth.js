const auth = require('koa-router')()
const authController = require('../controllers/auth')

auth.post('/login', authController.login)

module.exports = auth